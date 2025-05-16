import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
    const {
        cart,
        removeFromCart,
        incrementItem,
        decrementItem,
        totalPrice
    } = useContext(CartContext);

    if (cart.length === 0) {
        return <div className="container mt-4"><h3>El carrito está vacío</h3></div>;
    }

    return (
        <div className="container mt-4">
        <h3>Carrito de compras</h3>
        <div className="row">
            {cart.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
                <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Precio: ${item.price.toFixed(2)}</p>
                    <div className="d-flex justify-content-center align-items-center mb-2">
                    <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => decrementItem(item.id)}
                    >
                        -
                    </button>
                    <span className="fw-bold mx-2">x{item.cantidad}</span>
                    <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => incrementItem(item.id)}
                    >
                        +
                    </button>
                    </div>
                    <p className="card-text">Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                    >
                    Quitar del carrito
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>

        <div className="text-end mt-4">
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
        </div>
        </div>
    );
    }

export default Cart;
