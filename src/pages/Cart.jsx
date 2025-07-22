import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const CartContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
`;

const StyledCard = styled.div`
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CartHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px 15px 0 0;
`;

const ProductImage = styled.img`
  transition: transform 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    transform: scale(2.5);
    z-index: 100;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    position: relative;
  }
`;

const QuantityButton = styled.button`
  border: 2px solid #667eea;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  color: #667eea;
  width: 35px;
  height: 35px;
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }
`;

const CheckoutButton = styled.button`
  background: linear-gradient(45deg, #28a745, #20c997);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
  }
`;

const CouponButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

function Cart() {
    const {
        cart,
        removeFromCart,
        incrementItem,
        decrementItem,
        totalPrice,
        clearCart
    } = useContext(CartContext);
    
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState('');
    
    // Función para aplicar cupón de descuento
    const applyCoupon = () => {
        const code = couponCode.toLowerCase().trim();
        
        if (code === 'poke10') {
            setDiscount(10);
            setAppliedCoupon('POKE10');
            toast.success('🎉 ¡Cupón aplicado! Descuento del 10%', {
                position: "bottom-right",
                autoClose: 3000,
            });
            setCouponCode('');
        } else if (code === 'poke20') {
            setDiscount(20);
            setAppliedCoupon('POKE20');
            toast.success('🎉 ¡Cupón aplicado! Descuento del 20%', {
                position: "bottom-right",
                autoClose: 3000,
            });
            setCouponCode('');
        } else if (code === 'poke50') {
            setDiscount(50);
            setAppliedCoupon('POKE50');
            toast.success('🎉 ¡Cupón especial! Descuento del 50%', {
                position: "bottom-right",
                autoClose: 3000,
            });
            setCouponCode('');
        } else {
            toast.error('❌ Cupón inválido. Prueba: POKE10, POKE20 o POKE50', {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    const removeCoupon = () => {
        setDiscount(0);
        setAppliedCoupon('');
        toast.info('Cupón removido', {
            position: "bottom-right",
            autoClose: 2000,
        });
    };
    
    // Mostrar mensaje de vacío si no hay productos
    if (cart.length === 0) {
        return (
            <>
                <Helmet>
                    <title>Carrito Vacío - PokeShop</title>
                    <meta name="description" content="Tu carrito está vacío. Descubre nuestra colección de cartas Pokémon." />
                </Helmet>
                
                <CartContainer>
                    <div className="container">
                        <StyledCard className="text-center p-5">
                            <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                            <h3 className="mt-3">Tu carrito está vacío</h3>
                            <p className="text-muted mb-4">¡Agrega algunas cartas de Pokémon para comenzar!</p>
                            <a href="/" className="btn btn-primary btn-lg">
                                <i className="bi bi-shop me-2"></i>
                                Volver a la tienda
                            </a>
                        </StyledCard>
                    </div>
                </CartContainer>
            </>
        );
    }

    // Calcular el precio final con descuento
    const discountAmount = totalPrice * (discount / 100);
    const finalPrice = totalPrice - discountAmount;

    // Función para proceder al checkout
    const handleCheckout = () => {
        Swal.fire({
            title: '¿Proceder al pago?',
            html: `
                <div class="text-start">
                    <p><strong>Resumen de compra:</strong></p>
                    <p>Productos: ${cart.length}</p>
                    <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                    ${discount > 0 ? `<p class="text-success">Descuento (${discount}%): -${discountAmount.toFixed(2)}</p>` : ''}
                    <hr>
                    <p class="fs-5"><strong>Total: ${finalPrice.toFixed(2)}</strong></p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, proceder al pago',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal-wide'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Simular proceso de pago
                Swal.fire({
                    title: 'Procesando pago...',
                    text: 'Por favor espera',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                });

                setTimeout(() => {
                    Swal.fire({
                        title: '¡Compra exitosa! 🎉',
                        html: `
                            <div class="text-center">
                                <p>Tus cartas de Pokémon serán enviadas pronto</p>
                                <p><strong>Total pagado: ${finalPrice.toFixed(2)}</strong></p>
                                <small class="text-muted">Recibirás un email de confirmación</small>
                            </div>
                        `,
                        icon: 'success',
                        confirmButtonText: 'Continuar comprando'
                    }).then(() => {
                        clearCart();
                        toast.success('¡Gracias por tu compra! 🛍️');
                    });
                }, 2000);
            }
        });
    };

    // Función para vaciar el carrito con confirmación
    const handleClearCart = () => {
        Swal.fire({
            title: '¿Vaciar carrito?',
            text: 'Esta acción eliminará todos los productos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                toast.success('Carrito vaciado');
            }
        });
    };

    const handleRemoveItem = (id, name) => {
        removeFromCart(id);
        toast.info(`${name} eliminado del carrito`, {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    return (
        <>
            <Helmet>
                <title>Carrito de Compras - PokeShop</title>
                <meta name="description" content="Revisa y finaliza tu compra de cartas Pokémon en PokeShop." />
            </Helmet>

            <CartContainer>
                <div className="container">
                    <StyledCard className="mb-4">
                        <CartHeader className="p-4">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h2 className="mb-0">
                                        <i className="bi bi-cart3 me-2"></i>
                                        Carrito de compras
                                    </h2>
                                    <p className="mb-0 opacity-75">{cart.length} productos en tu carrito</p>
                                </div>
                                <div className="col-auto">
                                    <button 
                                        className="btn btn-outline-light btn-sm" 
                                        onClick={handleClearCart}
                                    >
                                        <i className="bi bi-trash me-1"></i> Vaciar carrito
                                    </button>
                                </div>
                            </div>
                        </CartHeader>
                        
                        <div className="card-body p-0">
                            {/* Vista de tabla para el carrito */}
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{width: "100px"}} className="text-center">Imagen</th>
                                            <th>Producto</th>
                                            <th className="text-center">Precio unitario</th>
                                            <th className="text-center">Cantidad</th>
                                            <th className="text-center">Subtotal</th>
                                            <th className="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-center">
                                                    <ProductImage 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="img-thumbnail" 
                                                        style={{width: "80px", height: "auto"}} 
                                                    />
                                                </td>
                                                <td>
                                                    <h6 className="mb-1">{item.name}</h6>
                                                    {item.type && (
                                                        <small className="text-muted">
                                                            <span className="badge bg-secondary">
                                                                {item.typeIcon} {item.type}
                                                            </span>
                                                        </small>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <span className="fw-bold text-success">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                                        <QuantityButton
                                                            onClick={() => decrementItem(item.id)}
                                                            disabled={item.cantidad <= 1}
                                                        >
                                                            -
                                                        </QuantityButton>
                                                        <span className="fw-bold px-3">
                                                            {item.cantidad}
                                                        </span>
                                                        <QuantityButton
                                                            onClick={() => incrementItem(item.id)}
                                                        >
                                                            +
                                                        </QuantityButton>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fw-bold fs-6 text-primary">
                                                        ${(item.price * item.cantidad).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleRemoveItem(item.id, item.name)}
                                                        title="Eliminar producto"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </StyledCard>
                    
                    {/* Resumen de compra */}
                    <div className="row">
                        <div className="col-lg-8">
                            <StyledCard>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="bi bi-tag-fill me-2"></i>
                                        Código de descuento
                                    </h5>
                                    
                                    {appliedCoupon ? (
                                        <div className="alert alert-success d-flex align-items-center justify-content-between">
                                            <div>
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                Cupón <strong>{appliedCoupon}</strong> aplicado ({discount}% de descuento)
                                            </div>
                                            <button 
                                                className="btn btn-outline-success btn-sm"
                                                onClick={removeCoupon}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Ingresa tu código de descuento"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                                            />
                                            <CouponButton 
                                                type="button"
                                                onClick={applyCoupon}
                                                disabled={!couponCode.trim()}
                                            >
                                                Aplicar
                                            </CouponButton>
                                        </div>
                                    )}
                                    
                                    <div className="mt-3">
                                        <small className="text-muted">
                                            <i className="bi bi-lightbulb me-1"></i>
                                            Códigos disponibles: <strong>POKE10</strong> (10%), <strong>POKE20</strong> (20%), <strong>POKE50</strong> (50%)
                                        </small>
                                    </div>
                                </div>
                            </StyledCard>
                        </div>
                        
                        <div className="col-lg-4">
                            <StyledCard>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="bi bi-receipt me-2"></i>
                                        Resumen del pedido
                                    </h5>
                                    
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Productos ({cart.length}):</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Envío:</span>
                                        <span className="text-success">Gratis</span>
                                    </div>
                                    
                                    {discount > 0 && (
                                        <div className="d-flex justify-content-between mb-2 text-success">
                                            <span>Descuento ({discount}%):</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    
                                    <hr />
                                    
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="fw-bold fs-5">Total:</span>
                                        <span className="fw-bold fs-4 text-success">
                                            ${finalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    {discount > 0 && (
                                        <div className="alert alert-success py-2 mb-3">
                                            <small>
                                                <i className="bi bi-piggy-bank me-1"></i>
                                                ¡Ahorraste ${discountAmount.toFixed(2)}!
                                            </small>
                                        </div>
                                    )}
                                    
                                    <CheckoutButton 
                                        className="w-100"
                                        onClick={handleCheckout}
                                    >
                                        <i className="bi bi-credit-card me-2"></i>
                                        Proceder al pago
                                    </CheckoutButton>
                                    
                                    <div className="text-center mt-3">
                                        <small className="text-muted">
                                            <i className="bi bi-shield-check me-1"></i>
                                            Compra 100% segura
                                        </small>
                                    </div>
                                </div>
                            </StyledCard>
                        </div>
                    </div>
                </div>
            </CartContainer>
        </>
    );
}

export default Cart;