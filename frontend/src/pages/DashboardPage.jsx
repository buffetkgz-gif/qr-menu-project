import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await authService.getMe();
      setUserData(data);
    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSubscriptionStatus = () => {
    if (!userData?.restaurant?.subscription) return 'Нет подписки';
    
    const sub = userData.restaurant.subscription;
    const now = new Date();
    
    if (sub.status === 'TRIAL') {
      const daysLeft = Math.ceil((new Date(sub.trialEndsAt) - now) / (1000 * 60 * 60 * 24));
      return `Пробный период (осталось ${daysLeft} дней)`;
    }
    
    if (sub.status === 'ACTIVE') {
      const daysLeft = Math.ceil((new Date(sub.currentPeriodEnd) - now) / (1000 * 60 * 60 * 24));
      return `Активна (осталось ${daysLeft} дней)`;
    }
    
    return 'Истекла';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">OimoQR</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Выход
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Панель управления</h2>

        {/* Subscription Status */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-4">Статус подписки</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg">{getSubscriptionStatus()}</p>
              {userData?.restaurant?.subscription?.status === 'TRIAL' && (
                <p className="text-sm text-gray-600 mt-2">
                  После окончания пробного периода свяжитесь с администратором для активации подписки
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        {userData?.restaurant && (
          <div className="card mb-8">
            <h3 className="text-xl font-semibold mb-4">Информация о ресторане</h3>
            <div className="space-y-2">
              <p><strong>Название:</strong> {userData.restaurant.name}</p>
              <p><strong>Субдомен:</strong> {userData.restaurant.subdomain}.oimoqr.com</p>
              <a
                href={`/menu/${userData.restaurant.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 btn-primary"
              >
                Посмотреть меню
              </a>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">Редактировать меню</h3>
            <p className="text-gray-600 text-sm mb-4">
              Добавляйте категории и блюда
            </p>
            <button onClick={() => navigate('/menu-management')} className="btn-primary w-full">
              Перейти
            </button>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold mb-2">Настройки</h3>
            <p className="text-gray-600 text-sm mb-4">
              Баннеры, соцсети, доставка
            </p>
            <button onClick={() => navigate('/settings')} className="btn-primary w-full">
              Перейти
            </button>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Статистика</h3>
            <p className="text-gray-600 text-sm mb-4">
              Просмотры и заказы
            </p>
            <button onClick={() => alert('Статистика будет доступна в следующей версии')} className="btn-primary w-full">
              Перейти
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="card mt-8 bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold mb-2">💡 Совет</h3>
          <p className="text-gray-700">
            Добавьте красивые фотографии блюд и подробные описания, чтобы увеличить количество заказов.
            Не забудьте настроить баннеры для акций и специальных предложений!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;