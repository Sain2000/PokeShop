import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 4;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://687a4882abb83744b7ec31b5.mockapi.io/api/V1/cards"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error al obtener las cartas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Función para obtener la mejor calidad de imagen
  const getOptimizedImage = (card) => {
    // Si la imagen viene de la API de Pokémon, usar versión large
    if (card.image && card.image.includes('images.pokemontcg.io')) {
      // Cambiar de small a large para mejor calidad
      return card.image.replace('/small/', '/large/');
    }
    // Para otras imágenes, usar la original
    return card.image;
  };

  // Obtener tipos únicos para el filtro
  const cardTypes = useMemo(() => {
    const types = cards.map(card => card.type).filter(Boolean);
    return [...new Set(types)];
  }, [cards]);

  // Filtrar y ordenar cartas
  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards.filter(card => {
      const matchesName = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "" || card.type === selectedType;
      const price = parseFloat(card.price);
      const matchesMinPrice = priceRange.min === "" || price >= parseFloat(priceRange.min);
      const matchesMaxPrice = priceRange.max === "" || price <= parseFloat(priceRange.max);
      
      return matchesName && matchesType && matchesMinPrice && matchesMaxPrice;
    });

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return parseFloat(a.price) - parseFloat(b.price);
          case "price-desc":
            return parseFloat(b.price) - parseFloat(a.price);
          case "type":
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [cards, searchTerm, selectedType, priceRange, sortBy]);

  // Calcular paginación
  const totalCards = filteredAndSortedCards.length;
  const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentCards = filteredAndSortedCards.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, priceRange, sortBy]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando cartas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2 className="title">Encuentra tu carta perfecta</h2>

      {/* Sección de filtros */}
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="search">Buscar por nombre:</label>
          <input
            id="search"
            type="text"
            placeholder="Nombre de la carta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">Tipo:</label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos los tipos</option>
            {cardTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group price-group">
          <label>Rango de precio:</label>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Mín"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="price-input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Máx"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="price-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Ordenar por:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="">Sin ordenar</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
            <option value="type">Tipo</option>
          </select>
        </div>

        <div className="filter-group">
          <button onClick={clearFilters} className="clear-button">
            Limpiar filtros
          </button>
        </div>
      </div>

      <div className="results-info">
        <div className="results-count">
          {totalCards} carta{totalCards !== 1 ? 's' : ''} encontrada{totalCards !== 1 ? 's' : ''}
        </div>
        {totalPages > 1 && (
          <div className="page-info">
            Página {currentPage} de {totalPages} | Mostrando {currentCards.length} de {totalCards}
          </div>
        )}
      </div>

      {/* Grid optimizado de cartas */}
      <div className="cards-grid">
        {currentCards.length === 0 ? (
          <div className="empty-state">
            <p className="empty-message">
              {cards.length === 0 ? "Cargando cartas..." : "No se encontraron cartas con los filtros aplicados"}
            </p>
          </div>
        ) : (
          currentCards.map((card) => (
            <div key={card.id} className="card-item">
              <div className="card-wrapper">
                <div className="card-image-container">
                  <img 
                    src={getOptimizedImage(card)} 
                    alt={card.name}
                    className="card-image"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.target.src = '/placeholder-card.png';
                    }}
                  />
                </div>
                <div className="card-info">
                  <h3 className="card-title">{card.name}</h3>
                  <p className="card-type">Tipo: {card.type}</p>
                  <p className="card-price">${parseFloat(card.price).toFixed(2)}</p>
                  <button className="add-to-cart-btn">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sistema de paginación */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination">
            {/* Botón anterior */}
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={goToPrevious}
              disabled={currentPage === 1}
            >
              ‹ Anterior
            </button>

            {/* Números de página */}
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                // Mostrar siempre primera página, última página, página actual y páginas adyacentes
                const showPage = page === 1 || 
                                page === totalPages || 
                                Math.abs(page - currentPage) <= 1;
                
                if (!showPage && page === 2 && currentPage > 4) {
                  return <span key="dots1" className="pagination-dots">...</span>;
                }
                
                if (!showPage && page === totalPages - 1 && currentPage < totalPages - 3) {
                  return <span key="dots2" className="pagination-dots">...</span>;
                }
                
                if (!showPage) return null;

                return (
                  <button
                    key={page}
                    className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Botón siguiente */}
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              Siguiente ›
            </button>
          </div>

          {/* Navegación rápida */}
          <div className="quick-navigation">
            <span>Ir a página:</span>
            <select 
              value={currentPage} 
              onChange={(e) => goToPage(parseInt(e.target.value))}
              className="page-select"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;