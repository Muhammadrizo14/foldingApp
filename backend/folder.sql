-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 08 2023 г., 10:44
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `folder`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Folder`
--

CREATE TABLE `Folder` (
  `id` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Folder`
--

INSERT INTO `Folder` (`id`, `title`) VALUES
(1, 'cats'),
(233, 'Logos'),
(234, 'qwer'),
(237, 'qewr');

-- --------------------------------------------------------

--
-- Структура таблицы `UploadedFile`
--

CREATE TABLE `UploadedFile` (
  `id` int NOT NULL,
  `fieldname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `originalname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `encoding` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mimetype` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameMini` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `folderId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `UploadedFile`
--

INSERT INTO `UploadedFile` (`id`, `fieldname`, `originalname`, `encoding`, `mimetype`, `destination`, `filename`, `nameMini`, `path`, `size`, `createdAt`, `updatedAt`, `deletedAt`, `folderId`) VALUES
(1, 'file', 'cat2.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T10-39-12.712Z-b5a852db-1ba0-4adf-9170-6b3b2376619a.jpg', 'mini_2023-04-07T10-39-12.712Z-b5a852db-1ba0-4adf-9170-6b3b2376619a.jpg', 'public\\2023\\4\\2023-04-07T10-39-12.712Z-b5a852db-1ba0-4adf-9170-6b3b2376619a.jpg', 2833605, '2023-04-07 10:39:12.749', '2023-04-07 10:39:12.749', NULL, 1),
(2, 'file', 'cat.png', '7bit', 'image/png', 'public/2023/4', '2023-04-07T10-41-18.876Z-a5fbf9c2-883d-4def-8f20-fcd8df0a72b0.png', 'mini_2023-04-07T10-41-18.876Z-a5fbf9c2-883d-4def-8f20-fcd8df0a72b0.png', 'public\\2023\\4\\2023-04-07T10-41-18.876Z-a5fbf9c2-883d-4def-8f20-fcd8df0a72b0.png', 1246129, '2023-04-07 10:41:18.897', '2023-04-07 10:41:18.897', NULL, 1),
(3, 'file', '1.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T11-28-33.682Z-a4773811-351b-4894-8b89-0ac36c028082.jpg', 'mini_2023-04-07T11-28-33.682Z-a4773811-351b-4894-8b89-0ac36c028082.jpg', 'public\\2023\\4\\2023-04-07T11-28-33.682Z-a4773811-351b-4894-8b89-0ac36c028082.jpg', 307670, '2023-04-07 11:28:33.692', '2023-04-07 11:28:57.215', NULL, NULL),
(4, 'file', '2.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T11-29-41.468Z-1c93f695-c827-4f97-a842-40a2640e4763.jpg', 'mini_2023-04-07T11-29-41.468Z-1c93f695-c827-4f97-a842-40a2640e4763.jpg', 'public\\2023\\4\\2023-04-07T11-29-41.468Z-1c93f695-c827-4f97-a842-40a2640e4763.jpg', 1375618, '2023-04-07 11:29:41.480', '2023-04-07 11:29:50.068', NULL, NULL),
(5, 'file', 'deep-space-saturn-3840x3840-10929.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T12-43-53.367Z-70e02d20-b2c9-4d08-8a17-0fca2179eb05.jpg', 'mini_2023-04-07T12-43-53.367Z-70e02d20-b2c9-4d08-8a17-0fca2179eb05.jpg', 'public\\2023\\4\\2023-04-07T12-43-53.367Z-70e02d20-b2c9-4d08-8a17-0fca2179eb05.jpg', 7299097, '2023-04-07 12:43:53.418', '2023-04-07 12:44:09.096', NULL, 234),
(6, 'file', '4k-jdm.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T15-01-56.196Z-c46ad7ad-a4b4-4f32-82bd-18d7d4332460.jpg', 'mini_2023-04-07T15-01-56.196Z-c46ad7ad-a4b4-4f32-82bd-18d7d4332460.jpg', 'public\\2023\\4\\2023-04-07T15-01-56.196Z-c46ad7ad-a4b4-4f32-82bd-18d7d4332460.jpg', 339789, '2023-04-07 15:01:56.206', '2023-04-07 15:01:56.206', NULL, NULL),
(7, 'file', 'ÐÐµÐ· Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ñ.jfif', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T15-05-58.306Z-5acd1551-8876-45c7-afce-d512982b5114.jfif', 'mini_2023-04-07T15-05-58.306Z-5acd1551-8876-45c7-afce-d512982b5114.jfif', 'public\\2023\\4\\2023-04-07T15-05-58.306Z-5acd1551-8876-45c7-afce-d512982b5114.jfif', 397048, '2023-04-07 15:05:58.311', '2023-04-07 15:05:58.311', NULL, NULL),
(8, 'file', 'manga-one-piece-wallpaper-b9f0d8ddc18a9d8b1677282f30d1e68d.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T15-09-40.033Z-2139e689-d978-45cb-8846-b833d6b70e69.jpg', 'mini_2023-04-07T15-09-40.033Z-2139e689-d978-45cb-8846-b833d6b70e69.jpg', 'public\\2023\\4\\2023-04-07T15-09-40.033Z-2139e689-d978-45cb-8846-b833d6b70e69.jpg', 184879, '2023-04-07 15:09:40.036', '2023-04-07 15:15:18.024', NULL, 233),
(11, 'file', 'nebula-stars-space-green-wallpaper-5bf62cbd0391bfe96524fbf94d0cec50.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T15-15-56.324Z-c5b7522b-b182-42e4-941f-d790194a2af2.jpg', 'mini_2023-04-07T15-15-56.324Z-c5b7522b-b182-42e4-941f-d790194a2af2.jpg', 'public\\2023\\4\\2023-04-07T15-15-56.324Z-c5b7522b-b182-42e4-941f-d790194a2af2.jpg', 220109, '2023-04-07 15:15:56.334', '2023-04-07 15:15:56.352', NULL, 233),
(12, 'file', 'python.png', '7bit', 'image/png', 'public/2023/4', '2023-04-07T15-17-28.857Z-fd8078ce-9663-4a5d-991a-b715e0e2e351.png', 'mini_2023-04-07T15-17-28.857Z-fd8078ce-9663-4a5d-991a-b715e0e2e351.png', 'public\\2023\\4\\2023-04-07T15-17-28.857Z-fd8078ce-9663-4a5d-991a-b715e0e2e351.png', 93274, '2023-04-07 15:17:28.861', '2023-04-07 15:17:28.871', NULL, NULL),
(13, 'file', 'supramk4.jpg', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T15-23-57.050Z-7465bee8-bbee-4a56-b0ae-72e9e60d4e65.jpg', 'mini_2023-04-07T15-23-57.050Z-7465bee8-bbee-4a56-b0ae-72e9e60d4e65.jpg', 'public\\2023\\4\\2023-04-07T15-23-57.050Z-7465bee8-bbee-4a56-b0ae-72e9e60d4e65.jpg', 153964, '2023-04-07 15:23:57.059', '2023-04-07 15:23:57.068', NULL, NULL),
(14, 'file', 'ÐÐµÐ· Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ñ.jfif', '7bit', 'image/jpeg', 'public/2023/4', '2023-04-07T17-47-00.339Z-712d80ef-7740-4481-bb98-5708dd857545.jfif', 'mini_2023-04-07T17-47-00.339Z-712d80ef-7740-4481-bb98-5708dd857545.jfif', 'public\\2023\\4\\2023-04-07T17-47-00.339Z-712d80ef-7740-4481-bb98-5708dd857545.jfif', 397048, '2023-04-07 17:47:00.352', '2023-04-07 17:47:00.362', NULL, NULL),
(15, 'file', 'Ð¡Ð½Ð¸Ð¼Ð¾Ðº ÑÐºÑÐ°Ð½Ð° (100).png', '7bit', 'image/png', 'public/2023/4', '2023-04-07T18-17-58.335Z-fdac524b-8f03-44ed-bd67-776fa4cb31e5.png', 'mini_2023-04-07T18-17-58.335Z-fdac524b-8f03-44ed-bd67-776fa4cb31e5.png', 'public\\2023\\4\\2023-04-07T18-17-58.335Z-fdac524b-8f03-44ed-bd67-776fa4cb31e5.png', 4110907, '2023-04-07 18:17:58.358', '2023-04-07 18:17:58.372', NULL, 237),
(16, 'file', 'Ð¡Ð½Ð¸Ð¼Ð¾Ðº ÑÐºÑÐ°Ð½Ð° (101).png', '7bit', 'image/png', 'public/2023/4', '2023-04-07T19-23-29.679Z-62186fdc-7c21-4f44-8a52-7b12f39de3ab.png', 'mini_2023-04-07T19-23-29.679Z-62186fdc-7c21-4f44-8a52-7b12f39de3ab.png', 'public\\2023\\4\\2023-04-07T19-23-29.679Z-62186fdc-7c21-4f44-8a52-7b12f39de3ab.png', 3860521, '2023-04-07 19:23:29.699', '2023-04-07 19:23:29.709', NULL, 234);

-- --------------------------------------------------------

--
-- Структура таблицы `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('716ddbf7-fea2-43e7-8e88-4bd7c57f18fe', '7ca9a2e88903bca1c94200c7d81cf8067e524095e3545a38589d7c711d6f114a', '2023-04-07 10:16:16.985', '20230407101616_init', NULL, NULL, '2023-04-07 10:16:16.895', 1),
('8ee5d2e9-db36-4779-bfba-3f3702d1efc4', '26d6acfd3487e0546c0b1c233e5ec07c87828658b13a0efb149b9b87afdec953', '2023-04-07 10:39:00.103', '20230407103859_inits', NULL, NULL, '2023-04-07 10:38:59.984', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Folder`
--
ALTER TABLE `Folder`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `UploadedFile`
--
ALTER TABLE `UploadedFile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UploadedFile_filename_key` (`filename`),
  ADD UNIQUE KEY `UploadedFile_nameMini_key` (`nameMini`),
  ADD KEY `UploadedFile_folderId_fkey` (`folderId`);

--
-- Индексы таблицы `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Folder`
--
ALTER TABLE `Folder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT для таблицы `UploadedFile`
--
ALTER TABLE `UploadedFile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `UploadedFile`
--
ALTER TABLE `UploadedFile`
  ADD CONSTRAINT `UploadedFile_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
