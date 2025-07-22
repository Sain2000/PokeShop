import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const AdminContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
`;

const AdminHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
  border-radius: 0 0 20px 20px;
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

const SearchInput = styled.input`
  border: 2px solid #e9ecef;
  border-radius: 25px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    outline: none;
  }
`;

const CardSelector = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
`;

const CardOption = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SelectedCard = styled.div`
  border: 2px solid #667eea;
  border-radius: 10px;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background: ${props => getTypeColor(props.type)};
`;

const getTypeColor = (type) => {
  const colors = {
    Fire: '#ff6b6b', Water: '#4ecdc4', Grass: '#51cf66', Electric: '#ffd43b',
    Psychic: '#da77f2', Ice: '#74c0fc', Dragon: '#845ef7', Fighting: '#ff922b',
    Poison: '#9775fa', Ground: '#f59f00', Flying: '#91a7ff', Bug: '#69db7c',
    Rock: '#868e96', Ghost: '#9c88ff', Steel: '#adb5bd', Dark: '#495057',
    Fairy: '#faa2c1', Normal: '#ced4da'
  };
  return colors[type] || '#6c757d';
};

// 🔧 URLs CORREGIDAS
const MOCKAPI_URL = 'https://687a4882abb83744b7ec31b5.mockapi.io/api/V1/cards';
const POKEMON_API_BASE = 'https://api.pokemontcg.io/v2/cards';

function AdminProducts() {
  const [myCards, setMyCards] = useState([]);
  const [pokemonCards, setPokemonCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados del formulario
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemonCard, setSelectedPokemonCard] = useState(null); // ✅ Inicializado
  const [customPrice, setCustomPrice] = useState('');

  const typeIcons = {
    Fire: '🔥', Water: '💧', Grass: '🌿', Electric: '⚡', Psychic: '🔮',
    Ice: '❄️', Dragon: '🐉', Fighting: '🥊', Poison: '☠️', Ground: '⛰️',
    Flying: '🕊️', Bug: '🐛', Rock: '🗿', Ghost: '👻', Steel: '⚙️',
    Dark: '🌑', Fairy: '✨', Normal: '⚪'
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  // 🔧 Buscar cartas con delay
  useEffect(() => {
    if (searchTerm.length > 2) {
      const delayedSearch = setTimeout(() => {
        searchPokemonCards(searchTerm);
      }, 500);
      return () => clearTimeout(delayedSearch);
    } else {
      setPokemonCards([]);
    }
  }, [searchTerm]);

  // ✅ FUNCIÓN CORREGIDA - Fetch mis cartas
  const fetchMyCards = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Intentando cargar cartas desde:', MOCKAPI_URL);
      
      const response = await fetch(MOCKAPI_URL);
      
      console.log('📡 Respuesta:', response.status, response.statusText);
      
      if (!response.ok) {
        if (response.status === 404) {
          // Si no existe, es normal en MockAPI vacío
          console.log('📝 Endpoint vacío o no existe, creando array vacío');
          setMyCards([]);
          toast.info('Endpoint de cartas listo. Agrega tu primera carta.');
          return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setMyCards(data);
      toast.success(`${data.length} cartas cargadas de tu colección`);
      
    } catch (err) {
      console.error('❌ Error cargando cartas:', err);
      setError(`Error al cargar cartas: ${err.message}`);
      setMyCards([]); // Array vacío para que no se rompa
      toast.error('Error al cargar cartas. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FUNCIÓN CORREGIDA - Buscar cartas Pokemon
  const searchPokemonCards = async (query) => {
    try {
      setSearchLoading(true);
      
      // 🔧 URL corregida para búsqueda
      const searchUrl = `${POKEMON_API_BASE}?q=name:${encodeURIComponent(query)}*&pageSize=8`;
      console.log('🔍 Buscando en:', searchUrl);
      
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron buscar cartas`);
      }
      
      const data = await response.json();
      console.log('📦 Cartas encontradas:', data.data?.length || 0);
      
      setPokemonCards(data.data || []);
      
      if (data.data?.length === 0) {
        toast.info(`No se encontraron cartas para "${query}"`);
      }
      
    } catch (err) {
      console.error('❌ Error buscando cartas Pokemon:', err);
      toast.error(`Error buscando "${query}". Intenta con otro nombre.`);
      setPokemonCards([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // ✅ FUNCIÓN CORREGIDA - Seleccionar carta Pokemon
  const selectPokemonCard = (card) => {
    console.log('🎯 Carta seleccionada:', card.name);
    
    const selectedCard = {
      name: card.name,
      image: card.images.large,
      type: card.types?.[0] || 'Normal',
      originalId: card.id
    };
    
    setSelectedPokemonCard(selectedCard);
    setPokemonCards([]);
    setSearchTerm('');
    
    // Precio sugerido
    const suggestedPrice = card.tcgplayer?.prices?.holofoil?.market || 
                          card.tcgplayer?.prices?.normal?.market || 
                          (Math.floor(Math.random() * 50) + 10);
    setCustomPrice(suggestedPrice.toFixed(2));
    
    toast.success(`Carta ${card.name} seleccionada`);
  };

  // ✅ FUNCIÓN CORREGIDA - Crear carta
  const createCard = async () => {
  // Validaciones
  if (!selectedPokemonCard) {
    toast.error('❌ Primero selecciona una carta Pokémon');
    return;
  }

  if (!customPrice || customPrice.trim() === '') {
    toast.error('❌ Establece un precio para la carta');
    return;
  }

  const priceNumber = parseFloat(customPrice);
  if (isNaN(priceNumber) || priceNumber <= 0) {
    toast.error('❌ El precio debe ser un número mayor a 0');
    return;
  }

  try {
    // 🧹 LIMPIEZA DE DATOS para evitar caracteres problemáticos
    const cleanName = selectedPokemonCard.name
      .replace(/['"]/g, '') // Quitar comillas simples y dobles
      .replace(/[^\w\s-]/g, '') // Quitar caracteres especiales excepto letras, números, espacios y guiones
      .trim();

    const cleanType = selectedPokemonCard.type
      .replace(/[^a-zA-Z]/g, '') // Solo letras
      .trim();

    const cleanImageUrl = selectedPokemonCard.image
      .split('?')[0] // Quitar parámetros de query
      .trim();

    const cardData = {
      name: cleanName,
      price: Number(priceNumber.toFixed(2)), // Asegurar que sea número limpio
      image: cleanImageUrl,
      type: cleanType
    };

    console.log('🧹 DATOS LIMPIADOS:');
    console.log('- name original:', selectedPokemonCard.name);
    console.log('- name limpio:', cleanName);
    console.log('- type original:', selectedPokemonCard.type);
    console.log('- type limpio:', cleanType);
    console.log('- image original:', selectedPokemonCard.image);
    console.log('- image limpia:', cleanImageUrl);
    console.log('📦 Objeto final:', cardData);
    console.log('📋 JSON final:', JSON.stringify(cardData));

    const response = await fetch(MOCKAPI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });

    console.log('📡 Respuesta POST:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error del servidor:', errorText);
      
      // Intentar parsear el error para más detalles
      try {
        const errorJson = JSON.parse(errorText);
        console.error('📋 Error JSON:', errorJson);
      } catch (e) {
        console.error('📋 Error text:', errorText);
      }
      
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const newCard = await response.json();
    console.log('✅ Carta creada exitosamente:', newCard);
    
    setMyCards([...myCards, newCard]);
    toast.success(`🎉 ${newCard.name} agregada a tu colección`);
    resetForm();

  } catch (err) {
    console.error('💥 Error completo:', err);
    toast.error(`Error al crear carta: ${err.message}`);
  }
};
  // ✅ Función para eliminar
  const deleteCard = async (id) => {
    const { default: Swal } = await import('sweetalert2');
    
    const result = await Swal.fire({
      title: '¿Eliminar carta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${MOCKAPI_URL}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        setMyCards(myCards.filter(c => c.id !== id));
        toast.success('Carta eliminada exitosamente');
      } catch (err) {
        toast.error('Error al eliminar la carta');
        console.error('Error:', err);
      }
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setSelectedPokemonCard(null);
    setCustomPrice('');
    setSearchTerm('');
    setPokemonCards([]);
    setEditingCard(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Administrar Cartas - PokeShop</title>
        <meta name="description" content="Gestiona tu colección de cartas Pokémon" />
      </Helmet>

      <AdminContainer>
        <AdminHeader>
          <div className="container">
            <h1 className="text-center">🎴 Mi Colección de Cartas</h1>
            <p className="text-center mb-0">
              Agrega cartas oficiales de Pokémon TCG con tus precios personalizados
            </p>
          </div>
        </AdminHeader>

        <div className="container">
          {/* Debug info */}
          <div className="alert alert-info mb-4">
            <small>
              <strong>🔧 Debug:</strong> MockAPI: {MOCKAPI_URL}<br/>
              <strong>📊 Estado:</strong> {myCards.length} cartas | Búsqueda: {pokemonCards.length} resultados
            </small>
          </div>

          <div className="row">
            {/* Formulario */}
            <div className="col-md-5">
              <StyledCard className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">➕ Agregar Nueva Carta</h5>
                </div>
                <div className="card-body">
                  {!showForm ? (
                    <button
                      className="btn btn-success w-100"
                      onClick={() => setShowForm(true)}
                    >
                      <i className="bi bi-plus-lg me-2"></i>
                      Agregar Carta de Pokémon TCG
                    </button>
                  ) : (
                    <div>
                      {/* Buscador */}
                      <div className="mb-3">
                        <label className="form-label">🔍 Buscar Carta Pokémon</label>
                        <SearchInput
                          type="text"
                          className="form-control"
                          placeholder="Ej: Charizard, Pikachu..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchLoading && (
                          <small className="text-primary">
                            <i className="bi bi-search me-1"></i>
                            Buscando cartas...
                          </small>
                        )}
                      </div>

                      {/* Resultados */}
                      {pokemonCards.length > 0 && (
                        <div className="mb-3">
                          <label className="form-label">Selecciona una carta:</label>
                          <CardSelector>
                            {pokemonCards.map(card => (
                              <CardOption
                                key={card.id}
                                onClick={() => selectPokemonCard(card)}
                              >
                                <div className="d-flex align-items-center">
                                  <img 
                                    src={card.images.small} 
                                    alt={card.name}
                                    style={{ width: '40px', height: 'auto' }}
                                    className="me-2"
                                  />
                                  <div>
                                    <strong>{card.name}</strong>
                                    <br />
                                    <small className="text-muted">
                                      {card.types?.map(type => `${typeIcons[type]} ${type}`).join(' ')}
                                    </small>
                                  </div>
                                </div>
                              </CardOption>
                            ))}
                          </CardSelector>
                        </div>
                      )}

                      {/* Carta seleccionada */}
                      {selectedPokemonCard && (
                        <div className="mb-3">
                          <label className="form-label">Carta Seleccionada:</label>
                          <SelectedCard>
                            <div className="d-flex">
                              <img 
                                src={selectedPokemonCard.image} 
                                alt={selectedPokemonCard.name}
                                style={{ width: '80px', height: 'auto' }}
                                className="me-3"
                              />
                              <div>
                                <h6>{selectedPokemonCard.name}</h6>
                                <TypeBadge type={selectedPokemonCard.type}>
                                  {typeIcons[selectedPokemonCard.type]} {selectedPokemonCard.type}
                                </TypeBadge>
                              </div>
                            </div>
                          </SelectedCard>
                        </div>
                      )}

                      {/* Precio */}
                      <div className="mb-3">
                        <label className="form-label">💰 Tu Precio ($) *</label>
                        <input
                          type="number"
                          className="form-control"
                          step="0.01"
                          min="0"
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                          placeholder="Ej: 15.99"
                        />
                      </div>

                      {/* Botones */}
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={createCard}
                          disabled={!selectedPokemonCard || !customPrice}
                        >
                          Agregar a Mi Colección
                        </button>
                        <button className="btn btn-secondary" onClick={resetForm}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </StyledCard>
            </div>

            {/* Mi Colección */}
            <div className="col-md-7">
              <StyledCard className="card">
                <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">🏆 Mi Colección ({myCards.length})</h5>
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={fetchMyCards}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Actualizar
                  </button>
                </div>
                <div className="card-body">
                  {error ? (
                    <div className="alert alert-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {error}
                      <button 
                        className="btn btn-sm btn-outline-warning ms-2"
                        onClick={fetchMyCards}
                      >
                        Reintentar
                      </button>
                    </div>
                  ) : myCards.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-collection text-muted" style={{ fontSize: '4rem' }}></i>
                      <h5 className="mt-3">Colección Vacía</h5>
                      <p className="text-muted">
                        Agrega tu primera carta de Pokémon TCG
                      </p>
                    </div>
                  ) : (
                    <div className="row">
                      {myCards.map(card => (
                        <div key={card.id} className="col-md-6 mb-3">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                              <div className="d-flex">
                                <img 
                                  src={card.image} 
                                  alt={card.name}
                                  className="me-3"
                                  style={{
                                    width: '70px', 
                                    height: '70px', 
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                  }}
                                />
                                <div className="flex-grow-1">
                                  <h6 className="mb-1">{card.name}</h6>
                                  <TypeBadge type={card.type}>
                                    {typeIcons[card.type]} {card.type}
                                  </TypeBadge>
                                  <div className="d-flex justify-content-between align-items-center mt-2">
                                    <span className="fw-bold text-success fs-6">
                                      ${parseFloat(card.price || 0).toFixed(2)}
                                    </span>
                                    <button 
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => deleteCard(card.id)}
                                      title="Eliminar carta"
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </StyledCard>
            </div>
          </div>
        </div>
      </AdminContainer>
    </>
  );
}

export default AdminProducts;