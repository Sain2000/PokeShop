import { useEffect, useState } from 'react';
import '../styles/Home.css';
function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.pokemontcg.io/v2/cards?q=set.name:"Prismatic Evolutions"`)
      .then(res => res.json())
      .then(data => {
        setCards(data.data); // la propiedad es "data"
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cards:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando cartas...</p>;

  return (
    <div className="card-grid">
  {cards
  .filter(card => card.tcgplayer?.prices?.holofoil?.market)
  .sort((a, b) =>
  b.tcgplayer.prices.holofoil.market - a.tcgplayer.prices.holofoil.market)
  .map(card => (
    <div key={card.id} className="card">
      <img src={card.images.small} alt={card.name} />
      <h2>{card.name}</h2>
      <p>
        Precio: ${card.tcgplayer.prices.holofoil.market.toFixed(2)}
      </p>
    </div>
))}
</div>

  );
}

export default Home;
