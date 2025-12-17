-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Erstellungszeit: 23. Mai 2025 um 08:12
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
(10, 36, 30, '2025-06-18', '2025-06-20', 600),
(11, 36, 30, '2025-06-06', '2025-06-08', 600),
(12, 36, 31, '2025-05-29', '2025-05-31', 30),
(13, 36, 31, '2025-06-06', '2025-06-14', 120),
(14, 36, 31, '2025-06-20', '2025-06-22', 30),
(15, 36, 30, '2025-06-13', '2025-06-14', 300);

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
(120, 26, 'uploads/DemoContacts.gif'),
(121, 27, 'uploads/Theo.jpg'),
(122, 28, 'uploads/schiback.jpg'),
(123, 29, 'uploads/dogcrazy.jpg'),
(124, 30, 'uploads/DemoContacts.gif'),
(125, 31, 'uploads/Theo.jpg'),
(127, 24, 'uploads/schnee_schi.jpg'),
(128, 24, 'uploads/schiback.jpg'),
(129, 32, 'uploads/schnee_schi.jpg');

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
  `town` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `listings`
--

INSERT INTO `listings` (`id`, `user_id`, `title`, `description`, `price`, `state`, `brand`, `length`, `typ`, `publishDate`, `street`, `house_number`, `postal_code`, `town`) VALUES
(24, 36, 'Schi', 'Super Schi, nur wenig gefahren\r\nBei Interesse gerne telefonisch unter\r\n0000 00000000 melden', 40, 'neu', 'Fischer', 140, 'Ski', '2025-05-19', '1', 1, 4845, 'Rutzenmoos'),
(26, 36, 'contacts', '10', 10, 'sehrgut', '10', 10, 'Snowboard', '2025-04-30', 'Musterstraße', 1, 2, 'Rutzenmoos'),
(27, 36, '1', '1', 1, 'neu', '1', 1, 'Snowboard', '2025-04-30', '1', 1, 2, 'Rutzenmoos'),
(28, 36, 'Schi', '1', 10, 'gebraucht', 'Fischer', 1, 'Ski', '2025-04-30', 'Musterstraße', 1, 2, 'Rutzenmoos'),
(29, 37, '1', '1nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnn nnnnnnnnnnnnn jjjjjjjjjjjj odslkfjkldsj fjsldkjflkdj flkjsdlkfj sdlkjfkls sjdfklsjdklfj skdjfklsjfkls jdlkjdsklfjskldjflk sdsdklfjskldjf dsjfkljsdklfjdsl  sdjflsdlf', 1, 'gut', '1', 1, 'Ski', '2025-05-09', 'Musterstraße', 5, 4000, 'Wien'),
(30, 38, 'Barkeeper Set', 'Geiler Shaker und so weiter. Bitte keine Anfragen auf letzte Preis.', 300, 'sehrgut', 'Bartender Tim', 30, 'Ski', '2025-05-10', 'Musterstraße', 7, 7, 'Musterstadt'),
(31, 38, 'SNOWBOARD', 'sehr sehr gute snowboard', 15, 'sehrgut', 'undefined', 130, 'Snowboard', '2025-05-13', 'Limesstraße', 8, 4040, 'Linz'),
(32, 36, '1', '1', 1, 'neu', '1', 1, 'Snowboard', '2025-05-20', 'Musterstraße', 1, 5010, 'Salzburg');

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
(36, '123', '123', '$2y$10$bFQxyHrcmcD6apzQwyhDXeYqXktFGufK1OxJh15KxYPniIkVqd7zu', 0, 'Keine Biografie vorhanden', 'Musterstraße', 1, 2, 'Rutzenmoos'),
(37, '1234', '1234', '$2y$10$LGX7xW/NBgizT4kV6..6wOQNy1GgbmlT8hkymDerbRUZftdRKDgTm', 0, 'Keine Biografie vorhanden', 'Musterstraße', 5, 4000, 'Linz'),
(38, 'Timmi der GOATs', 'timmi.peneder@gmail.com', '$2y$10$wnsLGGrEbkWQnQptXGC7.OKfXt8HqnDy8fBgymBfAl15ifkXihQcW', 0, 'Keine Biografie vorhanden', 'Limesstraße', 8, 4040, 'Linz');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT für Tabelle `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
