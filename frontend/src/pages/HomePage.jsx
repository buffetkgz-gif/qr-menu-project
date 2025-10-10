import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">OimoQR</h1>
          <div className="space-x-4">
            <Link to="/login" className="btn-secondary">
              Вход
            </Link>
            <Link to="/register" className="btn-primary">
              Регистрация
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Цифровое меню для вашего ресторана
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Создайте современное QR-меню за 5 минут. Без программистов и дизайнеров.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Попробовать бесплатно 7 дней
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">QR-меню</h3>
            <p className="text-gray-600">
              Гости сканируют QR-код и видят ваше меню на своих телефонах
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Заказ в WhatsApp</h3>
            <p className="text-gray-600">
              Клиенты оформляют заказ прямо из меню и отправляют в WhatsApp
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Быстрое обновление</h3>
            <p className="text-gray-600">
              Меняйте цены и блюда в реальном времени без печати новых меню
            </p>
          </div>
        </div>

        <div className="card max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Возможности</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Баннер-слайдер для акций и специальных предложений</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Категории блюд с фотографиями и описаниями</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Модификаторы (размеры, добавки, соусы)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Интеграция с социальными сетями</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Уникальный субдомен для вашего ресторана</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>7 дней бесплатного пробного периода</span>
            </li>
          </ul>
        </div>
      </div>

      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 OimoQR. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;