import { useState } from 'react';
import DishModal from './DishModal';

const DishCard = ({ dish, currency = '₽' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="card cursor-pointer hover:shadow-lg transition-shadow"
      >
        {dish.image && (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
          />
        )}
        <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
        {dish.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {dish.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary-600">
            {parseFloat(dish.price).toFixed(2)} {currency}
          </span>
          <button className="btn-primary text-sm">
            Добавить
          </button>
        </div>
      </div>

      <DishModal
        dish={dish}
        currency={currency}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DishCard;