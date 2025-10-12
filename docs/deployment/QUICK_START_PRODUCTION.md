# ⚡ Quick Start - Production

> Быстрая инструкция для работы с production окружением

---

## 🌐 Ваши Production URLs

```
Frontend:     https://oimoqr.com
Backend:      https://backend.oimoqr.com
API:          https://backend.oimoqr.com/api
Health Check: https://backend.oimoqr.com/health
```

---

## 🚨 Важно: Backend засыпает!

На бесплатном плане Render backend **засыпает после 15 минут неактивности**.

### ⚡ Быстрое решение (5 минут)

**Настройте UptimeRobot для автоматического "пробуждения":**

1. Перейдите на https://uptimerobot.com
2. Зарегистрируйтесь (бесплатно)
3. Создайте монитор:
   - **Type:** HTTP(s)
   - **URL:** `https://backend.oimoqr.com/health`
   - **Interval:** Every 5 minutes
4. Сохраните

✅ **Готово!** Backend больше не будет засыпать.

📖 **Подробная инструкция:** [UPTIMEROBOT_SETUP.md](./UPTIMEROBOT_SETUP.md)

---

## 🔧 Dashboards

### Render (Backend)

```
https://dashboard.render.com
```

**Что здесь:**

- Логи backend
- Переменные окружения
- Статус деплоя
- Метрики производительности

### Vercel (Frontend)

```
https://vercel.com/dashboard
```

**Что здесь:**

- Логи frontend
- Переменные окружения
- История деплоев
- Analytics

### Supabase (Database)

```
https://supabase.com/dashboard
```

**Что здесь:**

- Database explorer
- SQL editor
- Логи запросов
- Backup & restore

### Cloudinary (Images)

```
https://cloudinary.com/console
```

**Что здесь:**

- Загруженные изображения
- Storage usage
- Transformations
- API usage

---

## 🔍 Проверка работоспособности

### 1. Backend Health Check

```powershell
curl https://backend.oimoqr.com/health
```

**Ожидаемый ответ:**

```json
{ "status": "ok", "timestamp": "2025-01-15T12:00:00.000Z" }
```

**Если не отвечает:**

- Подождите 30-60 секунд (backend просыпается)
- Попробуйте снова
- Проверьте Render Dashboard → Logs

### 2. Frontend Check

```powershell
curl -I https://oimoqr.com
```

**Ожидаемый ответ:**

```
HTTP/2 200
```

### 3. API Check

Откройте в браузере:

```
https://oimoqr.com
```

- Попробуйте войти
- Проверьте консоль (F12) на ошибки
- Убедитесь, что нет CORS ошибок

---

## 📝 Обновление кода

### Автоматический деплой

```powershell
# 1. Внесите изменения в код
# 2. Закоммитьте
git add .
git commit -m "Update: описание изменений"

# 3. Отправьте на GitHub
git push origin main

# 4. Автоматический деплой
# ✅ Vercel автоматически задеплоит frontend (~2 минуты)
# ✅ Render автоматически задеплоит backend (~3-5 минут)
```

### Проверка деплоя

**Vercel:**

1. Откройте https://vercel.com/dashboard
2. Deployments → смотрите статус
3. Когда статус "Ready" - деплой завершен

**Render:**

1. Откройте https://dashboard.render.com
2. Events → смотрите статус
3. Когда статус "Live" - деплой завершен

---

## 🔐 Переменные окружения

### Обновление в Render (Backend)

1. Откройте https://dashboard.render.com
2. Выберите ваш сервис
3. Environment → Edit
4. Измените нужные переменные
5. Save Changes
6. Сервис автоматически перезапустится (~2 минуты)

### Обновление в Vercel (Frontend)

1. Откройте https://vercel.com/dashboard
2. Settings → Environment Variables
3. Измените нужные переменные
4. Save
5. Deployments → Redeploy (нажмите на последний деплой → Redeploy)

**⚠️ Важно:** После изменения переменных в Vercel нужно **вручную** сделать redeploy!

---

## 📊 Мониторинг

### Логи Backend (Render)

```
https://dashboard.render.com → Logs
```

**Полезные фильтры:**

- `error` - все ошибки
- `cors` - CORS проблемы
- `prisma` - database запросы
- `cloudinary` - загрузка изображений

### Логи Frontend (Vercel)

```
https://vercel.com/dashboard → Logs
```

**Что смотреть:**

- Build logs - ошибки сборки
- Function logs - API routes (если есть)
- Edge logs - CDN

### Database Logs (Supabase)

```
https://supabase.com/dashboard → Logs → Explorer
```

**Что смотреть:**

- Slow queries - медленные запросы
- Errors - ошибки подключения
- Connections - количество подключений

---

## 🚨 Troubleshooting

### Backend возвращает 404

**Причина:** Backend спит (Render Free Tier)

**Решение:**

1. Подождите 30-60 секунд
2. Попробуйте снова
3. Настройте UptimeRobot (см. выше)

### CORS ошибки

**Проверьте в Render:**

```env
FRONTEND_URL=https://oimoqr.com
```

(без `/` в конце!)

**Проверьте в Vercel:**

```env
VITE_API_URL=https://backend.oimoqr.com/api
```

(с `/api` в конце!)

### Изображения не загружаются

**Проверьте Cloudinary credentials в Render:**

```env
USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=dhtbg34kt
CLOUDINARY_API_KEY=526641354759914
CLOUDINARY_API_SECRET=_PecTLrun71RhWlIUr_e2bvbies
```

**Проверьте логи Render:**

- Ищите "cloudinary" или "upload"

### Email не отправляется

**Проверьте Gmail App Password в Render:**

```env
EMAIL_USER=yadjekvorobei@gmail.com
EMAIL_PASSWORD=tflgfblrgijvfutc
```

**Создайте новый App Password:**

1. https://myaccount.google.com/apppasswords
2. Создайте новый
3. Обновите в Render

---

## 📞 Быстрые ссылки

### Dashboards

- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Cloudinary Console](https://cloudinary.com/console)

### Документация

- [Production Config](./PRODUCTION_CONFIG.md) - Полная конфигурация
- [UptimeRobot Setup](./UPTIMEROBOT_SETUP.md) - Настройка мониторинга
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Полное руководство

### Status Pages

- [Render Status](https://status.render.com)
- [Vercel Status](https://www.vercel-status.com)
- [Supabase Status](https://status.supabase.com)

---

## ✅ Daily Checklist

Ежедневная проверка (1 минута):

- [ ] Откройте https://oimoqr.com - сайт загружается?
- [ ] Проверьте https://backend.oimoqr.com/health - отвечает?
- [ ] Проверьте UptimeRobot - статус "Up"?
- [ ] Проверьте email - нет уведомлений о проблемах?

---

## 💰 Текущие расходы

```
Vercel:     $0/месяц (Free)
Render:     $0/месяц (Free)
Supabase:   $0/месяц (Free)
Cloudinary: $0/месяц (Free)
UptimeRobot: $0/месяц (Free)
────────────────────────────
Итого:      $0/месяц
```

**Upgrade опции:**

- Render Paid: $7/мес - backend не спит
- Vercel Pro: $20/мес - больше bandwidth
- Supabase Pro: $25/мес - больше storage

---

**Последнее обновление:** 2025-01-15  
**Статус:** ✅ Production Ready
