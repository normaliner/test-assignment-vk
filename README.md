# Movie List Application

Это приложение позволяет просматривать список фильмов, фильтровать их по жанрам, рейтингу и году выпуска, а также добавлять фильмы в избранное и просматривать их детальную информацию.

## Функционал

1. **Отображение списка фильмов**:
   - Приложение отображает список фильмов, получаемых с помощью API.
   - Фильмы отображаются постранично по 50 фильмов на страницу.
   - Для каждого фильма отображаются: постер, название, год выпуска, рейтинг.

2. **Фильтрация списка фильмов**:
   - Фильтрация по жанру (ввод через текстовое поле).
   - Фильтрация по рейтингу (диапазон).
   - Фильтрация по году выпуска (диапазон).

3. **Просмотр детальной информации о фильме**:
   - При клике на фильм из списка, приложение переходит на страницу с детальной информацией о фильме.
   - На странице фильма отображаются: постер, название, описание, рейтинг, дата выхода, список жанров.

4. **Избранное**:
   - Возможность добавления фильмов в список "Избранное".
   - Отдельная страница со списком избранных фильмов.
   - Сохранение списка при перезагрузке страницы.

## Структура проекта

```plaintext
project-root/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Filters/
│   │   │   └── Filters.tsx
│   │   ├── MovieList/
│   │   │   └── MovieList.tsx
│   │   ├── MovieDetails/
│   │   │   └── MovieDetails.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── FavoritesPage.tsx
│   │   └── ...
│   ├── store/
│   │   ├── movieSlice.ts
│   │   ├── store.ts
│   │   └── ...
│   ├── interfaces/
│   │   └── movie.ts
│   ├── utils/
│   │   └── routes.ts
│   │   ├── сonst.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
│
├── .env.local
├── .env.default
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Установка и запуск

### Предварительные требования

- Node.js версии 14 или выше
- npm или yarn

### Установка зависимостей

Склонируйте репозиторий и установите зависимости:

```bash
git clone https://github.com/normaliner/test-assignment-vk.git
cd test-assignment-vk
npm install
```

### Настройка переменных окружения

Создайте файл `.env` на основе `.env.default` и добавьте ваш API ключ:

```bash
cp .env.default .env
```

Откройте файл `.env` и добавьте ваш API ключ:

```makefile
VITE_API_KEY=your_api_key_here
```

### Запуск приложения

Для запуска приложения в режиме разработки используйте команду:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

### Сборка приложения

Для сборки приложения используйте команду:

```bash
npm run build
```

Собранное приложение будет находиться в директории `dist`.

### Запуск собранного приложения

Для запуска собранного приложения используйте команду:

```bash
npm run preview
```

Откройте [http://localhost:5000](http://localhost:5000) для просмотра в браузере.

## Технологии

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite