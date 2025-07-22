import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import masterballIcon from '../assets/masterball.png';

const StyledNavbar = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const NavBrand = styled(Link)`
  font-weight: bold;
  font-size: 1.5rem;
  color: white !important;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9) !important;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white !important;
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    color: white !important;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
  animation: ${props => props.hasItems ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: white;
    transform: scale(1.1);
  }
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 20px;
  padding: 6px 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const MasterBallIcon = styled.img`
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  
  &:hover {
    transform: rotate(360deg) scale(1.1);
  }
`;

function Navbar() {
  const { totalItems, totalPrice } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <StyledNavbar className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <NavBrand className="d-flex align-items-center" to="/">
          <MasterBallIcon
            src={masterballIcon}
            alt="Master Ball"
            width="30"
            height="30"
            className="me-2"
            style={{ objectFit: 'contain' }}
          />
          PokeShop
        </NavBrand>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <span style={{ color: 'white', fontSize: '1.5rem' }}>☰</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={isActiveRoute('/') ? 'active' : ''}
              >
                <i className="bi bi-house-fill me-1"></i>
                Inicio
              </NavLink>
            </li>
            
            {isAuthenticated() && (
              <li className="nav-item">
                <NavLink 
                  to="/admin" 
                  className={isActiveRoute('/admin') ? 'active' : ''}
                >
                  <i className="bi bi-gear-fill me-1"></i>
                  Administrar
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/cart" 
                    className={`position-relative ${isActiveRoute('/cart') ? 'active' : ''}`}
                  >
                    <i className="bi bi-cart3 me-1"></i>
                    🛒 {totalItems} items (${totalPrice.toFixed(2)})
                    {totalItems > 0 && (
                      <CartBadge hasItems={totalItems > 0}>
                        {totalItems}
                      </CartBadge>
                    )}
                  </NavLink>
                </li>
                
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle border-0 bg-transparent d-flex align-items-center"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    <UserAvatar
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=667eea&color=fff`}
                      alt={user?.name || 'User'}
                      className="me-2"
                    />
                    {user?.name || user?.email?.split('@')[0] || 'Usuario'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <div className="dropdown-item-text">
                        <small className="text-muted">Conectado como:</small>
                        <br />
                        <strong>{user?.email || 'usuario@pokeshop.com'}</strong>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orders">
                        <i className="bi bi-bag me-2"></i>
                        Mis Pedidos
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink 
                  to="/login"
                  className={isActiveRoute('/login') ? 'active' : ''}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  Iniciar Sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;