// actions/cartActions.js

// Akcja dodania produktu do koszyka
export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product
  });
  
  // Akcja usunięcia produktu z koszyka
  export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId
  });
  
  // Akcja aktualizacji ilości produktu w koszyku
  export const updateQuantity = (productId, quantity) => ({
    type: 'UPDATE_QUANTITY',
    payload: { productId, quantity }
  });
  