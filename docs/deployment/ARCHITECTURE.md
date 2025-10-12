# 🏗️ Production Architecture - OimoQR

> Архитектура production развертывания

---

## 📊 Общая схема

```
┌─────────────────────────────────────────────────────────────────┐
│                         ПОЛЬЗОВАТЕЛИ                             │
│                    (Браузеры, Мобильные)                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────┐            ┌──────────────────┐
│   FRONTEND      │            │    BACKEND       │
│   Vercel        │◄──────────►│    Render        │
│   oimoqr.com    │   API      │ backend.oimoqr   │
└────────┬────────┘            └────────┬─────────┘
         │                              │
         │                              │
         │                    ┌─────────┴─────────┐
         │                    │                   │
         │                    ▼                   ▼
         │            ┌──────────────┐   ┌──────────────┐
         │            │  DATABASE    │   │   STORAGE    │
         │            │  Supabase    │   │  Cloudinary  │
         │            │  PostgreSQL  │   │   Images     │
         │            └──────────────┘   └──────────────┘
         │                    │
         │                    │
         ▼                    ▼
┌──────────────┐     ┌──────────────┐
│   CDN        │     │    EMAIL     │
│   Vercel     │     │  Gmail SMTP  │
│   Global     │     │              │
└──────────────┘     └──────────────┘
```

---

## 🌐 Network Flow

### 1. Пользователь открывает сайт

```
Пользователь
    │
    │ 1. GET https://oimoqr.com
    ▼
Vercel CDN (Global)
    │
    │ 2. Возвращает HTML/CSS/JS
    ▼
Браузер пользователя
    │
    │ 3. Загружает React приложение
    ▼
Frontend запущен
```

### 2. Пользователь входит в систему

```
Frontend (React)
    │
    │ 1. POST /api/auth/login
    │    { email, password }
    ▼
Backend (Render)
    │
    │ 2. Проверяет credentials
    ▼
Database (Supabase)
    │
    │ 3. SELECT * FROM users WHERE email = ?
    ▼
Backend
    │
    │ 4. Генерирует JWT token
    ▼
Frontend
    │
    │ 5. Сохраняет token в localStorage
    ▼
Пользователь авторизован
```

### 3. Пользователь загружает изображение

```
Frontend
    │
    │ 1. POST /api/dishes
    │    FormData: { image, name, price }
    ▼
Backend
    │
    │ 2. Валидация файла
    ▼
Cloudinary
    │
    │ 3. Загрузка изображения
    │    Возвращает URL
    ▼
Backend
    │
    │ 4. Сохраняет URL в БД
    ▼
Database
    │
    │ 5. INSERT INTO dishes (image_url, ...)
    ▼
Frontend
    │
    │ 6. Отображает изображение
    ▼
Пользователь видит блюдо
```

### 4. Гость просматривает меню

```
Гость
    │
    │ 1. Сканирует QR код
    ▼
Браузер
    │
    │ 2. GET https://oimoqr.com/menu/restaurant-slug
    ▼
Frontend (Vercel CDN)
    │
    │ 3. Загружает React приложение
    ▼
Frontend
    │
    │ 4. GET /api/public/menu/restaurant-slug
    ▼
Backend
    │
    │ 5. SELECT * FROM restaurants, categories, dishes
    ▼
Database
    │
    │ 6. Возвращает данные меню
    ▼
Frontend
    │
    │ 7. Отображает меню
    ▼
Гость видит меню
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Network Security                              │
│  - HTTPS (SSL/TLS)                                      │
│  - DNS Security (DNSSEC)                                │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Application Security                          │
│  - CORS (только oimoqr.com)                            │
│  - Rate Limiting (100 req/15 min)                       │
│  - Input Validation                                     │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Authentication                                │
│  - JWT Tokens (7 days expiry)                          │
│  - Password Hashing (bcrypt)                           │
│  - Session Management                                   │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 4: Data Security                                 │
│  - SQL Injection Protection (Prisma ORM)               │
│  - XSS Protection (React auto-escaping)                │
│  - File Upload Validation                               │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 5: Infrastructure Security                       │
│  - Environment Variables (secrets)                      │
│  - Database Encryption (Supabase)                      │
│  - Secure Storage (Cloudinary)                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Component Details

### Frontend (Vercel)

**Technology:**

- React 18
- Vite
- TailwindCSS
- Zustand (state management)

**Deployment:**

- Auto-deploy from GitHub
- Global CDN
- Edge caching
- Automatic SSL

**Environment:**

```env
VITE_API_URL=https://backend.oimoqr.com/api
```

**Build Process:**

```bash
npm install
npm run build
# Output: dist/
```

**Hosting:**

- Region: Global (CDN)
- Build time: ~2-3 минуты
- Deploy time: ~30 секунд

### Backend (Render)

**Technology:**

- Node.js 18+
- Express
- Prisma ORM
- JWT Authentication

**Deployment:**

- Auto-deploy from GitHub
- Docker container
- Automatic SSL

**Environment:**

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
FRONTEND_URL=https://oimoqr.com
USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=...
EMAIL_USER=...
```

**Build Process:**

```bash
npm install
npx prisma generate
npm start
```

**Hosting:**

- Region: Frankfurt (EU)
- Build time: ~3-5 минут
- Cold start: ~30-60 секунд (Free tier)

### Database (Supabase)

**Technology:**

- PostgreSQL 15
- Connection Pooling (PgBouncer)

**Configuration:**

- Region: Singapore
- Connection Pooling: Port 6543
- Direct Connection: Port 5432

**Schema:**

```sql
users
restaurants
categories
dishes
modifiers
banners
subscriptions
```

**Backup:**

- Automatic daily backups
- Point-in-Time Recovery (7 days)

### Storage (Cloudinary)

**Technology:**

- Cloud-based image storage
- Automatic optimization
- CDN delivery

**Configuration:**

```env
CLOUDINARY_CLOUD_NAME=dhtbg34kt
CLOUDINARY_API_KEY=526641354759914
CLOUDINARY_API_SECRET=...
```

**Features:**

- Auto format (WebP)
- Auto quality
- Lazy loading
- Transformations

### Email (Gmail SMTP)

**Configuration:**

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yadjekvorobei@gmail.com
EMAIL_PASSWORD=... (App Password)
```

**Usage:**

- Welcome emails
- Password reset
- Subscription notifications

**Limits:**

- 500 emails/день (Free)

---

## 🔄 Data Flow

### User Registration

```
1. Frontend: Форма регистрации
   ↓
2. POST /api/auth/register
   { email, password, name }
   ↓
3. Backend: Валидация данных
   ↓
4. Backend: Hash password (bcrypt)
   ↓
5. Database: INSERT INTO users
   ↓
6. Backend: Генерация JWT token
   ↓
7. Email: Отправка welcome email
   ↓
8. Frontend: Сохранение token
   ↓
9. Frontend: Redirect на dashboard
```

### Menu Display

```
1. Гость: Сканирует QR код
   ↓
2. Frontend: GET /menu/:slug
   ↓
3. Frontend: GET /api/public/menu/:slug
   ↓
4. Backend: Проверка существования ресторана
   ↓
5. Database: SELECT restaurant, categories, dishes
   ↓
6. Backend: Форматирование данных
   ↓
7. Frontend: Рендеринг меню
   ↓
8. Cloudinary: Загрузка изображений
   ↓
9. Гость: Просмотр меню
```

### Image Upload

```
1. Frontend: Выбор файла
   ↓
2. Frontend: Валидация (тип, размер)
   ↓
3. POST /api/dishes (FormData)
   ↓
4. Backend: Multer middleware
   ↓
5. Backend: Валидация файла
   ↓
6. Cloudinary: Upload image
   ↓
7. Cloudinary: Возвращает URL
   ↓
8. Database: INSERT dish с image_url
   ↓
9. Backend: Возвращает данные блюда
   ↓
10. Frontend: Отображение блюда
```

---

## 🚀 Performance Optimization

### Frontend

**Implemented:**

- ✅ Code splitting (React.lazy)
- ✅ Image lazy loading
- ✅ Minification (Vite)
- ✅ Gzip compression (Vercel)
- ✅ CDN caching (Vercel)

**Recommended:**

- ⏳ Service Worker (PWA)
- ⏳ Prefetching
- ⏳ Bundle analysis

### Backend

**Implemented:**

- ✅ Prisma query optimization
- ✅ Connection pooling (PgBouncer)
- ✅ Rate limiting

**Recommended:**

- ⏳ Redis caching
- ⏳ Database indexes
- ⏳ Query optimization

### Database

**Implemented:**

- ✅ Connection pooling
- ✅ Prepared statements (Prisma)

**Recommended:**

- ⏳ Indexes на часто используемых полях
- ⏳ Query analysis
- ⏳ Materialized views

---

## 📊 Monitoring Points

### Health Checks

```
Frontend:  https://oimoqr.com (HTTP 200)
Backend:   https://backend.oimoqr.com/health (JSON response)
Database:  Connection test (Prisma)
Storage:   Cloudinary API status
```

### Metrics to Track

**Frontend:**

- Page load time
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

**Backend:**

- Response time
- Error rate
- Request rate
- CPU usage
- Memory usage

**Database:**

- Query time
- Connection count
- Storage usage
- Bandwidth usage

**Storage:**

- Upload time
- Storage usage
- Bandwidth usage
- Transformation count

---

## 🔧 Maintenance

### Regular Tasks

**Daily:**

- [ ] Проверка uptime (UptimeRobot)
- [ ] Проверка error logs

**Weekly:**

- [ ] Проверка метрик производительности
- [ ] Проверка использования ресурсов
- [ ] Проверка security alerts

**Monthly:**

- [ ] Backup verification
- [ ] Dependency updates
- [ ] Security audit
- [ ] Cost review

---

## 🎯 Scalability Plan

### Current Capacity

**Frontend (Vercel Free):**

- 100 GB bandwidth/месяц
- ~10,000 посетителей/месяц

**Backend (Render Free):**

- 512 MB RAM (shared)
- ~1,000 concurrent users

**Database (Supabase Free):**

- 500 MB storage
- ~10,000 ресторанов

### Scaling Options

**When to scale:**

- Frontend: >80 GB bandwidth/месяц
- Backend: >400 MB RAM usage
- Database: >400 MB storage

**How to scale:**

1. **Render Starter ($7/мес):**

   - 512 MB RAM (dedicated)
   - Backend не спит
   - Faster response

2. **Vercel Pro ($20/мес):**

   - 1 TB bandwidth
   - Analytics
   - Team features

3. **Supabase Pro ($25/мес):**

   - 8 GB storage
   - 50 GB bandwidth
   - Better performance

4. **Redis Caching:**
   - Upstash (бесплатно до 10k команд)
   - Значительно ускоряет работу

---

**Последнее обновление:** 2025-01-15  
**Версия:** 1.0.0
