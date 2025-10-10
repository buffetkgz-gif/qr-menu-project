import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (dish, modifiers = []) => {
    const items = get().items;
    const itemId = `${dish.id}-${modifiers.map(m => m.id).join('-')}`;
    
    const existingItem = items.find(item => item.itemId === itemId);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      const totalPrice = parseFloat((dish.price + modifiers.reduce((sum, m) => sum + m.price, 0)).toFixed(2));
      set({
        items: [
          ...items,
          {
            itemId,
            dish,
            modifiers,
            quantity: 1,
            totalPrice
          }
        ]
      });
    }
  },
  
  removeItem: (itemId) => {
    set({
      items: get().items.filter(item => item.itemId !== itemId)
    });
  },
  
  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.itemId === itemId
          ? { ...item, quantity }
          : item
      )
    });
  },
  
  clearCart: () => set({ items: [] }),
  
  getTotal: () => {
    return parseFloat(get().items.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0).toFixed(2));
  },
  
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));