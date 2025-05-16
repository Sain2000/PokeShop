import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);

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
                <img src={item.images.large} className="card-img-top" alt={item.name} />
                <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">${item.tcgplayer.prices.holofoil.market.toFixed(2)}</p>
                    <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                    >
                    Quitar del carrito
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }

    export default Cart;
