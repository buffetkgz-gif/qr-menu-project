# ⚡ Шпаргалка OimoQR

Быстрый справочник для ежедневной работы с **OimoQR**.

---

## 🚀 Быстрый запуск

```powershell
# Запустить всё
npm run dev

# Или по отдельности
npm run dev:backend   # Backend на :5000
npm run dev:frontend  # Frontend на :5173
```

---

## 🔗 Локальные URL

```
Frontend:           http://localhost:5173
Backend:            http://localhost:5000
API:                http://localhost:5000/api
Health:             http://localhost:5000/health
Dashboard:          http://localhost:5173/dashboard
Управление меню:    http://localhost:5173/menu-management
Настройки:          http://localhost:5173/settings
Админ панель:       http://localhost:5173/admin
Тест меню:          http://localhost:5173/menu/testrestaurant
Prisma Studio:      http://localhost:5555
```

---

## 🌐 Production URL

```
Главная:            https://oimoqr.com
API:                https://api.oimoqr.com
Health:             https://api.oimoqr.com/health
Рестораны:          https://*.oimoqr.com
```

---

## 👤 Тестовые аккаунты

```
Владелец:  test@restaurant.com / test123
Админ:     admin@oimoqr.com / admin123
```

---

## 📦 Основные команды

### Установка

```powershell
npm run install:all
```

### Запуск

```powershell
npm run dev
```

### База данных

```powershell
cd backend
npx prisma migrate dev    # Миграции
npx prisma generate       # Генерация клиента
npx prisma studio         # GUI
npm run seed              # Тестовые данные
```

### Создать админа

```powershell
cd backend
npm run create-admin email@example.com password123 "Name"
```

---

## 🗄️ PostgreSQL

### Подключение

```powershell
psql -U postgres -d qr_menu_db
```

### Полезные команды

```sql
\l                    -- Список БД
\dt                   -- Список таблиц
\d "User"             -- Описание таблицы
SELECT * FROM "User"; -- Все пользователи
\q                    -- Выход
```

---

## 📡 API Endpoints

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Restaurants

```
GET    /api/restaurants/:subdomain
PUT    /api/restaurants/:id
POST   /api/restaurants/:id/upload-banner
GET    /api/restaurants/:id/categories
```

### Menu

```
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
GET    /api/categories/:id/dishes
POST   /api/dishes
PUT    /api/dishes/:id
DELETE /api/dishes/:id
POST   /api/dishes/:id/upload-image
```

### Admin

```
GET    /api/admin/restaurants
PUT    /api/admin/subscriptions/:id
```

---

## 🔐 Аутентификация

### Получить токен

```javascript
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const { token } = await response.json();
```

### Использовать токен

```javascript
fetch("/api/auth/me", {
  headers: { Authorization: `Bearer ${token}` },
});
```

---

## 📁 Структура файлов

```
frontend/src/
├── components/    # Компоненты
├── pages/         # Страницы
├── services/      # API сервисы
└── store/         # Zustand stores

backend/src/
├── controllers/   # Бизнес-логика
├── routes/        # Маршруты
├── middleware/    # Middleware
└── utils/         # Утилиты
```

---

## 🎨 TailwindCSS классы

### Часто используемые

```css
/* Layout */
flex items-center justify-between
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
container mx-auto px-4

/* Spacing */
p-4 py-2 px-6 m-4 my-2 mx-auto
space-x-4 space-y-2 gap-4

/* Typography */
text-sm text-base text-lg text-xl text-2xl
font-normal font-medium font-semibold font-bold
text-gray-600 text-primary-600

/* Colors */
bg-white bg-gray-100 bg-primary-600
text-white text-gray-900
border-gray-300

/* Effects */
rounded rounded-lg rounded-full
shadow shadow-md shadow-lg
hover:bg-primary-700 transition
```

---

## 🔧 Переменные окружения

### Backend (.env) - Development

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/qr_menu_db"
JWT_SECRET="your-secret-key-min-32-chars"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

### Backend (.env) - Production

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-super-secret-key-min-32-chars"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://oimoqr.com
```

### Frontend (.env) - Development

```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend (.env) - Production

```env
VITE_API_URL=https://api.oimoqr.com/api
```

---

## 🐛 Отладка

### Backend логи

```javascript
console.log("Debug:", data);
console.error("Error:", error);
```

### Frontend логи

```javascript
console.log("State:", useAuthStore.getState());
console.log("Cart:", useCartStore.getState());
```

### Prisma запросы

```javascript
// Включить логи SQL
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
```

---

## 🔄 Git команды

```powershell
git status                    # Статус
git add .                     # Добавить все
git commit -m "message"       # Коммит
git push                      # Отправить
git pull                      # Получить
git checkout -b feature-name  # Новая ветка
```

---

## 📦 npm команды

```powershell
npm install package-name              # Установить
npm install package-name -D           # Dev зависимость
npm uninstall package-name            # Удалить
npm update                            # Обновить все
npm audit                             # Проверить уязвимости
npm run dev                           # Запустить dev
```

---

## 🔍 Поиск в коде

### PowerShell

```powershell
# Найти в файлах
Select-String -Path "src\**\*.js" -Pattern "searchTerm"

# Найти файлы
Get-ChildItem -Recurse -Filter "*.jsx"
```

---

## 🧪 Тестирование API

### cURL

```powershell
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@restaurant.com\",\"password\":\"test123\"}'
```

### Postman

```
1. Создать коллекцию "OimoQR"
2. Добавить переменную {{baseUrl}} = http://localhost:5000/api
3. Добавить переменную {{token}}
4. Импортировать endpoints из API.md
```

---

## 🚨 Частые ошибки

### Backend не запускается

```powershell
# Проверить PostgreSQL
Get-Service postgresql*

# Проверить порт
Get-NetTCPConnection -LocalPort 5000

# Проверить .env
cat backend\.env
```

### Frontend не подключается

```powershell
# Проверить VITE_API_URL
cat frontend\.env

# Проверить CORS
# В backend/src/server.js должен быть правильный FRONTEND_URL
```

### Ошибки БД

```powershell
# Пересоздать БД
cd backend
npx prisma migrate reset
npm run seed
```

---

## 📊 Мониторинг

### Проверить процессы

```powershell
Get-Process node
```

### Проверить порты

```powershell
Get-NetTCPConnection -LocalPort 5000,5173
```

### Размер проекта

```powershell
Get-ChildItem -Recurse | Measure-Object -Property Length -Sum
```

---

## 🎯 Быстрые действия

### Создать новую страницу

```javascript
// frontend/src/pages/NewPage.jsx
import React from "react";

function NewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">New Page</h1>
    </div>
  );
}

export default NewPage;
```

### Создать новый endpoint

```javascript
// backend/src/routes/example.routes.js
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "Hello" });
});

export default router;
```

### Добавить в БД

```prisma
// backend/prisma/schema.prisma
model Example {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
}
```

Затем:

```powershell
npx prisma migrate dev --name add_example
```

---

## 🔗 Полезные ссылки

### Документация проекта

- [README.md](./README.md) - Обзор проекта
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Быстрый деплой
- [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) - Настройка домена
- [BRANDING.md](./BRANDING.md) - Руководство по брендингу
- [POST_DEPLOY.md](./POST_DEPLOY.md) - После деплоя
- [LINKS.md](./LINKS.md) - Все ссылки

### Внешняя документация

- [React](https://react.dev)
- [Prisma](https://prisma.io/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Express](https://expressjs.com)

---

## 💡 Советы

### Производительность

```javascript
// Используйте React.memo для тяжелых компонентов
const DishCard = React.memo(({ dish }) => {
  // ...
});

// Используйте useMemo для вычислений
const total = useMemo(
  () => items.reduce((sum, item) => sum + item.price, 0),
  [items]
);
```

### Безопасность

```javascript
// Всегда валидируйте input
if (!email || !password) {
  return res.status(400).json({ message: "Required fields" });
}

// Используйте prepared statements (Prisma делает автоматически)
const user = await prisma.user.findUnique({
  where: { email },
});
```

### Отладка

```javascript
// Используйте debugger
debugger;

// Логируйте состояние
console.log("State:", { user, cart, items });

// Используйте React DevTools
// Установите расширение для браузера
```

---

## 🎨 Кастомизация

### Изменить цвета

```javascript
// frontend/tailwind.config.js
colors: {
  primary: {
    600: '#your-color',
  }
}
```

### Изменить порты

```javascript
// frontend/vite.config.js
server: {
  port: 3000;
}

// backend/.env
PORT = 4000;
```

---

## 📱 Responsive дизайн

```css
/* Mobile first */
<div className="text-sm md:text-base lg:text-lg">

/* Breakpoints */
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
```

---

## 🔥 Горячие клавиши

### VS Code

```
Ctrl+P          - Быстрый поиск файлов
Ctrl+Shift+F    - Поиск в проекте
Ctrl+`          - Терминал
Ctrl+B          - Боковая панель
F12             - Перейти к определению
Alt+Shift+F     - Форматировать
```

### Chrome DevTools

```
F12             - Открыть DevTools
Ctrl+Shift+C    - Инспектор элементов
Ctrl+Shift+J    - Консоль
Ctrl+Shift+M    - Mobile view
```

---

## 📋 Чеклист перед коммитом

```
□ Код работает локально
□ Нет console.log
□ Нет закомментированного кода
□ Форматирование правильное
□ Нет ошибок в консоли
□ Тесты проходят (если есть)
□ Коммит сообщение понятное
```

---

## 🎯 Следующие шаги

1. **Изучить проект**: [README.md](./README.md)
2. **Запустить локально**: `npm run dev`
3. **Проверить чеклист**: [PRE_DEPLOY_CHECKLIST.md](./PRE_DEPLOY_CHECKLIST.md)
4. **Задеплоить**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
5. **Настроить домен**: [DOMAIN_SETUP.md](./DOMAIN_SETUP.md)
6. **После деплоя**: [POST_DEPLOY.md](./POST_DEPLOY.md)

---

## 🎨 Брендинг OimoQR

### Правильное написание

- ✅ **OimoQR** (заглавные O, Q, R)
- ❌ OimoQr, Oimo QR, oimo-qr, OIMOQR

### Цвета

```css
Primary:    #0284c7 (blue-600)
Text:       #111827 (gray-900)
Background: #f9fafb (gray-50)
```

### Домены

```
Главная:    oimoqr.com
API:        api.oimoqr.com
Рестораны:  *.oimoqr.com
```

---

**Сохраните эту шпаргалку в закладки! ⚡**

**Проект**: OimoQR v1.0  
**Домен**: https://oimoqr.com
