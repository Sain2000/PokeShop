import React, { useState } from 'react';
import styled from 'styled-components';

const ProductCard = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  
  &.edit-btn {
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
    }
  }
  
  &.delete-btn {
    background: linear-gradient(45deg, #dc3545, #e74c3c);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(220, 53, 69, 0.3);
    }
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

const TypeBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background: ${props => getTypeColor(props.type)};
`;

const getTypeColor = (type) => {
  const colors = {
    Fire: '#ff6b6b',
    Water: '#4ecdc4',
    Grass: '#51cf66',
    Electric: '#ffd43b',
    Psychic: '#da77f2',
    Ice: '#74c0fc',
    Dragon: '#845ef7',
    Fighting: '#ff922b',
    Poison: '#9775fa',
    Ground: '#f59f00',
    Flying: '#91a7ff',
    Bug: '#69db7c',
    Rock: '#868e96',
    Ghost: '#9c88ff',
    Steel: '#adb5bd',
    Dark: '#495057',
    Fairy: '#faa2c1',
    Normal: '#ced4da'
  };
  return colors[type] || '#6c757d';
};

function ProductList({ products, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'price') {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-archive fs-1 text-muted"></i>
        <h5 className="mt-3">No hay productos</h5>
        <p className="text-muted">Agrega tu primer producto para comenzar</p>
      </div>
    );
  }

  return (
    <div>
      {/* Barra de búsqueda y filtros */}
      <div className="row mb-4">
        <div className="col-md-8">
          <SearchInput
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, tipo o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
          >
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Precio menor a mayor</option>
            <option value="price-desc">Precio mayor a menor</option>
            <option value="type-asc">Tipo A-Z</option>
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row mb-3">
        <div className="col">
          <small className="text-muted">
            Mostrando {sortedProducts.length} de {products.length} productos
            {searchTerm && ` para "${searchTerm}"`}
          </small>
        </div>
      </div>

      {/* Lista de productos */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-search fs-2 text-muted"></i>
          <p className="mt-2">No se encontraron productos</p>
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setSearchTerm('')}
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="row">
          {sortedProducts.map((product) => (
            <div key={product.id} className="col-12 mb-3">
              <ProductCard className="p-3">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                      }}
                    />
                  </div>
                  
                  <div className="col">
                    <div className="d-flex align-items-start justify-content-between">
                      <div>
                        <h6 className="mb-1">{product.name}</h6>
                        <p className="text-muted mb-1 small">
                          {product.description?.length > 80 
                            ? `${product.description.substring(0, 80)}...`
                            : product.description
                          }
                        </p>
                        <div className="d-flex align-items-center gap-2">
                          {product.type && (
                            <TypeBadge type={product.type}>
                              {product.type}
                            </TypeBadge>
                          )}
                          <small className="text-muted">
                            Stock: {product.stock || 0}
                          </small>
                        </div>
                      </div>
                      
                      <div className="text-end">
                        <div className="fs-5 fw-bold text-success mb-2">
                          ${parseFloat(product.price || 0).toFixed(2)}
                        </div>
                        <div className="btn-group btn-group-sm">
                          <ActionButton
                            className="edit-btn"
                            onClick={() => onEdit(product)}
                            title="Editar producto"
                          >
                            <i className="bi bi-pencil"></i>
                          </ActionButton>
                          <ActionButton
                            className="delete-btn"
                            onClick={() => onDelete(product.id)}
                            title="Eliminar producto"
                          >
                            <i className="bi bi-trash"></i>
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ProductCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;