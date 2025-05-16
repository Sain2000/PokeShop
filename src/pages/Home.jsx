import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Home.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lensEnabled, setLensEnabled] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://api.pokemontcg.io/v2/cards?q=set.name:"Prismatic Evolutions"`) // request to API and filtering by set
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

  useEffect(() => {
    const containers = document.querySelectorAll('.image-container');

    if (!lensEnabled) {
      containers.forEach(container => {
        const lens = container.querySelector('.lens');
        if (lens) lens.style.display = 'none';
      });
      return;
    }

    function onMouseMove(e) {
      const container = e.currentTarget;
      const img = container.querySelector('.zoom-image');
      const lens = container.querySelector('.lens');

      lens.style.display = 'block';

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const zoom = 2; // Here you can modify the lens to x2 x3 etc.
      const lensSize = lens.offsetWidth;

      let lensX = x - lensSize / 2;
      let lensY = y - lensSize / 2;

      lensX = Math.max(0, Math.min(lensX, container.offsetWidth - lensSize));
      lensY = Math.max(0, Math.min(lensY, container.offsetHeight - lensSize));

      lens.style.left = `${lensX}px`;
      lens.style.top = `${lensY}px`;
      lens.style.backgroundImage = `url(${img.src})`;
      lens.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

      const bgX = (x / container.offsetWidth) * img.width * zoom - lensSize / 2;
      const bgY = (y / container.offsetHeight) * img.height * zoom - lensSize / 2;

      const maxBgX = img.width * zoom - lensSize;
      const maxBgY = img.height * zoom - lensSize;

      const finalBgX = Math.max(0, Math.min(bgX, maxBgX));
      const finalBgY = Math.max(0, Math.min(bgY, maxBgY));

      lens.style.backgroundPosition = `-${finalBgX}px -${finalBgY}px`;
    }

    function onMouseLeave(e) {
      const lens = e.currentTarget.querySelector('.lens');
      if (lens) lens.style.display = 'none';
    }

    containers.forEach(container => {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      containers.forEach(container => {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
        const lens = container.querySelector('.lens');
        if (lens) lens.style.display = 'none';
      });
    };
  }, [cards, lensEnabled]);

  if (loading) return <div className="text-center mt-5">Cargando cartas...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setLensEnabled(!lensEnabled)}
          className="btn btn-outline-primary"
        >
          {lensEnabled ? 'Desactivar lupa' : 'Activar lupa'}
        </button>
      </div>

      <div className="row">
        {cards
          .filter(card => card.tcgplayer?.prices?.holofoil?.market)
          .sort((a, b) => b.tcgplayer.prices.holofoil.market - a.tcgplayer.prices.holofoil.market)
          .map(card => (
            <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="image-container position-relative">
                  <img
                    src={card.images.large}
                    alt={card.name}
                    className="card-img-top zoom-image"
                    draggable={false}
                  />
                  <div className="lens"></div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">Precio: ${card.tcgplayer.prices.holofoil.market.toFixed(2)}</p>
                  <button className="btn btn-success" onClick={() => addToCart(card)}>
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
