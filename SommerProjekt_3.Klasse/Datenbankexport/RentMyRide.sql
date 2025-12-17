-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Erstellungszeit: 13. Jun 2025 um 08:47
-- Server-Version: 8.4.0
-- PHP-Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `RentMyRide`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `rentUser_id` int NOT NULL,
  `listing_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `bookings`
--

INSERT INTO `bookings` (`id`, `rentUser_id`, `listing_id`, `start_date`, `end_date`, `price`) VALUES
(19, 40, 34, '2025-06-19', '2025-06-27', 360),
(20, 41, 34, '2025-06-28', '2025-06-30', 90),
(21, 41, 35, '2025-06-12', '2025-06-15', 210),
(23, 40, 37, '2025-06-27', '2025-06-29', 160);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `listing_id` int NOT NULL,
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `images`
--

INSERT INTO `images` (`id`, `listing_id`, `path`) VALUES
(132, 34, 'uploads/snowboard.jpg'),
(133, 35, 'uploads/schiback.jpg'),
(134, 36, 'uploads/Snowboard1.jpg'),
(135, 37, 'uploads/schi3.jpg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `listings`
--

CREATE TABLE `listings` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(60) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `price` int NOT NULL,
  `state` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `brand` varchar(100) NOT NULL,
  `length` int NOT NULL,
  `typ` varchar(50) NOT NULL,
  `publishDate` date NOT NULL,
  `street` varchar(200) NOT NULL,
  `house_number` int NOT NULL,
  `postal_code` int NOT NULL,
  `town` varchar(200) NOT NULL,
  `counter` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `listings`
--

INSERT INTO `listings` (`id`, `user_id`, `title`, `description`, `price`, `state`, `brand`, `length`, `typ`, `publishDate`, `street`, `house_number`, `postal_code`, `town`, `counter`) VALUES
(34, 39, 'Snowboard grau', 'Cooles Snowboard', 45, 'sehrgut', 'Burton', 150, 'Snowboard', '2025-06-12', 'Point-Binderweg', 2, 4072, 'Alkoven', 3),
(35, 40, 'Beste Schi', 'Unsere Ski sind bestens geeignet für Anfänger, Fortgeschrittene und Profis. Je nach Fahrkönnen und Einsatzbereich bieten wir verschiedene Modelle an – vom klassischen Pistenski über All-Mountain-Ski bis hin zu Freeride- und Carving-Ski.\r\n\r\nAlle Ski werden regelmäßig gewartet, gewachst und professionell eingestellt. Die Bindungen sind nach aktuellen Sicherheitsstandards geprüft und werden individuell auf die Körpergröße, das Gewicht und das Fahrkönnen der Nutzer angepasst.', 70, 'gebraucht', 'Atomic', 125, 'Ski', '2025-06-12', 'Dokterstraße', 5, 4845, 'Rutzenmoos', 2),
(36, 41, 'Snowboard cooles Design', 'Snowboard inkl. Bindungen. Kaum benutzt, ideal für Einsteiger und Fortgeschrittene. Keine Kratzer, sofort fahrbereit.', 55, 'neu', 'Salomon', 140, 'Snowboard', '2025-06-12', 'Musterstraße', 7, 4614, 'Marchtrenk', 2),
(37, 42, 'Wahnsinnsschi', 'All-Mountain Ski, gepflegt und sofort einsatzbereit. Ideal für Anfänger und Fortgeschrittene.', 80, 'neu', 'Head', 100, 'Ski', '2025-06-12', 'Welserstraße', 5, 4600, 'Wels', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rating`
--

CREATE TABLE `rating` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating_user_id` int NOT NULL,
  `rating` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `rating`
--

INSERT INTO `rating` (`id`, `user_id`, `rating_user_id`, `rating`) VALUES
(5, 39, 40, 4),
(6, 39, 41, 2),
(7, 40, 41, 5),
(8, 42, 40, 2),
(9, 42, 39, 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwort` varchar(100) NOT NULL,
  `rating` int NOT NULL,
  `bio` varchar(1500) NOT NULL,
  `street` varchar(80) NOT NULL,
  `house_number` int NOT NULL,
  `postal_code` int NOT NULL,
  `town` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `passwort`, `rating`, `bio`, `street`, `house_number`, `postal_code`, `town`) VALUES
(39, 'Florian Huber', 'florian.huber@gmail.com', '$2y$10$YBH0S3J3PnrEvYNKjbG1h.rsNdqQlB//fD4jrLPM0DvsHOJXntfJC', 3, 'Keine Biografie vorhanden', 'Point-Binderweg', 2, 4072, 'Alkoven'),
(40, 'Simon', 'simon.dokter@icloud.com', '$2y$10$cnfLZga9mk46TcJ9jGpTFOKAaxddgL5EUdKN4A/9cT2igisCvl/mm', 5, 'Keine Biografie vorhanden \r\n', 'Dokterstraße', 5, 4845, 'Rutzenmoos'),
(41, 'Fabio', 'fabio.neundlinger@gmail.co', '$2y$10$HirRPb/7ME4fnQLMpQu3h.3ZfV6nS1dAB1GFoDq1nGcpIaHk.F6Bq', 0, '', '', 0, 0, ''),
(42, 'Bene', 'bene.lehner@lol.com', '$2y$10$24c/RE9kAd2ZLSzLnY1c0.pGI4LnkJCDq8S.OeEK1Bh8J2AuQoTnC', 3, 'Cool', 'Welserstraße', 5, 4600, 'Wels');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`rentUser_id`),
  ADD KEY `listing_id` (`listing_id`);

--
-- Indizes für die Tabelle `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_id` (`listing_id`);

--
-- Indizes für die Tabelle `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indizes für die Tabelle `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `rating_user_id` (`rating_user_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT für Tabelle `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT für Tabelle `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT für Tabelle `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`rentUser_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints der Tabelle `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints der Tabelle `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints der Tabelle `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`rating_user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
