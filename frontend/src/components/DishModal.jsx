import { useState } from 'react';
import { useCartStore } from '../store/cartStore';

const DishModal = ({ dish, isOpen, onClose, currency = '₽' }) => {
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const addItem = useCartStore((state) => state.addItem);

  if (!isOpen) return null;

  const toggleModifier = (modifier) => {
    setSelectedModifiers((prev) => {
      const exists = prev.find((m) => m.id === modifier.id);
      if (exists) {
        return prev.filter((m) => m.id !== modifier.id);
      }
      return [...prev, modifier];
    });
  };

  const getTotalPrice = () => {
    const modifiersPrice = selectedModifiers.reduce((sum, m) => sum + m.price, 0);
    return parseFloat((dish.price + modifiersPrice).toFixed(2));
  };

  const handleAddToCart = () => {
    addItem(dish, selectedModifiers);
    setSelectedModifiers([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {dish.image && (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{dish.name}</h2>
          {dish.description && (
            <p className="text-gray-600 mb-4">{dish.description}</p>
          )}

          {dish.modifiers && dish.modifiers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Дополнительно:</h3>
              <div className="space-y-2">
                {dish.modifiers.map((modifier) => (
                  <label
                    key={modifier.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedModifiers.some((m) => m.id === modifier.id)}
                        onChange={() => toggleModifier(modifier)}
                        className="mr-3"
                      />
                      <span>{modifier.name}</span>
                    </div>
                    {modifier.price > 0 && (
                      <span className="text-gray-600">+{parseFloat(modifier.price).toFixed(2)} {currency}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Итого:</p>
              <p className="text-2xl font-bold text-primary-600">
                {getTotalPrice()} {currency}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={onClose} 
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-colors text-gray-600 text-2xl font-light"
                aria-label="Закрыть"
              >
                ✕
              </button>
              <button 
                onClick={handleAddToCart} 
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="hidden sm:inline">Добавить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishModal;