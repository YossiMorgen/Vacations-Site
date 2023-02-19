-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2023 at 01:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`vacationId`, `userId`) VALUES
(21, 17),
(24, 17),
(26, 17),
(27, 17),
(25, 29),
(27, 29),
(37, 17),
(30, 17);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `role`) VALUES
(16, 'hvj', 'dhyn', 'yoss', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'admin'),
(17, 'ראובן יוסף', 'מורגנשטרן', 'reuven', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(18, 'ראובן יוסף', 'מורגנשטרן', 'hi', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(24, 'ראובן יוסף', 'מורגנשטרן', 'reuvenMo', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(25, 'Reuven', 'Morgenstern ', 'toast', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(26, 'ראובן יוסף', 'מורגנשטרן', 'rytfgjhk', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(27, 'Reuven', 'Morgenstern ', 'guj', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(28, 'ראובן יוסף', 'מורגנשטרן', 'vcbvb', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user'),
(29, 'ראובן יוסף', 'מורגנשטרן', 'gfhgvjhbjn', 'eb14cf1c2c21f3c3bcfa03541e62fe71d5f5b8e468f3d4619f5bec58f05431196e47af503a9e55eda7ab8ad225052700ae8b2c617e150329fab5238e206a507e', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `destination`, `description`, `imageName`, `start`, `end`, `price`) VALUES
(25, 'kuj', 'j eh vk', 'e56b4729-4296-47f8-a0bf-a8801e031490.jpg', '2023-02-08', '2023-02-11', '63.00'),
(26, 'sd', 'hi fuckers', 'c9428c5c-e4f2-4100-b451-950cd9c97401.jpg', '2023-02-15', '2023-03-07', '63.00'),
(27, 'kg', 'we', '88d8e2e3-807e-4634-ae06-ff4ac1f310b2.jpg', '2023-02-08', '2023-02-22', '63.00'),
(28, 'update', 'kjewh rfkhj fke eh ', 'c3231ff0-ca5d-49ca-9548-2968fad20c28.jpg', '2023-02-08', '2023-02-22', '63.00'),
(29, 'kg', 'kjewh rfkhj fke eh ', '1d48c122-0337-4f4f-a15e-1f9655e92e6e.jpg', '2023-02-08', '2023-02-22', '63.00'),
(30, 'kg', 'kjewh rfkhj fke eh ', '050e87b5-c348-4ecd-8766-a191d29164e2.jpg', '2023-02-08', '2023-02-22', '63.00'),
(31, 'kg', 'kjewh rfkhj fke eh ', 'c0c381d7-73d7-45d1-ab46-bd4508e4569e.jpg', '2023-02-08', '2023-02-22', '63.00'),
(32, 'kg', 'kjewh rfkhj fke eh ', 'eb872350-f382-4485-9e13-eb222f077323.jpg', '2023-02-15', '2023-03-03', '63.00'),
(33, 'kg', 'kjewh rfkhj fke eh ', '2d105562-0e1c-480c-9703-c06dc0355d8f.jpg', '2023-02-15', '2023-03-03', '63.00'),
(34, 'kg', 'kjewh rfkhj fke eh ', 'f7f116dd-f33e-4606-b488-c14286ba93a7.jpg', '2023-02-15', '2023-03-03', '63.00'),
(35, 'kg', 'kjewh rfkhj fke eh ', '6ab53f51-625e-4a64-a033-837f1b48e644.jpg', '2023-02-20', '2023-02-20', '63.00'),
(36, 'kg', 'kjewh rfkhj fke eh ', '1087ce87-df11-4a3b-b7b3-f43c4ec5115b.jpg', '2023-02-14', '2023-02-23', '63.00'),
(37, 'update', 'kjewh rfkhj fke eh ', 'dd8cb6aa-ecbd-4e25-91c4-ab138efc1e98.jpg', '2023-02-06', '2023-02-23', '63.00'),
(38, 'update', 'kjewh rfkhj fke eh ', '3e145fb0-4763-4f42-9cfd-4b2a8b51c639.jpg', '2023-02-13', '2023-02-20', '63.00'),
(39, 'update', 'kjewh rfkhj fke eh ', 'acd886e1-ec1c-4bd6-af75-374249dcd4f6.jpg', '2023-02-13', '2023-02-27', '63.00'),
(40, 'jnh', 'kjewh rfkhj fke eh ', '9f0c1b34-ef58-4325-9d93-e5b9982cd730.jpg', '2023-04-14', '2023-11-07', '63.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
