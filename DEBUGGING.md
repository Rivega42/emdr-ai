# Отладка GitHub Actions для EMDR-AI

## Проблемы и решения

### ✅ Исправлено в последних коммитах:

1. **Удалена устаревшая команда `next export`**
   - Next.js 14 больше не использует отдельную команду export
   - Статический экспорт происходит через `output: 'export'` в конфигурации

2. **Отключен middleware для совместимости со статическим экспортом**
   - Middleware не работает со статическим экспортом
   - Проверка аутентификации перенесена на клиентскую сторону

3. **Добавлена диагностика в GitHub Actions**
   - Проверка наличия папки `out` после сборки
   - Логирование структуры директорий

## Проверка работоспособности

### Локальная проверка:
```bash
# Клонировать репозиторий
git clone https://github.com/Rivega42/emdr-ai.git
cd emdr-ai

# Установить зависимости
npm install

# Собрать проект
npm run build

# Проверить наличие папки out
ls -la out/
```

### Проверка GitHub Actions:
1. Перейдите на https://github.com/Rivega42/emdr-ai/actions
2. Проверьте последний запуск workflow "Deploy to Cloudflare Pages"
3. Если есть ошибки, проверьте секреты в Settings → Secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

## Структура проекта

```
emdr-ai/
├── app/                    # Next.js App Router
│   ├── page.js            # Главная страница
│   ├── login/             # Страница входа
│   ├── register/          # Страница регистрации
│   └── therapy/           # Страница терапии
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── next.config.js         # Конфигурация Next.js
├── package.json           # Зависимости
└── middleware.js.disabled # Отключенный middleware
```

## Важные изменения

1. **next.config.js**:
   ```javascript
   output: 'export' // Включает статический экспорт
   ```

2. **middleware.js** → **middleware.js.disabled**:
   - Middleware несовместим со статическим экспортом
   - Логика проверки аутентификации перенесена в компоненты

3. **GitHub Actions workflow**:
   - Добавлена диагностика для проверки структуры файлов
   - Используется папка `out` для деплоя

## Если все еще не работает

1. **Проверьте логи Actions**:
   - Ищите ошибки в шаге "Build Next.js app"
   - Проверьте вывод шага "Check output directory"

2. **Проверьте Cloudflare Pages**:
   - Убедитесь, что проект `emdr-ai` существует
   - Проверьте настройки проекта

3. **Альтернативный деплой**:
   Если Actions не работает, можно использовать прямой деплой через Cloudflare:
   ```bash
   npm run build
   npx wrangler pages deploy out --project-name=emdr-ai
   ```

## Последние коммиты

- `fix: Remove middleware functionality for static export`
- `fix: Disable middleware for static export compatibility`
- `fix: Remove middleware-related config for static export compatibility`
- `fix: Add build check script to package.json`
- `fix: Update Next.js config to ensure proper static export directory`
- `fix: Update GitHub Actions workflow with better error handling and diagnostics`

---

Дата обновления: 07.09.2025
