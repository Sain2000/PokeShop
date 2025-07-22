import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Contexts
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';

// Styled Components
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  margin-top: 70px; /* Altura del navbar fijo */
  min-height: calc(100vh - 140px); /* Altura mínima considerando navbar y footer */
`;

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-family: inherit;
  }
  
  .Toastify__toast--success {
    background: linear-gradient(45deg, #28a745, #20c997);
  }
  
  .Toastify__toast--error {
    background: linear-gradient(45deg, #dc3545, #e74c3c);
  }
  
  .Toastify__toast--info {
    background: linear-gradient(45deg, #17a2b8, #138496);
  }
  
  .Toastify__toast--warning {
    background: linear-gradient(45deg, #ffc107, #e0a800);
    color: #212529;
  }
  
  .Toastify__progress-bar {
    background: rgba(255, 255, 255, 0.8);
  }
`;

// Componente Profile
const Profile = () => {
  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                Mi Perfil
              </h4>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="bi bi-tools display-1 text-muted"></i>
                <h5 className="mt-3">Perfil en Desarrollo</h5>
                <p className="text-muted">
                  Esta funcionalidad estará disponible próximamente.
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h6>Funcionalidades planificadas:</h6>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check text-success me-2"></i>Editar información personal</li>
                    <li><i className="bi bi-check text-success me-2"></i>Cambiar contraseña</li>
                    <li><i className="bi bi-check text-success me-2"></i>Preferencias de notificaciones</li>
                    <li><i className="bi bi-check text-success me-2"></i>Historial de actividad</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Próximas mejoras:</h6>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-star text-warning me-2"></i>Lista de deseos</li>
                    <li><i className="bi bi-star text-warning me-2"></i>Cartas favoritas</li>
                    <li><i className="bi bi-star text-warning me-2"></i>Configuración de privacidad</li>
                    <li><i className="bi bi-star text-warning me-2"></i>Gestión de direcciones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Orders
const Orders = () => {
  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-secondary text-white">
              <h4 className="mb-0">
                <i className="bi bi-bag me-2"></i>
                Mis Pedidos
              </h4>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="bi bi-receipt display-1 text-muted"></i>
                <h5 className="mt-3">Historial de Pedidos</h5>
                <p className="text-muted">
                  Aquí podrás ver el historial de todas tus compras.
                </p>
              </div>
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="card border-success">
                    <div className="card-body">
                      <i className="bi bi-check-circle text-success display-4"></i>
                      <h6 className="mt-2">Seguimiento en tiempo real</h6>
                      <small className="text-muted">Estado de tus pedidos</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="card border-info">
                    <div className="card-body">
                      <i className="bi bi-arrow-repeat text-info display-4"></i>
                      <h6 className="mt-2">Reordenar fácil</h6>
                      <small className="text-muted">Repite tus compras favoritas</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="card border-warning">
                    <div className="card-body">
                      <i className="bi bi-star text-warning display-4"></i>
                      <h6 className="mt-2">Califica productos</h6>
                      <small className="text-muted">Comparte tu experiencia</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente 404
const NotFound = () => {
  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card shadow">
            <div className="card-body p-5">
              <i className="bi bi-emoji-frown display-1 text-muted"></i>
              <h1 className="display-4 mt-3">404</h1>
              <h4>Página no encontrada</h4>
              <p className="text-muted mb-4">
                Lo sentimos, la página que buscas no existe o ha sido movida.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <a href="/" className="btn btn-primary">
                  <i className="bi bi-house me-2"></i>
                  Volver al inicio
                </a>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => window.history.back()}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Ir atrás
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContainer>
            <Navbar />
            
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Rutas protegidas */}
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminProducts />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Rutas adicionales protegidas */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Ruta 404 - debe ir al final */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainContent>
            
            <Footer />
            
            {/* Configuración de Toast Notifications */}
            <StyledToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              limit={5}
            />
          </AppContainer>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;