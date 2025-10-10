# QR Menu SaaS - Информация о проекте

## 📋 Описание проекта

QR Menu SaaS - это платформа для создания цифровых меню для ресторанов, кафе и других заведений общественного питания. Клиенты сканируют QR-код и получают доступ к интерактивному меню на своих смартфонах.

## 🎯 Основные возможности

### Для владельцев ресторанов:

- ✅ Быстрая регистрация (5 минут)
- ✅ 7 дней бесплатного пробного периода
- ✅ Управление категориями и блюдами
- ✅ Загрузка фотографий блюд
- ✅ Баннер-слайдер для акций
- ✅ Модификаторы (размеры, добавки)
- ✅ Настройка доставки
- ✅ Интеграция с социальными сетями
- ✅ Уникальный субдомен

### Для клиентов:

- ✅ Просмотр меню без установки приложений
- ✅ Красивый интерфейс с фотографиями
- ✅ Корзина для формирования заказа
- ✅ Отправка заказа в WhatsApp
- ✅ Информация о ресторане и контакты

### Для администраторов:

- ✅ Управление всеми ресторанами
- ✅ Управление подписками
- ✅ Статистика по подпискам
- ✅ Продление и активация подписок

## 🏗️ Архитектура

### Frontend

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Routing:** React Router v6
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Slider:** Swiper.js

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **File Upload:** Multer
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Rate Limiting

### Database Schema

```
Users (владельцы ресторанов)
  ├── Restaurant (1:1)
      ├── Subscription (1:1)
      └── Categories (1:N)
          └── Dishes (1:N)
              └── Modifiers (1:N)
```

## 📁 Структура проекта

```
qr-menu-saas/
├── frontend/                 # React приложение
│   ├── src/
│   │   ├── components/      # Переиспользуемые компоненты
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── BannerSlider.jsx
│   │   │   ├── DishCard.jsx
│   │   │   ├── DishModal.jsx
│   │   │   └── Cart.jsx
│   │   ├── pages/           # Страницы приложения
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/        # API сервисы
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── restaurantService.js
│   │   │   └── menuService.js
│   │   ├── store/           # Zustand stores
│   │   │   ├── authStore.js
│   │   │   └── cartStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/     # Контроллеры
│   │   │   ├── auth.controller.js
│   │   │   ├── restaurant.controller.js
│   │   │   ├── category.controller.js
│   │   │   ├── dish.controller.js
│   │   │   └── admin.controller.js
│   │   ├── routes/          # Маршруты
│   │   │   ├── auth.routes.js
│   │   │   ├── restaurant.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── dish.routes.js
│   │   │   └── admin.routes.js
│   │   ├── middleware/      # Middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── upload.js
│   │   ├── utils/           # Утилиты
│   │   │   ├── email.js
│   │   │   └── subscription.js
│   │   ├── scripts/         # Скрипты
│   │   │   ├── createAdmin.js
│   │   │   └── seedDatabase.js
│   │   └── server.js        # Точка входа
│   ├── prisma/
│   │   └── schema.prisma    # Схема базы данных
│   ├── uploads/             # Загруженные файлы
│   └── package.json
│
├── .gitignore
├── package.json             # Root workspace
├── README.md                # Основная документация
├── SETUP.md                 # Полная инструкция по установке
├── QUICKSTART.md            # Быстрый старт
├── API.md                   # API документация
├── TODO.md                  # План развития
└── PROJECT_INFO.md          # Этот файл
```

## 🔐 Безопасность

- JWT токены для аутентификации
- Bcrypt для хеширования паролей
- Helmet для HTTP заголовков безопасности
- CORS настроен для frontend
- Rate limiting для защиты от DDoS
- Валидация всех входных данных
- Защита от SQL injection (Prisma ORM)

## 🚀 Деплой

### Рекомендуемые платформы:

**Frontend:**

- Vercel (рекомендуется)
- Netlify
- GitHub Pages

**Backend:**

- Render (рекомендуется)
- Heroku
- DigitalOcean
- AWS EC2

**Database:**

- Supabase (рекомендуется)
- Railway
- Heroku Postgres
- AWS RDS

**File Storage:**

- AWS S3
- Cloudinary (рекомендуется для изображений)
- DigitalOcean Spaces

## 💰 Бизнес-модель

### Тарифные планы:

1. **Trial (7 дней)**

   - Все функции
   - Бесплатно
   - Автоматически при регистрации

2. **Monthly**

   - Все функции
   - Ежемесячная оплата
   - Рекомендуемая цена: 990₽/месяц

3. **Yearly**
   - Все функции
   - Годовая оплата
   - Рекомендуемая цена: 9,990₽/год (скидка 17%)

### Дополнительные услуги:

- Настройка меню (разовая услуга)
- Фотосъемка блюд
- Дизайн баннеров
- Интеграция с POS системами
- Индивидуальные доработки

## 📊 Метрики успеха

### KPI для отслеживания:

- Количество зарегистрированных ресторанов
- Конверсия Trial → Paid
- Churn rate (отток клиентов)
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost)

### Метрики продукта:

- Количество просмотров меню
- Количество заказов через WhatsApp
- Среднее время на странице меню
- Bounce rate
- Популярные блюда

## 🎯 Целевая аудитория

### Основная:

- Небольшие рестораны и кафе (5-50 столов)
- Фуд-корты
- Кофейни
- Бары
- Пиццерии
- Суши-бары

### Вторичная:

- Сетевые рестораны
- Отели (room service)
- Кейтеринговые компании
- Доставка еды

## 🌍 Рынок

### Размер рынка:

- Россия: ~200,000 ресторанов и кафе
- СНГ: ~300,000 заведений
- Потенциальный TAM: $100M+

### Конкуренты:

- iiko
- Poster
- R-Keeper
- Tillypad
- Собственные разработки

### Конкурентные преимущества:

- ✅ Простота использования
- ✅ Быстрый старт (5 минут)
- ✅ Низкая цена
- ✅ Без привязки к POS системам
- ✅ Современный дизайн
- ✅ Мобильная оптимизация

## 📈 Roadmap

### Q1 2024:

- ✅ MVP (текущая версия)
- [ ] Интеграция платежей
- [ ] Мобильное приложение
- [ ] Статистика и аналитика

### Q2 2024:

- [ ] Telegram Bot
- [ ] Система отзывов
- [ ] Программа лояльности
- [ ] API для интеграций

### Q3 2024:

- [ ] Бронирование столиков
- [ ] Онлайн-оплата заказов
- [ ] Интеграция с POS
- [ ] Корпоративные тарифы

### Q4 2024:

- [ ] Международная экспансия
- [ ] Партнерская программа
- [ ] White-label решение
- [ ] Enterprise функции

## 👥 Команда

### Необходимые роли:

- [ ] Full-stack разработчик (1-2)
- [ ] UI/UX дизайнер (1)
- [ ] Product Manager (1)
- [ ] Marketing Manager (1)
- [ ] Customer Support (1)

## 📞 Контакты

- **Email:** support@qrmenu.com
- **Telegram:** @qrmenu_support
- **Website:** https://qrmenu.com

## 📄 Лицензия

Proprietary - Все права защищены

---

**Версия:** 1.0.0  
**Дата создания:** 2024  
**Последнее обновление:** 2024
