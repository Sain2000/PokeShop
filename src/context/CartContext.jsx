import React from 'react';
import { createContext, useState } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (card) => {
    setCart((prev) => [...prev, card]);

    Swal.fire({
      icon: 'success',
      title: `${card.name} agregado al carrito`,
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
