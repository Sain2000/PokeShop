import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';

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
    
    // Función para aplicar cupón de descuento
    const applyCoupon = () => {
        if (couponCode.toLowerCase() === 'poke10') {
            setDiscount(10);
            Swal.fire({
                icon: 'success',
                title: '¡Cupón aplicado!',
                text: 'Descuento del 10% aplicado a tu compra',
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false
            });
        } else if (couponCode.toLowerCase() === 'poke20') {
            setDiscount(20);
            Swal.fire({
                icon: 'success',
                title: '¡Cupón aplicado!',
                text: 'Descuento del 20% aplicado a tu compra',
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cupón inválido',
                text: 'El código ingresado no es válido',
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };
    
    // Mostrar mensaje de vacío si no hay productos
    if (cart.length === 0) {
        return (
            <div className="container mt-5 pt-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center p-5">
                        <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                        <h3>Tu carrito está vacío</h3>
                        <p className="text-muted">¡Agrega algunas cartas de Pokémon para comenzar!</p>
                        <a href="/" className="btn btn-primary mt-3">Volver a la tienda</a>
                    </div>
                </div>
            </div>
        );
    }

    // Calcular el precio final con descuento
    const discountAmount = totalPrice * (discount / 100);
    const finalPrice = totalPrice - discountAmount;

    // Función para proceder al checkout
    const handleCheckout = () => {
        Swal.fire({
            title: '¿Proceder al pago?',
            text: `Total a pagar: $${finalPrice.toFixed(2)}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, proceder',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Compra exitosa!',
                    'Tus cartas de Pokémon serán enviadas pronto',
                    'success'
                ).then(() => {
                    clearCart();
                });
            }
        });
    };

    // Función para vaciar el carrito con confirmación
    const handleClearCart = () => {
        Swal.fire({
            title: '¿Vaciar carrito?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
            }
        });
    };

    return (
        <div className="container mt-5 pt-4">
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Carrito de compras</h3>
                </div>
                <div className="card-body">
                    {/* Vista de tabla para el carrito */}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th style={{width: "80px"}}></th>
                                    <th>Carta</th>
                                    <th className="text-center">Precio unitario</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-center">Subtotal</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="img-thumbnail" 
                                                style={{width: "70px", height: "auto"}} 
                                            />
                                        </td>
                                        <td>
                                            <h6 className="mb-0">{item.name}</h6>
                                            {item.type && (
                                                <small className="text-muted">
                                                    {item.type} {item.typeIcon || ''}
                                                </small>
                                            )}
                                        </td>
                                        <td className="text-center fw-bold">${item.price.toFixed(2)}</td>
                                        <td className="text-center">
                                            <div className="btn-group btn-group-sm" role="group">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => decrementItem(item.id)}
                                                >
                                                    -
                                                </button>
                                                <span className="btn btn-outline-secondary disabled">
                                                    {item.cantidad}
                                                </span>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => incrementItem(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-center fw-bold">
                                            ${(item.price * item.cantidad).toFixed(2)}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeFromCart(item.id)}
                                                title="Eliminar"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Botón para vaciar carrito */}
                    <div className="d-flex justify-content-start mb-3">
                        <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={handleClearCart}
                        >
                            <i className="bi bi-trash me-1"></i> Vaciar carrito
                        </button>
                    </div>
                    
                    {/* Resumen de compra */}
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Código de descuento"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button 
                                    className="btn btn-outline-secondary" 
                                    type="button"
                                    onClick={applyCoupon}
                                >
                                    Aplicar
                                </button>
                            </div>
                            <small className="text-muted">Prueba los códigos: POKE10 o POKE20</small>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Resumen del pedido</h5>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <span className="fw-bold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="d-flex justify-content-between mb-2 text-success">
                                            <span>Descuento ({discount}%):</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">Total:</span>
                                        <span className="fw-bold fs-5">${finalPrice.toFixed(2)}</span>
                                    </div>
                                    <button 
                                        className="btn btn-success w-100 mt-3"
                                        onClick={handleCheckout}
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
