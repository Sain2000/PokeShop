import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
`;

const Logo = styled.h1`
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CredentialsInfo = styled.div`
  background: linear-gradient(45deg, #e3f2fd, #f3e5f5);
  border: 1px solid #667eea;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    outline: none;
  }
  
  &.is-invalid {
    border-color: #dc3545;
  }
  
  &.is-valid {
    border-color: #28a745;
  }
`;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Credenciales válidas
  const VALID_CREDENTIALS = {
    email: 'admin',
    password: '123456'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateCredentials = (email, password) => {
    return email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones básicas
    if (!formData.email || !formData.password) {
      toast.error('Por favor, completa todos los campos');
      setIsLoading(false);
      return;
    }

    // Validar credenciales específicas
    if (!validateCredentials(formData.email, formData.password)) {
      toast.error('Credenciales incorrectas. Solo el administrador puede acceder.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setIsLoading(false);
      return;
    }

    // Simulación de login exitoso
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        email: 'admin@pokeshop.com',
        name: 'Administrador',
        role: 'admin',
        avatar: `https://ui-avatars.com/api/?name=Admin&background=667eea&color=fff&bold=true`
      };

      login(userData);
      toast.success('¡Bienvenido Administrador!', {
        position: "top-center",
        autoClose: 2000,
      });
      
      // Redirigir al panel de administración
      navigate('/admin');
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = () => {
    setFormData({
      email: VALID_CREDENTIALS.email,
      password: VALID_CREDENTIALS.password
    });
    toast.info('Credenciales llenadas automáticamente');
  };

  return (
    <>
      <Helmet>
        <title>Acceso Administrativo - PokeShop</title>
        <meta name="description" content="Panel de acceso para administradores de PokeShop" />
      </Helmet>
      
      <LoginContainer>
        <LoginCard>
          <Logo>🎴 PokeShop Admin</Logo>
          
          {showCredentials && (
            <CredentialsInfo>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="text-primary">📋 Credenciales de Acceso</strong>
                <button 
                  type="button"
                  className="btn-close btn-sm"
                  onClick={() => setShowCredentials(false)}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="mb-2">
                <small><strong>Usuario:</strong> admin</small><br />
                <small><strong>Contraseña:</strong> 123456</small>
              </div>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={fillCredentials}
              >
                ✨ Llenar automáticamente
              </button>
            </CredentialsInfo>
          )}
          
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <label htmlFor="email" className="form-label fw-semibold">
                👤 Usuario
              </label>
              <StyledInput
                type="text"
                className={`form-control ${
                  formData.email ? 
                    (formData.email === VALID_CREDENTIALS.email ? 'is-valid' : 'is-invalid') 
                    : ''
                }`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
                required
              />
              {formData.email && formData.email !== VALID_CREDENTIALS.email && (
                <small className="text-danger">Usuario incorrecto</small>
              )}
            </InputGroup>
            
            <InputGroup>
              <label htmlFor="password" className="form-label fw-semibold">
                🔒 Contraseña
              </label>
              <StyledInput
                type="password"
                className={`form-control ${
                  formData.password ? 
                    (formData.password === VALID_CREDENTIALS.password ? 'is-valid' : 'is-invalid') 
                    : ''
                }`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                required
              />
              {formData.password && formData.password !== VALID_CREDENTIALS.password && (
                <small className="text-danger">Contraseña incorrecta</small>
              )}
            </InputGroup>
            
            <StyledButton
              type="submit"
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Verificando acceso...
                </>
              ) : (
                '🚀 Acceder al Panel'
              )}
            </StyledButton>
          </form>
          
          <div className="text-center">
            <div className="alert alert-info py-2 mb-3">
              <small>
                <i className="bi bi-shield-lock me-1"></i>
                <strong>Acceso restringido:</strong> Solo administradores autorizados
              </small>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/" 
              className="text-decoration-none d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-arrow-left me-1"></i>
              Volver a la tienda
            </Link>
          </div>
        </LoginCard>
      </LoginContainer>
    </>
  );
}

export default Login;