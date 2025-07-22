import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }
`;

const StyledTextarea = styled.textarea`
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }
`;

const StyledSelect = styled.select`
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const pokemonTypes = [
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 
  'Fighting', 'Poison', 'Ground', 'Flying', 'Bug', 'Rock', 'Ghost', 
  'Steel', 'Dark', 'Fairy', 'Normal'
];

function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    type: '',
    category: 'card',
    stock: '1'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        image: product.image || '',
        type: product.type || '',
        category: product.category || 'card',
        stock: product.stock?.toString() || '1'
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validación del precio
    if (!formData.price) {
      newErrors.price = 'El precio es obligatorio';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    // Validación de la descripción
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    // Validación de la imagen
    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es obligatoria';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Debe ser una URL válida';
    }

    // Validación del tipo
    if (!formData.type) {
      newErrors.type = 'El tipo es obligatorio';
    }

    // Validación del stock
    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser un número mayor o igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error específico cuando el usuario corrige
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      await onSubmit(productData);
      
      // Limpiar formulario si es creación
      if (!product) {
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          type: '',
          category: 'card',
          stock: '1'
        });
      }
    } catch (error) {
      toast.error('Error al procesar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre del Producto *
        </label>
        <StyledInput
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Charizard EX"
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción *
        </label>
        <StyledTextarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Describe la carta (mínimo 10 caracteres)"
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        <small className="text-muted">
          {formData.description.length}/10 caracteres mínimo
        </small>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Precio ($) *
            </label>
            <StyledInput
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <StyledInput
              type="number"
              className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              placeholder="1"
            />
            {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Tipo de Pokémon *
        </label>
        <StyledSelect
          className={`form-select ${errors.type ? 'is-invalid' : ''}`}
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Selecciona un tipo</option>
          {pokemonTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </StyledSelect>
        {errors.type && <div className="invalid-feedback">{errors.type}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Categoría
        </label>
        <StyledSelect
          className="form-select"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="card">Carta</option>
          <option value="pack">Sobre</option>
          <option value="accessory">Accesorio</option>
        </StyledSelect>
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          URL de la Imagen *
        </label>
        <StyledInput
          type="url"
          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        {formData.image && isValidUrl(formData.image) && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Vista previa" 
              className="img-thumbnail"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      <div className="d-grid gap-2">
        <SubmitButton
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Procesando...
            </>
          ) : (
            product ? 'Actualizar Producto' : 'Agregar Producto'
          )}
        </SubmitButton>
        
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProductForm;