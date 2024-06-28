-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Jun 28, 2024 at 01:27 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mahasiswa_tugas`
--

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nama`, `created_at`, `updated_at`) VALUES
(1, 'Balmond', '2024-06-28 15:55:17', '2024-06-28 15:55:17'),
(3, 'Zilong', '2024-06-28 16:07:25', '2024-06-28 16:13:22'),
(4, 'Alucard', '2024-06-28 16:11:36', '2024-06-28 16:11:36'),
(5, 'Gusion', '2024-06-28 20:14:20', '2024-06-28 20:14:47');

-- --------------------------------------------------------

--
-- Table structure for table `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `id` int NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`id`, `nama`, `created_at`, `updated_at`) VALUES
(1, 'Pemrograman Komputer', '2024-06-28 17:27:54', '2024-06-28 17:31:47'),
(2, '', '2024-06-28 17:32:08', '2024-06-28 20:17:35'),
(3, 'Basis Data', '2024-06-28 17:32:20', '2024-06-28 17:32:20'),
(4, 'Jaringan Komputer', '2024-06-28 17:32:27', '2024-06-28 17:32:27'),
(5, 'Sistem Operasi', '2024-06-28 17:32:33', '2024-06-28 17:32:33'),
(6, 'Rekayasa Perangkat Lunak', '2024-06-28 17:32:43', '2024-06-28 17:32:43'),
(8, 'Cloud Computing', '2024-06-28 17:33:15', '2024-06-28 17:33:15'),
(9, 'Keamanan Informasi', '2024-06-28 17:33:27', '2024-06-28 17:33:27'),
(10, 'Manajemen Proyek Teknologi Informasi', '2024-06-28 17:33:41', '2024-06-28 17:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `nilai`
--

CREATE TABLE `nilai` (
  `id` int NOT NULL,
  `indeks` varchar(255) DEFAULT NULL,
  `skor` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `mata_kuliah_id` int DEFAULT NULL,
  `mahasiswa_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nilai`
--

INSERT INTO `nilai` (`id`, `indeks`, `skor`, `created_at`, `updated_at`, `mata_kuliah_id`, `mahasiswa_id`) VALUES
(1, '', 60, '2024-06-28 17:47:51', '2024-06-28 17:47:51', 1, 1),
(2, 'D', 50, '2024-06-28 17:49:27', '2024-06-28 20:19:20', 2, 1),
(4, '', 40, '2024-06-28 18:13:41', '2024-06-28 18:13:41', 2, 1),
(5, 'E', 40, '2024-06-28 18:17:27', '2024-06-28 18:17:27', 2, 1),
(6, 'A', 90, '2024-06-28 18:21:14', '2024-06-28 18:21:14', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mata_kuliah_id` (`mata_kuliah_id`),
  ADD KEY `mahasiswa_id` (`mahasiswa_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `nilai`
--
ALTER TABLE `nilai`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `nilai_ibfk_1` FOREIGN KEY (`mata_kuliah_id`) REFERENCES `mata_kuliah` (`id`),
  ADD CONSTRAINT `nilai_ibfk_2` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
