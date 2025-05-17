import { useEffect, useState, useContext } from 'react';
import '../Styles/Home.css';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';

function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);



  const typeIcons = {
    Fire: '🔥',
    Water: '💧',
    Grass: '🌿',
    Electric: '⚡',
    Psychic: '🔮',
    Fighting: '🥊',
    Dark: '🌑',
    Metal: '🔩',
    Fairy: '✨',
    Dragon: '🐉',
    Colorless: '🌈',
    Lightning: '⚡',
  };

  useEffect(() => {
    fetch(`https://api.pokemontcg.io/v2/cards?q=set.name:"Prismatic Evolutions"`)
      .then(res => res.json())
      .then(data => {
        setCards(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cards:', err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (card) => {
    addToCart(card);
    const emoji = typeIcons[card.types?.[0]] || '';
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: `¡${card.name} ${emoji} agregado al carrito!`,
      showConfirmButton: false,
      timer: 1800,
      customClass: {
        popup: 'no-navbar-overlap'
      }
    });
  };

  if (loading) return <div className="text-center mt-5">Cargando cartas...</div>;

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        {cards
          .filter(card => card.tcgplayer?.prices?.holofoil?.market)
          .sort((a, b) => b.tcgplayer.prices.holofoil.market - a.tcgplayer.prices.holofoil.market)
          .slice(0, 8)
          .map(card => (
            <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
              <div
                className="holo-card"
                style={{ backgroundImage: `url(${card.images.large})` }}
              >
                <div className="card-content text-center">
                  <h5>{card.name}</h5>
                  <p>${card.tcgplayer.prices.holofoil.market.toFixed(2)}</p>
                  <button className="btn btn-success btn-sm" onClick={() => handleAddToCart(card)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
