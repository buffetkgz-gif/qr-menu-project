# 🗺️ Карта проекта QR Menu SaaS

Визуальная структура проекта для быстрой навигации.

---

## 📁 Структура файлов

```
d:\QR MENU\
│
├── 📄 package.json              # Корневой package.json (workspaces)
├── 📄 .gitignore                # Git ignore правила
│
├── 📚 Документация
│   ├── README.md                # Главная документация
│   ├── QUICKSTART.md            # Быстрый старт (5 минут)
│   ├── SETUP.md                 # Детальная установка
│   ├── API.md                   # API документация
│   ├── API_EXAMPLES.md          # Примеры использования API
│   ├── DEPLOYMENT.md            # Руководство по деплою
│   ├── TODO.md                  # Планы развития
│   ├── CHECKLIST.md             # Чеклист запуска
│   ├── COMMANDS.md              # Шпаргалка команд
│   ├── AI_PROMPTS.md            # AI промпты для контента
│   ├── PROJECT_INFO.md          # Бизнес-информация
│   ├── PROJECT_MAP.md           # Эта карта
│   └── SUMMARY.md               # Итоговое резюме
│
├── 🖥️ Backend (Node.js + Express + Prisma)
│   ├── package.json             # Backend зависимости
│   ├── .env.example             # Пример переменных окружения
│   ├── .env                     # Переменные окружения (не в git)
│   │
│   ├── prisma/
│   │   └── schema.prisma        # Схема базы данных
│   │
│   └── src/
│       ├── server.js            # Точка входа сервера
│       │
│       ├── controllers/         # Контроллеры (бизнес-логика)
│       │   ├── auth.controller.js
│       │   ├── restaurant.controller.js
│       │   ├── menu.controller.js
│       │   └── admin.controller.js
│       │
│       ├── routes/              # Маршруты API
│       │   ├── auth.routes.js
│       │   ├── restaurant.routes.js
│       │   ├── menu.routes.js
│       │   └── admin.routes.js
│       │
│       ├── middleware/          # Middleware
│       │   ├── auth.js          # JWT аутентификация
│       │   ├── errorHandler.js  # Обработка ошибок
│       │   ├── rateLimiter.js   # Rate limiting
│       │   └── upload.js        # Загрузка файлов
│       │
│       ├── utils/               # Утилиты
│       │   ├── email.js         # Email отправка
│       │   └── subscription.js  # Управление подписками
│       │
│       └── scripts/             # Скрипты
│           ├── createAdmin.js   # Создание админа
│           └── seedDatabase.js  # Заполнение БД
│
└── 🎨 Frontend (React + Vite + TailwindCSS)
    ├── package.json             # Frontend зависимости
    ├── .env.example             # Пример переменных окружения
    ├── .env                     # Переменные окружения (не в git)
    ├── vite.config.js           # Конфигурация Vite
    ├── tailwind.config.js       # Конфигурация TailwindCSS
    ├── postcss.config.js        # Конфигурация PostCSS
    ├── index.html               # HTML шаблон
    │
    └── src/
        ├── main.jsx             # Точка входа React
        ├── App.jsx              # Главный компонент
        ├── index.css            # Глобальные стили
        │
        ├── components/          # Переиспользуемые компоненты
        │   ├── PrivateRoute.jsx
        │   ├── AdminRoute.jsx
        │   ├── BannerSlider.jsx
        │   ├── DishCard.jsx
        │   ├── DishModal.jsx
        │   └── Cart.jsx
        │
        ├── pages/               # Страницы
        │   ├── HomePage.jsx
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── MenuPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── AdminPage.jsx
        │   └── NotFoundPage.jsx
        │
        ├── services/            # API сервисы
        │   ├── api.js           # Axios instance
        │   ├── auth.service.js
        │   ├── restaurant.service.js
        │   └── menu.service.js
        │
        └── store/               # State management (Zustand)
            ├── authStore.js
            └── cartStore.js
```

---

## 🗄️ База данных (PostgreSQL + Prisma)

```
qr_menu_db
│
├── User                         # Пользователи (владельцы ресторанов, админы)
│   ├── id (PK)
│   ├── email (unique)
│   ├── password (hashed)
│   ├── name
│   ├── role (OWNER | ADMIN)
│   └── restaurantId (FK) → Restaurant
│
├── Restaurant                   # Рестораны
│   ├── id (PK)
│   ├── name
│   ├── subdomain (unique)
│   ├── description
│   ├── address
│   ├── phone
│   ├── whatsapp
│   ├── instagram
│   ├── facebook
│   ├── banners (JSON array)
│   ├── deliveryEnabled
│   ├── deliveryFee
│   ├── minOrderAmount
│   └── subscriptionId (FK) → Subscription
│
├── Subscription                 # Подписки
│   ├── id (PK)
│   ├── plan (TRIAL | MONTHLY | YEARLY)
│   ├── status (TRIAL | ACTIVE | EXPIRED | CANCELLED)
│   ├── startDate
│   ├── endDate
│   └── restaurantId (FK) → Restaurant
│
├── Category                     # Категории меню
│   ├── id (PK)
│   ├── name
│   ├── displayOrder
│   └── restaurantId (FK) → Restaurant
│
├── Dish                         # Блюда
│   ├── id (PK)
│   ├── name
│   ├── description
│   ├── price
│   ├── image
│   ├── displayOrder
│   └── categoryId (FK) → Category
│
└── Modifier                     # Модификаторы (добавки)
    ├── id (PK)
    ├── name
    ├── priceModifier
    └── dishId (FK) → Dish
```

---

## 🔄 Поток данных

### Регистрация ресторана

```
1. Пользователь → RegisterPage
2. RegisterPage → auth.service.register()
3. auth.service → POST /api/auth/register
4. Backend → auth.controller.register()
5. Controller → Создает User, Restaurant, Subscription (TRIAL)
6. Controller → Отправляет welcome email
7. Controller → Возвращает JWT token
8. Frontend → Сохраняет token в authStore
9. Frontend → Редирект на /dashboard
```

### Просмотр меню

```
1. Клиент → MenuPage (/menu/:subdomain)
2. MenuPage → restaurant.service.getBySubdomain()
3. Service → GET /api/restaurants/:subdomain
4. Backend → restaurant.controller.getBySubdomain()
5. Controller → Находит Restaurant с Categories и Dishes
6. Controller → Возвращает данные
7. Frontend → Отображает меню
8. Клиент → Добавляет блюда в корзину (cartStore)
9. Клиент → Нажимает "Заказать через WhatsApp"
10. Frontend → Формирует сообщение и открывает WhatsApp
```

### Создание блюда

```
1. Владелец → DashboardPage (будущая страница редактирования)
2. Форма → menu.service.createDish()
3. Service → POST /api/dishes
4. Backend → menu.controller.createDish()
5. Controller → Проверяет права (auth middleware)
6. Controller → Создает Dish в БД
7. Controller → Возвращает созданное блюдо
8. Frontend → Обновляет список блюд
9. Владелец → Загружает фото
10. Форма → menu.service.uploadDishImage()
11. Service → POST /api/dishes/:id/upload-image (multipart/form-data)
12. Backend → Сохраняет файл в uploads/dishes/
13. Backend → Обновляет Dish.image в БД
14. Frontend → Отображает загруженное фото
```

---

## 🛣️ API Endpoints карта

```
/api
│
├── /auth                        # Аутентификация
│   ├── POST   /register         # Регистрация ресторана
│   ├── POST   /login            # Вход
│   └── GET    /me               # Текущий пользователь (protected)
│
├── /restaurants                 # Рестораны
│   ├── GET    /:subdomain       # Получить по субдомену (public)
│   ├── PUT    /:id              # Обновить (protected, owner)
│   ├── POST   /:id/upload-banner # Загрузить баннер (protected, owner)
│   └── GET    /:id/categories   # Получить категории (public)
│
├── /categories                  # Категории
│   ├── POST   /                 # Создать (protected, owner)
│   ├── PUT    /:id              # Обновить (protected, owner)
│   ├── DELETE /:id              # Удалить (protected, owner)
│   └── GET    /:id/dishes       # Получить блюда (public)
│
├── /dishes                      # Блюда
│   ├── POST   /                 # Создать (protected, owner)
│   ├── PUT    /:id              # Обновить (protected, owner)
│   ├── DELETE /:id              # Удалить (protected, owner)
│   └── POST   /:id/upload-image # Загрузить фото (protected, owner)
│
├── /modifiers                   # Модификаторы
│   ├── POST   /                 # Создать (protected, owner)
│   ├── PUT    /:id              # Обновить (protected, owner)
│   └── DELETE /:id              # Удалить (protected, owner)
│
└── /admin                       # Админ-панель
    ├── GET    /restaurants      # Все рестораны (protected, admin)
    └── PUT    /subscriptions/:id # Управление подпиской (protected, admin)
```

---

## 🎨 Frontend маршруты

```
/                                # HomePage (лендинг)
│
├── /login                       # LoginPage
├── /register                    # RegisterPage
│
├── /menu/:subdomain             # MenuPage (публичное меню)
│
├── /dashboard                   # DashboardPage (protected, owner)
│   ├── (будущее) /dashboard/menu
│   ├── (будущее) /dashboard/settings
│   └── (будущее) /dashboard/banners
│
├── /admin                       # AdminPage (protected, admin)
│
└── /*                           # NotFoundPage (404)
```

---

## 🔐 Middleware цепочка

### Публичные endpoints

```
Request → CORS → Helmet → Rate Limiter → Controller → Response
```

### Защищенные endpoints (owner)

```
Request → CORS → Helmet → Rate Limiter → Auth Middleware →
Check JWT → Verify User → Controller → Response
```

### Админ endpoints

```
Request → CORS → Helmet → Rate Limiter → Auth Middleware →
Check JWT → Verify User → Check Admin Role → Controller → Response
```

### Загрузка файлов

```
Request → CORS → Helmet → Rate Limiter → Auth Middleware →
Multer Upload → Validate File → Save File → Controller → Response
```

---

## 📦 Зависимости

### Backend (основные)

```
express              # Web framework
@prisma/client       # ORM
bcryptjs             # Password hashing
jsonwebtoken         # JWT tokens
multer               # File uploads
nodemailer           # Email sending
helmet               # Security headers
cors                 # CORS handling
express-rate-limit   # Rate limiting
dotenv               # Environment variables
```

### Frontend (основные)

```
react                # UI library
react-router-dom     # Routing
axios                # HTTP client
zustand              # State management
swiper               # Slider component
tailwindcss          # CSS framework
vite                 # Build tool
```

---

## 🔄 Жизненный цикл подписки

```
1. Регистрация
   └─> Создается Subscription (status: TRIAL, plan: TRIAL)
       └─> startDate: now
       └─> endDate: now + 7 days

2. Пробный период (7 дней)
   └─> Пользователь может использовать все функции
   └─> За 2 дня до окончания: email уведомление

3. Окончание пробного периода
   └─> status: EXPIRED
   └─> Доступ к редактированию заблокирован
   └─> Меню остается публичным (read-only)

4. Активация админом
   └─> Админ меняет: status: ACTIVE, plan: MONTHLY/YEARLY
   └─> startDate: now
   └─> endDate: now + 30/365 days
   └─> Email уведомление пользователю

5. Активная подписка
   └─> Полный доступ ко всем функциям
   └─> Автоматическая проверка endDate

6. Окончание подписки
   └─> status: EXPIRED
   └─> Email уведомление
   └─> Ожидание продления админом

7. Продление
   └─> Админ обновляет endDate
   └─> status: ACTIVE
   └─> Email уведомление

8. Отмена (опционально)
   └─> status: CANCELLED
   └─> Доступ заблокирован
   └─> Данные сохраняются
```

---

## 🎯 Основные функции по ролям

### Клиент (без регистрации)

```
✅ Просмотр меню ресторана
✅ Добавление блюд в корзину
✅ Выбор модификаторов
✅ Оформление заказа через WhatsApp
```

### Владелец ресторана (OWNER)

```
✅ Регистрация и вход
✅ Просмотр дашборда
✅ Просмотр статуса подписки
✅ Обновление информации о ресторане
✅ Загрузка баннеров
✅ Создание/редактирование/удаление категорий
✅ Создание/редактирование/удаление блюд
✅ Загрузка фотографий блюд
✅ Создание/редактирование/удаление модификаторов
✅ Просмотр своего меню
```

### Администратор (ADMIN)

```
✅ Вход в админ-панель
✅ Просмотр всех ресторанов
✅ Просмотр статистики подписок
✅ Активация подписок
✅ Продление подписок
✅ Отмена подписок
✅ Изменение планов подписок
```

---

## 🔧 Переменные окружения

### Backend (.env)

```
# База данных
DATABASE_URL=postgresql://user:pass@host:5432/db

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

# Сервер
PORT=5000
NODE_ENV=development

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=QR Menu <noreply@qrmenu.com>

# Frontend
FRONTEND_URL=http://localhost:5173

# Загрузка файлов
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Подписки
TRIAL_PERIOD_DAYS=7
```

### Frontend (.env)

```
# API
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Статистика проекта

```
📁 Файлов:                    50+
📝 Строк кода:                5000+
📚 Документации:              15 файлов
🎨 React компонентов:         13
🛣️ API endpoints:             25+
🗄️ Database моделей:          6
🔧 Middleware:                4
📦 Backend зависимостей:      15+
📦 Frontend зависимостей:     10+
```

---

## 🚀 Быстрая навигация

### Хочу запустить проект

→ [QUICKSTART.md](./QUICKSTART.md)

### Хочу понять API

→ [API.md](./API.md) + [API_EXAMPLES.md](./API_EXAMPLES.md)

### Хочу задеплоить

→ [DEPLOYMENT.md](./DEPLOYMENT.md)

### Хочу добавить функцию

→ [TODO.md](./TODO.md) + эта карта

### Забыл команду

→ [COMMANDS.md](./COMMANDS.md)

### Нужны AI промпты

→ [AI_PROMPTS.md](./AI_PROMPTS.md)

### Проблемы с установкой

→ [SETUP.md](./SETUP.md) + [CHECKLIST.md](./CHECKLIST.md)

---

## 🎨 Цветовая схема

### TailwindCSS конфигурация

```javascript
colors: {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    // ... оранжевые оттенки
    600: '#ea580c',  // Основной цвет
    900: '#7c2d12',
  }
}
```

### Использование

```
Кнопки:           bg-primary-600 hover:bg-primary-700
Ссылки:           text-primary-600
Акценты:          border-primary-600
WhatsApp:         bg-green-500
Успех:            bg-green-500
Ошибка:           bg-red-500
Предупреждение:   bg-yellow-500
```

---

## 🔗 Внутренние связи

```
User ──1:1──> Restaurant ──1:1──> Subscription
                  │
                  └──1:N──> Category ──1:N──> Dish ──1:N──> Modifier
```

---

**Используйте эту карту для быстрой навигации по проекту! 🗺️**
