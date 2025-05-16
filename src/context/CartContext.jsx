import React from 'react';
import { createContext, useState } from 'react';
import Swal from 'sweetalert2';


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

   const typeIcons = {
  Fire: '🔥',
  Water: '💧',
  Grass: '🌿',
  Electric: '⚡',
  Psychic: '🔮',
  Fighting: '🥊',
  Darkness: '🌑',
  Metal: '🔩',
  Fairy: '✨',
  Dragon: '🐉',
  Colorless: '🌈',
  Lightning: '⚡',
};

  const addToCart = (card) => {
    setCart((prev) => {
      const found = prev.find(item => item.id === card.id);
      if (found) {
        return prev.map(item =>
          item.id === card.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: card.id,
            name: card.name,
            price: card.tcgplayer.prices.holofoil.market,
            image: card.images.large,
            cantidad: 1,
          }
        ];
      }
    });

  const type = card.types?.[0];
  const emoji = typeIcons[type] || '';
  Swal.fire({
    icon: 'success',
    title: `${card.name} (${emoji} ${type}) agregado al carrito`,
    toast: true,
    position: 'top-end',
    timer: 2000,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.style.marginTop = '70px'; // para que no tape la navbar
    }
  });



  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));

    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado del carrito',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false,
      didOpen: (toast) => {
      toast.style.marginTop = '70px'; // para que no tape la navbar
    }
    });
  };

  const incrementItem = (id) => {
    setCart((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decrementItem = (id) => {
    setCart((prev) =>
      prev
        .map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
