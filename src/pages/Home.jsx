import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "https://687a4882abb83744b7ec31b5.mockapi.io/api/V1/cards"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error al obtener las cartas:", error);
      }
    };

    fetchCards();
  }, []);

  // Obtener tipos únicos para el filtro
  const cardTypes = useMemo(() => {
    const types = cards.map(card => card.type).filter(Boolean);
    return [...new Set(types)];
  }, [cards]);

  // Filtrar y ordenar cartas
  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards.filter(card => {
      // Filtro por nombre
      const matchesName = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro por tipo
      const matchesType = selectedType === "" || card.type === selectedType;
      
      // Filtro por rango de precio
      const price = parseFloat(card.price);
      const matchesMinPrice = priceRange.min === "" || price >= parseFloat(priceRange.min);
      const matchesMaxPrice = priceRange.max === "" || price <= parseFloat(priceRange.max);
      
      return matchesName && matchesType && matchesMinPrice && matchesMaxPrice;
    });

    // Ordenar cartas
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

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
  };

  return (
    <div className="home-container">
      <h2 className="title">Encuentra tu carta perfecta</h2>

      {/* Sección de filtros */}
      <div className="filters-container">
        {/* Búsqueda por nombre */}
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

        {/* Filtro por tipo */}
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

        {/* Filtro por rango de precio */}
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

        {/* Ordenar */}
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

        {/* Botón limpiar filtros */}
        <div className="filter-group">
          <button onClick={clearFilters} className="clear-button">
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="results-count">
        {filteredAndSortedCards.length} carta{filteredAndSortedCards.length !== 1 ? 's' : ''} encontrada{filteredAndSortedCards.length !== 1 ? 's' : ''}
      </div>

      {/* Grid de cartas */}
      <div className="cards-container">
        {filteredAndSortedCards.length === 0 ? (
          <p className="empty-message">
            {cards.length === 0 ? "Cargando cartas..." : "No se encontraron cartas con los filtros aplicados"}
          </p>
        ) : (
          filteredAndSortedCards.map((card) => (
            <div 
              key={card.id} 
              className="holo-card"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="card-content">
                <h3>{card.name}</h3>
                <p>Tipo: {card.type}</p>
                <p>Precio: ${card.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;