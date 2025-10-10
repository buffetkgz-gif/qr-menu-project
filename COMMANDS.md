# ⚡ Шпаргалка команд QR Menu SaaS

Быстрый справочник всех команд для работы с проектом.

---

## 🚀 Основные команды

### Установка

```powershell
# Установить все зависимости
npm run install:all

# Или по отдельности
npm install                      # Корневой проект
npm install --workspace=backend  # Backend
npm install --workspace=frontend # Frontend
```

### Запуск

```powershell
# Запустить всё (backend + frontend)
npm run dev

# Запустить по отдельности
npm run dev:backend   # Backend на http://localhost:5000
npm run dev:frontend  # Frontend на http://localhost:5173
```

### Сборка

```powershell
# Собрать для production
npm run build

# Или по отдельности
npm run build --workspace=backend
npm run build --workspace=frontend
```

---

## 🗄️ База данных (Prisma)

### Миграции

```powershell
# Перейти в backend
Set-Location backend

# Создать и применить миграцию
npx prisma migrate dev --name migration_name

# Применить миграции (production)
npx prisma migrate deploy

# Сбросить базу данных (ОСТОРОЖНО!)
npx prisma migrate reset

# Проверить статус миграций
npx prisma migrate status
```

### Prisma Client

```powershell
# Сгенерировать Prisma Client
npx prisma generate

# Обновить схему из базы данных
npx prisma db pull

# Применить схему в базу данных
npx prisma db push
```

### Prisma Studio

```powershell
# Открыть GUI для базы данных
npx prisma studio
```

---

## 🌱 Seed данные

```powershell
# Заполнить базу тестовыми данными
Set-Location backend
npm run seed

# Создать администратора
npm run create-admin <email> <password> <name>

# Пример
npm run create-admin admin@qrmenu.com admin123 "Admin Name"
```

---

## 📦 Управление пакетами

### Установка новых пакетов

```powershell
# В корневой проект
npm install <package-name>

# В backend
npm install <package-name> --workspace=backend

# В frontend
npm install <package-name> --workspace=frontend

# Dev зависимости
npm install <package-name> -D --workspace=backend
```

### Обновление пакетов

```powershell
# Проверить устаревшие пакеты
npm outdated

# Обновить все пакеты
npm update

# Обновить конкретный пакет
npm update <package-name>

# Обновить до последней версии (игнорируя semver)
npm install <package-name>@latest
```

### Удаление пакетов

```powershell
# Удалить из backend
npm uninstall <package-name> --workspace=backend

# Удалить из frontend
npm uninstall <package-name> --workspace=frontend
```

---

## 🧪 Тестирование

### API тесты (curl)

```powershell
# Health check
curl http://localhost:5000/health

# Регистрация
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"test123\",\"restaurantName\":\"Test\",\"ownerName\":\"Owner\",\"phone\":\"+123\",\"subdomain\":\"test\"}'

# Вход
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@restaurant.com\",\"password\":\"test123\"}'

# Получить пользователя (замените TOKEN)
curl http://localhost:5000/api/auth/me `
  -H "Authorization: Bearer TOKEN"
```

### Проверка портов

```powershell
# Проверить, что порт свободен
Get-NetTCPConnection -LocalPort 5000  # Backend
Get-NetTCPConnection -LocalPort 5173  # Frontend

# Убить процесс на порту (если занят)
$process = Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $process -Force
```

---

## 🔧 Отладка

### Логи

```powershell
# Backend логи (в консоли где запущен npm run dev:backend)
# Frontend логи (в консоли браузера F12)

# Логи PostgreSQL (Windows)
Get-Content "C:\Program Files\PostgreSQL\14\data\log\*.log" -Tail 50
```

### Очистка кэша

```powershell
# Очистить node_modules и переустановить
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force backend\node_modules
Remove-Item -Recurse -Force frontend\node_modules
npm run install:all

# Очистить Vite кэш
Remove-Item -Recurse -Force frontend\.vite
Remove-Item -Recurse -Force frontend\dist

# Очистить Prisma кэш
Remove-Item -Recurse -Force backend\node_modules\.prisma
Set-Location backend
npx prisma generate
```

---

## 🗃️ PostgreSQL команды

### Подключение

```powershell
# Подключиться к PostgreSQL
psql -U postgres

# Подключиться к конкретной базе
psql -U postgres -d qr_menu_db
```

### Основные SQL команды

```sql
-- Список баз данных
\l

-- Подключиться к базе
\c qr_menu_db

-- Список таблиц
\dt

-- Описание таблицы
\d "User"

-- Выйти
\q

-- Создать базу данных
CREATE DATABASE qr_menu_db;

-- Удалить базу данных (ОСТОРОЖНО!)
DROP DATABASE qr_menu_db;

-- Создать пользователя
CREATE USER qr_menu_user WITH PASSWORD 'password';

-- Дать права
GRANT ALL PRIVILEGES ON DATABASE qr_menu_db TO qr_menu_user;

-- Показать все записи
SELECT * FROM "User";
SELECT * FROM "Restaurant";
SELECT * FROM "Dish";

-- Подсчитать записи
SELECT COUNT(*) FROM "User";

-- Удалить все записи (ОСТОРОЖНО!)
TRUNCATE TABLE "User" CASCADE;
```

---

## 📁 Файловая система

### Создание директорий

```powershell
# Создать директорию для загрузок
New-Item -ItemType Directory -Path backend\uploads -Force
New-Item -ItemType Directory -Path backend\uploads\banners -Force
New-Item -ItemType Directory -Path backend\uploads\dishes -Force
```

### Права доступа

```powershell
# Проверить права на директорию
Get-Acl backend\uploads | Format-List

# Дать полные права (если нужно)
$acl = Get-Acl backend\uploads
$permission = "Everyone","FullControl","Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl backend\uploads $acl
```

---

## 🔒 Безопасность

### Проверка уязвимостей

```powershell
# Проверить уязвимости
npm audit

# Автоматически исправить (если возможно)
npm audit fix

# Принудительно исправить (может сломать совместимость)
npm audit fix --force
```

### Генерация секретов

```powershell
# Сгенерировать случайный JWT_SECRET (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Или в PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

---

## 🌐 Git команды

### Основные

```powershell
# Инициализировать репозиторий
git init

# Проверить статус
git status

# Добавить все файлы
git add .

# Коммит
git commit -m "Commit message"

# Отправить на GitHub
git remote add origin <repository-url>
git branch -M main
git push -u origin main
```

### Ветки

```powershell
# Создать новую ветку
git checkout -b feature-name

# Переключиться на ветку
git checkout main

# Слить ветку
git merge feature-name

# Удалить ветку
git branch -d feature-name
```

---

## 📊 Мониторинг

### Производительность

```powershell
# Измерить время выполнения команды
Measure-Command { Invoke-WebRequest http://localhost:5000/health }

# Проверить использование памяти Node.js процессом
Get-Process node | Select-Object Name, CPU, WorkingSet

# Размер директории
Get-ChildItem backend\uploads -Recurse | Measure-Object -Property Length -Sum
```

### Системная информация

```powershell
# Версия Node.js
node --version

# Версия npm
npm --version

# Версия PostgreSQL
psql --version

# Информация о системе
Get-ComputerInfo | Select-Object CsName, OsName, OsVersion

# Свободное место на диске
Get-PSDrive C | Select-Object Used, Free
```

---

## 🚀 Production команды

### Build

```powershell
# Собрать frontend для production
Set-Location frontend
npm run build

# Результат в frontend/dist
```

### Запуск production

```powershell
# Backend (после сборки)
Set-Location backend
$env:NODE_ENV="production"
node src/server.js

# Frontend (через serve)
npm install -g serve
serve -s frontend/dist -l 3000
```

---

## 🔄 Обновление проекта

### После git pull

```powershell
# Обновить зависимости
npm install

# Обновить Prisma Client
Set-Location backend
npx prisma generate

# Применить новые миграции
npx prisma migrate deploy

# Перезапустить сервер
npm run dev
```

---

## 📝 Полезные алиасы (опционально)

Добавьте в PowerShell профиль (`$PROFILE`):

```powershell
# Открыть профиль
notepad $PROFILE

# Добавить алиасы
function qr-dev { Set-Location "d:\QR MENU"; npm run dev }
function qr-backend { Set-Location "d:\QR MENU"; npm run dev:backend }
function qr-frontend { Set-Location "d:\QR MENU"; npm run dev:frontend }
function qr-studio { Set-Location "d:\QR MENU\backend"; npx prisma studio }
function qr-seed { Set-Location "d:\QR MENU\backend"; npm run seed }

# Использование
qr-dev      # Запустить всё
qr-studio   # Открыть Prisma Studio
```

---

## 🆘 Экстренные команды

### Полный сброс проекта

```powershell
# ОСТОРОЖНО! Удаляет все данные

# 1. Остановить все процессы (Ctrl+C в терминалах)

# 2. Удалить node_modules
Remove-Item -Recurse -Force node_modules, backend\node_modules, frontend\node_modules

# 3. Сбросить базу данных
Set-Location backend
npx prisma migrate reset --force

# 4. Переустановить зависимости
Set-Location ..
npm run install:all

# 5. Применить миграции
Set-Location backend
npx prisma migrate dev

# 6. Заполнить данными
npm run seed

# 7. Запустить
Set-Location ..
npm run dev
```

### Восстановление из backup

```powershell
# Восстановить базу данных из SQL файла
psql -U postgres -d qr_menu_db -f backup.sql

# Восстановить загруженные файлы
Copy-Item -Recurse backup\uploads\* backend\uploads\
```

---

## 📚 Документация

### Открыть документацию

```powershell
# В браузере
start README.md
start API.md
start SETUP.md

# В VS Code
code README.md
```

### Создать новую документацию

```powershell
# Создать новый .md файл
New-Item -ItemType File -Path "NEW_DOC.md"
code NEW_DOC.md
```

---

## 🎯 Быстрые сценарии

### Первый запуск

```powershell
# 1. Установить зависимости
npm run install:all

# 2. Настроить .env файлы
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
# Отредактировать файлы

# 3. Создать базу данных
psql -U postgres -c "CREATE DATABASE qr_menu_db;"

# 4. Применить миграции
Set-Location backend
npx prisma migrate dev

# 5. Заполнить данными
npm run seed

# 6. Запустить
Set-Location ..
npm run dev
```

### Ежедневная работа

```powershell
# 1. Перейти в проект
Set-Location "d:\QR MENU"

# 2. Обновить код (если работаете в команде)
git pull

# 3. Обновить зависимости (если были изменения)
npm install

# 4. Запустить
npm run dev
```

### Добавление новой функции

```powershell
# 1. Создать новую ветку
git checkout -b feature-name

# 2. Внести изменения в код

# 3. Если изменили схему БД
Set-Location backend
npx prisma migrate dev --name feature_name

# 4. Тестировать
npm run dev

# 5. Коммит
git add .
git commit -m "Add feature-name"

# 6. Отправить на GitHub
git push origin feature-name
```

---

## 🔗 Полезные ссылки

### Локальные URL

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api
- Health: http://localhost:5000/health
- Тестовое меню: http://localhost:5173/menu/testrestaurant
- Prisma Studio: http://localhost:5555

### Документация проекта

- [README.md](./README.md) - Обзор
- [QUICKSTART.md](./QUICKSTART.md) - Быстрый старт
- [SETUP.md](./SETUP.md) - Установка
- [API.md](./API.md) - API документация
- [API_EXAMPLES.md](./API_EXAMPLES.md) - Примеры API
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Деплой
- [TODO.md](./TODO.md) - Планы
- [CHECKLIST.md](./CHECKLIST.md) - Чеклист
- [AI_PROMPTS.md](./AI_PROMPTS.md) - AI промпты

### Внешняя документация

- [Node.js](https://nodejs.org/docs)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org/docs)

---

**Сохраните этот файл в закладки для быстрого доступа! 📌**
