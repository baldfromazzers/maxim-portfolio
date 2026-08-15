# Максим / чтобы оно работало

**Live:** [https://baldfromazzers.github.io/maxim-portfolio/](https://baldfromazzers.github.io/maxim-portfolio/)

Персональный сайт-портфолио: чёрно-белый editorial lookbook с техническими метаданными. Не шаблонный developer portfolio.

Живые проекты в индексе:

- [Турнавстречу](https://турнавстречу.рф/)
- [All Games Code](https://allgamescode.ru/)
- [ITT Market](https://itt-market.ru/)
- [Блефаровит](https://blefarovit.ru/)
- [Офтолик](https://oftolik.ru/)
- [Никатэн](https://никатэн.рф/)

## Стек

- React 19
- Vite
- Framer Motion
- Lucide
- CSS Modules

Сайт полностью статический. После сборки API не вызывается.

## Локальный запуск

```bash
npm install
npm run dev
```

Откроется `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```

Готовый фронт лежит в `dist/` и подходит для GitHub Pages или любого static hosting.

## Данные

Тексты, контакты и проекты вынесены из компонентов:

- `src/data/site.js`: имя, SEO, Telegram / Email / GitHub
- `src/data/copy.js`: весь копирайт
- `src/data/projects.js`: выбранные проекты
- `src/data/stack.js`: технологии
- `src/data/work.js`: направления работы

Новый проект: добавь объект в массив `projects` (id, number, title, category, url, year, summary, preview).

Контакты: заполни поля в `site.contacts`.

## Deploy на GitHub Pages

1. Создай репозиторий и запушь `main`.
2. В Settings → Pages выбери **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` соберёт сайт и опубликует `dist/`.

Vite настроен с `base: './'`, поэтому сборка также открывается с любого подпути и с файлового хостинга.

## Структура

```
src/
  assets/       портрет и превью проектов
  components/   курсор, grain, nav, кнопки
  data/         тексты и проекты
  sections/     блоки страницы
  styles/       токены и глобальные стили
```
