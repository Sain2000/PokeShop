import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  margin-top: auto;
`;

const FooterSection = styled.div`
  padding: 2rem 0 1rem 0;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    transform: translateX(5px);
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    transform: translateX(5px);
  }
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  margin: 0 10px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #667eea;
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NewsletterInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 25px 0 0 25px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    color: white;
  }
`;

const NewsletterButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  border-radius: 0 25px 25px 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #764ba2, #667eea);
    transform: translateY(-2px);
  }
`;

const PaymentBadge = styled.span`
  background: white;
  color: #2c3e50;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 2px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para el newsletter
    console.log('Newsletter subscription');
  };

  return (
    <StyledFooter>
      <FooterSection>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="mb-3">🎴 PokeShop</h5>
              <p className="text-muted">
                Tu tienda de confianza para cartas Pokémon TCG. 
                Encuentra las mejores cartas holográficas y raras 
                para completar tu colección.
              </p>
              <div className="mt-3">
                <SocialIcon href="#" aria-label="Facebook" title="Facebook">
                  <i className="bi bi-facebook"></i>
                </SocialIcon>
                <SocialIcon href="#" aria-label="Twitter" title="Twitter">
                  <i className="bi bi-twitter"></i>
                </SocialIcon>
                <SocialIcon href="#" aria-label="Instagram" title="Instagram">
                  <i className="bi bi-instagram"></i>
                </SocialIcon>
                <SocialIcon href="#" aria-label="YouTube" title="YouTube">
                  <i className="bi bi-youtube"></i>
                </SocialIcon>
              </div>
            </div>
            
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="mb-3">Navegación</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <FooterLink to="/">
                    <i className="bi bi-house me-1"></i>
                    Inicio
                  </FooterLink>
                </li>
                <li className="mb-2">
                  <FooterLink to="/cart">
                    <i className="bi bi-cart3 me-1"></i>
                    Carrito
                  </FooterLink>
                </li>
                <li className="mb-2">
                  <FooterLink to="/admin">
                    <i className="bi bi-gear me-1"></i>
                    Administrar
                  </FooterLink>
                </li>
                <li className="mb-2">
                  <FooterLink to="/login">
                    <i className="bi bi-person-circle me-1"></i>
                    Iniciar Sesión
                  </FooterLink>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <h6 className="mb-3">Categorías</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    🔥 Cartas Fire
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    💧 Cartas Water
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    🌿 Cartas Grass
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    ⚡ Cartas Electric
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    ✨ Cartas Holográficas
                  </ExternalLink>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <h6 className="mb-3">Soporte</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    <i className="bi bi-headset me-1"></i>
                    Centro de Ayuda
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    <i className="bi bi-truck me-1"></i>
                    Envíos y Devoluciones
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    <i className="bi bi-shield-check me-1"></i>
                    Política de Privacidad
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    <i className="bi bi-file-text me-1"></i>
                    Términos y Condiciones
                  </ExternalLink>
                </li>
                <li className="mb-2">
                  <ExternalLink href="#" onClick={(e) => e.preventDefault()}>
                    <i className="bi bi-envelope me-1"></i>
                    Contacto
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <h6 className="mb-3">Newsletter</h6>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="input-group">
                  <NewsletterInput
                    type="email"
                    className="form-control"
                    placeholder="tu@email.com"
                    required
                  />
                  <NewsletterButton
                    className="btn"
                    type="submit"
                  >
                    Suscribirse
                  </NewsletterButton>
                </div>
              </form>
              <small className="text-muted mt-2 d-block">
                Recibe las últimas novedades y ofertas especiales
              </small>
            </div>
            
            <div className="col-md-6">
              <h6 className="mb-3">Métodos de Pago</h6>
              <div className="d-flex flex-wrap gap-1">
                <PaymentBadge>
                  <i className="bi bi-credit-card"></i> Visa
                </PaymentBadge>
                <PaymentBadge>
                  <i className="bi bi-credit-card-2-front"></i> Mastercard
                </PaymentBadge>
                <PaymentBadge>
                  💳 PayPal
                </PaymentBadge>
                <PaymentBadge>
                  <i className="bi bi-wallet2"></i> Mercado Pago
                </PaymentBadge>
              </div>
            </div>
          </div>
        </div>
      </FooterSection>
      
      <Copyright>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">
                © {currentYear} PokeShop. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                Hecho con ❤️ para coleccionistas Pokémon
              </small>
            </div>
          </div>
        </div>
      </Copyright>
    </StyledFooter>
  );
}

export default Footer;