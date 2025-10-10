import { useState } from 'react';
import { useCartStore } from '../store/cartStore';

const Cart = ({ restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCartStore();
  const currency = restaurant?.currency || '₽';

  const handleCheckout = () => {
    if (items.length === 0) return;

    const orderText = items
      .map((item) => {
        const modifiersText = item.modifiers.length > 0
          ? ` (${item.modifiers.map((m) => m.name).join(', ')})`
          : '';
        const itemTotal = (item.totalPrice * item.quantity).toFixed(2);
        return `${item.quantity}x ${item.dish.name}${modifiersText} - ${itemTotal} ${currency}`;
      })
      .join('\n');

    const total = getTotal().toFixed(2);
    const message = `Здравствуйте! Хочу сделать заказ:\n\n${orderText}\n\nИтого: ${total} ${currency}`;

    const whatsappNumber = restaurant.whatsapp?.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsOpen(false);
  };

  const itemCount = getItemCount();

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-colors z-40"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white w-full md:max-w-2xl md:rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Корзина</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Корзина пуста</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.itemId} className="flex gap-4 border-b pb-4">
                        {item.dish.image && (
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.dish.name}</h3>
                          {item.modifiers.length > 0 && (
                            <p className="text-sm text-gray-600">
                              {item.modifiers.map((m) => m.name).join(', ')}
                            </p>
                          )}
                          <p className="text-primary-600 font-semibold">
                            {item.totalPrice} {currency}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.itemId)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {getTotal()} {currency}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full btn-primary py-3 text-lg"
                    >
                      Оформить заказ в WhatsApp
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;