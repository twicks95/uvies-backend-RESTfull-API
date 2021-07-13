-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Bulan Mei 2021 pada 07.07
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uvies_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` varchar(150) NOT NULL,
  `booking_status` enum('Refected','Approved') NOT NULL,
  `booking_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `booking_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `movie_id`, `premiere_id`, `location_id`, `schedule_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_created_at`, `booking_updated_at`) VALUES
(53, 1, 65, 18, 8, 12, 3, 120000, 'PAYPAL', 'Approved', '2021-04-10 09:55:10', NULL),
(54, 2, 65, 18, 8, 12, 2, 80000, 'PAYPAL', 'Approved', '2021-04-10 09:56:39', NULL),
(55, 3, 7, 17, 8, 10, 2, 90000, 'PAYPAL', 'Approved', '2021-05-02 10:01:54', NULL),
(57, 4, 7, 17, 8, 10, 4, 180000, 'PAYPAL', 'Approved', '2021-05-02 10:15:04', NULL),
(58, 2, 65, 19, 4, 12, 2, 90000, 'PAYPAL', 'Approved', '2021-02-10 09:56:39', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_seat_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(50, 48, 'A1'),
(51, 48, 'B1'),
(52, 48, 'C1'),
(53, 52, 'A1'),
(54, 52, 'B1'),
(55, 52, 'C1'),
(56, 53, 'A1'),
(57, 53, 'B1'),
(58, 53, 'C1'),
(59, 54, 'B2'),
(60, 54, 'B3'),
(61, 55, 'C4'),
(62, 55, 'C5'),
(63, 56, 'A1'),
(64, 56, 'A2'),
(65, 56, 'A3'),
(66, 56, 'A4'),
(67, 57, 'A1'),
(68, 57, 'A2'),
(69, 57, 'A3'),
(70, 57, 'A4');

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(150) NOT NULL,
  `movie_category` varchar(250) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_poster` varchar(100) NOT NULL,
  `movie_duration` time NOT NULL,
  `movie_director` varchar(150) NOT NULL,
  `movie_casts` varchar(250) NOT NULL,
  `movie_synopsis` text NOT NULL,
  `movie_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `movie_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_poster`, `movie_duration`, `movie_director`, `movie_casts`, `movie_synopsis`, `movie_created_at`, `movie_updated_at`) VALUES
(7, 'IP Man 4 : The Finale New', 'Action, Biography, Drama, History', '2014-06-11', '2021-05-10T00-02-15.609ZOptimized-ipman4.jpg', '02:13:00', 'Wilson Yip', ' Donnie Yen, Scott Adkins, Danny Kwok-Kwan Chan', 'Test Update laig coba lagi ahh', '2021-04-11 21:09:39', '2021-05-10 07:02:15'),
(8, 'John Wick', 'Action, Crime, Thriller\n', '2014-10-21', '2021-05-10T00-03-55.326ZOptimized-john-wick-1 (1).jpg', '01:41:00', ' Chad Stahelski, David Leitch', 'Keanu Reeves, Michael Nyqvist, Alfie Allen', 'John Wick is a 2014 American neo-noir action-thriller film directed by Chad Stahelski, in his directorial debut, and written by Derek Kolstad. It stars Keanu Reeves, Michael Nyqvist, Alfie Allen, Adrianne Palicki, Bridget Moynahan, Dean Winters, Ian McShane, John Leguizamo, and Willem Dafoe. It is the first installment in the John Wick film series.', '2021-04-11 21:12:07', '2021-05-10 07:03:55'),
(9, 'John Wick : Chapter 2', 'Action, Crime, Thriller\n', '2017-02-07', '2021-05-10T00-01-41.759ZOptimized-john-wick.jpg', '02:02:00', 'Chad Stahelski', ' Keanu Reeves, Riccardo Scamarcio, Ian McShane', 'John Wick: Chapter 2 is a 2017 American neo-noir action-thriller film directed by Chad Stahelski and written by Derek Kolstad. It is the second installment in the John Wick film series, and the sequel to the 2014 film John Wick. It stars Keanu Reeves, Common, Laurence Fishburne, Riccardo Scamarcio, Ruby Rose, John Leguizamo, and Ian McShane. The plot follows hitman John Wick, who goes on the run after a bounty is placed on him. Principal photography began on October 26, 2015, in New York City.', '2021-04-11 21:13:34', '2021-05-10 07:01:41'),
(10, 'John Wick : Chapter 3', 'Action, Crime, Thriller\n', '2019-05-14', '2021-05-09T14-17-57.311ZOptimized-john-wick-3.png', '02:10:00', 'Chad Stahelski', ' Keanu Reeves, Halle Berry, Ian McShane', 'John Wick: Chapter 3 – Parabellum is a 2019 American neo-noir action thriller film starring Keanu Reeves as the eponymous character. It is the third installment in the John Wick film series, following John Wick and Chapter 2. The film is directed by Chad Stahelski and written by Derek Kolstad, Shay Hatten, Chris Collins, and Marc Abrams, based on a story by Kolstad. It also stars Halle Berry, Laurence Fishburne, Mark Dacascos, Asia Kate Dillon, Lance Reddick, Anjelica Huston, and Ian McShane. In the film, which picks up minutes after the end of the previous film, ex-hitman John Wick finds himself on the run from legions of assassins after a $14 million contract is put on his head due to his recent actions.', '2021-04-11 21:13:54', '2021-05-09 21:17:57'),
(11, 'Mission Impossible - Rogue Nation', 'Action, Adventure, Thriller\n', '2015-08-04', '2021-05-10T00-05-10.373ZOptimized-mission-impossible-rogue.jpg', '02:11:00', 'Christopher McQuarrie', ' Tom Cruise, Rebecca Ferguson, Jeremy Renner', 'Mission: Impossible – Rogue Nation is a 2015 American action spy film written and directed by Christopher McQuarrie, from a story by McQuarrie and Drew Pearce and the fifth installment in the Mission: Impossible film series. The film stars Tom Cruise, Jeremy Renner, Simon Pegg, Rebecca Ferguson, Ving Rhames, Alec Baldwin, Sean Harris, Simon McBurney, and Tom Hollander, with Cruise, Renner, Pegg, and Rhames reprising their roles from previous films. Rogue Nation is produced by Cruise, J. J. Abrams, and David Ellison of Skydance Productions. In the film, IMF agent Ethan Hunt is on the run from the CIA, following the IMF\'s dissolution as he tries to prove the existence of the Syndicate, a mysterious global freelance terrorist group composed of many former intelligence officers from many different countries.', '2021-04-11 21:14:58', '2021-05-10 07:05:10'),
(12, 'Mission Impossible - Ghost Protocol', 'Action, Adventure, Thriller\n', '2011-12-15', '2021-05-10T00-04-53.463ZOptimized-mission-impossible-ghost.jpg', '02:12:00', 'Brad Bird', ' Tom Cruise, Jeremy Renner, Simon Pegg', 'The IMF is shut down when it\'s implicated in the bombing of the Kremlin, causing Ethan Hunt and his new team to go rogue to clear their organization\'s name.', '2021-04-11 21:15:23', '2021-05-10 07:04:53'),
(13, 'King Kong', 'Action, Adventure, Drama\n', '2005-12-11', '2021-05-10T00-17-42.916Zking-kong.jpg', '03:07:00', 'Peter Jackson', ' Naomi Watts, Jack Black, Adrien Brody', 'King Kong is a 2005 American monster film co-written, produced, and directed by Peter Jackson. A second remake of the 1933 film of the same title, the film stars Andy Serkis, Naomi Watts, Jack Black, and Adrien Brody. Set in 1933, it follows the story of an ambitious filmmaker who coerces his cast and hired ship crew to travel to the mysterious Skull Island. There, they encounter prehistoric creatures living on the island as well as a legendary giant gorilla known as Kong, whom they capture and take to New York City. Filming for King Kong took place in New Zealand from September 2004 to March 2005. The project\'s budget climbed from an initial $150 million to a then-record-breaking $207 million.', '2021-04-11 21:17:05', '2021-05-10 07:17:42'),
(14, 'Spiderman 3', 'Action, Adventure, Sci-Fi\n', '2007-05-01', '2021-05-10T00-16-12.959Zspiderman-3.jpg', '02:19:00', 'Sam Raimi', ' Tobey Maguire, Kirsten Dunst, Topher Grace', 'Spider-Man 3 is a 2007 American superhero film based on the fictional Marvel Comics character Spider-Man. It was directed by Sam Raimi from a screenplay by Raimi, his older brother Ivan and Alvin Sargent. As the last entry in Raimi\'s Spider-Man trilogy, the film stars Tobey Maguire as Peter Parker / Spider-Man, alongside Kirsten Dunst, James Franco, Thomas Haden Church, Topher Grace, Bryce Dallas Howard, James Cromwell, Rosemary Harris and J. K. Simmons. Set shortly after the events of Spider-Man 2, as Peter Parker prepares his future with Mary Jane Watson, he bonds with an extraterrestrial symbiote, bringing out his anger while facing two villains: Uncle Ben\'s true killer, who becomes Sandman after a freak accident; and Harry Osborn, who seeks to avenge for his father.', '2021-04-11 21:19:42', '2021-05-10 07:16:13'),
(15, 'Spider-Man : Homecoming', 'Action, Adventure, Sci-Fi\n', '2017-07-04', '2021-05-09T14-17-38.750ZOptimized-spiderman-home-coming.png', '02:13:00', 'Jon Watts', 'Tom Holland, Michael Keaton, Robert Downey Jr. ', 'Spider-Man: Homecoming is a 2017 American superhero film based on the Marvel Comics character Spider-Man, co-produced by Columbia Pictures and Marvel Studios, and distributed by Sony Pictures Releasing. It is the second Spider-Man film reboot and the 16th film in the Marvel Cinematic Universe. The film was directed by Jon Watts, from a screenplay by the writing teams of Jonathan Goldstein and John Francis Daley, Watts and Christopher Ford, and Chris McKenna and Erik Sommers. Tom Holland stars as Peter Parker / Spider-Man, alongside Michael Keaton, Jon Favreau, Gwyneth Paltrow, Zendaya, Donald Glover, Jacob Batalon, Laura Harrier, Tony Revolori, Bokeem Woodbine, Tyne Daly, Marisa Tomei, and Robert Downey Jr. In Spider-Man: Homecoming, Peter Parker tries to balance high school life with being Spider-Man while facing the Vulture.', '2021-04-11 21:20:18', '2021-05-09 21:17:38'),
(59, 'The Resort', 'Horror', '2021-06-19', '2021-05-10T00-11-44.979ZOptimized-the-resort.jpg', '01:15:00', 'Taylor Chien', ' Michelle Randolph, Brock O\'Hurn, Bianca Haase ', 'Four friends head to Hawaii to investigate reports of a haunting at an abandoned resort in hopes of finding the infamous Half-Faced Girl. When they arrive, they soon learn you should be careful what you wish for. ', '2021-04-25 09:57:14', '2021-05-10 07:11:45'),
(60, 'Separation', 'Horror', '2021-05-29', '2021-05-10T00-24-40.362Zseparation.jpg', '01:47:00', 'William Brent Bell', 'Rupert Friend, Brian Cox, Madeline Brewer ', 'A young girl finds solace in her artist father and the ghost of her dead mother. ', '2021-04-25 09:57:14', '2021-05-10 07:24:40'),
(61, 'The Virtuoso', ' Action, Crime, Thriller', '2021-04-29', '2021-05-10T00-13-08.679Zthe-virtuoso.jpg', '00:00:00', 'Nick Stagliano', 'Anthony Hopkins, Abbie Cornish, Diora Baird ', 'A lonesome stranger, secure, nerves of steel, must track down and kill a rogue Hitman to satisfy an outstanding debt. But the only information he\'s been given is a time and location where to find his quarry - 5pm at a rustic diner in the dying town. No name, no description, nothing. When the assassin arrives there are several possible targets, including the county sheriff. Endangering his life, the assassin embarks on a manhunt to find the Hitman and accomplish his mission. But the danger escalates when the erotic encounters with a local woman threaten to derail his task.', '2021-04-25 10:03:39', '2021-05-10 07:13:08'),
(62, 'Here Today', 'Comedy', '2021-05-06', '2021-05-10T00-12-31.532Zhere-today.jpg', '00:00:00', 'Billy Crystal', ' Sharon Stone, Tiffany Haddish, Penn Badgley', 'When veteran comedy writer Charlie Burnz meets New York street singer Emma Payge, they form an unlikely yet hilarious and touching friendship that kicks the generation gap aside and redefines the meaning of love and trust. ', '2021-04-25 10:03:39', '2021-05-10 07:12:31'),
(63, 'The Djinn', 'Horror, Thriller', '2021-04-07', '2021-05-10T00-12-03.094Zthe-djinn.jpg', '01:22:00', 'David Charbonier, Justin Powell', 'Ezra Dewey, Rob Brownstein, Tevy Poe ', 'A mute boy is trapped in his apartment with a sinister monster when he makes a wish to fulfill his heart\'s greatest desire. ', '2021-04-25 10:10:34', '2021-05-10 07:12:03'),
(64, 'Dream Horse', ' Biography, Comedy, Drama', '2021-05-20', '2021-05-10T00-12-16.582Zdream-horse.jpg', '01:53:00', 'Euros Lyn', ' Damian Lewis, Toni Collette, Owen Teale', 'Dream Alliance is an unlikely race horse bred by small-town Welsh bartender Jan Vokes. With no experience, Jan convinces her neighbors to chip in their meager earnings to help raise Dream in the hopes he can compete with the racing elites. ', '2021-04-25 10:10:34', '2021-05-10 07:12:16'),
(65, 'F9', 'Action, Adventure, Crime', '2021-06-24', '2021-05-09T23-55-14.531ZOptimized-f9.jpg', '02:25:00', 'Justin Lin', ' Vin Diesel, Michelle Rodriguez, Amber Sienna', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team. ', '2021-04-25 10:13:23', '2021-05-10 06:55:14'),
(70, 'The Spongebob Movie: Sponge On The Run', 'Animation, Adventure, Comedy', '2020-11-05', '2021-05-10T00-20-25.505Zspongebob-movie.jpg', '01:31:00', 'Tim Hill', 'Tim Hill, Clancy Brown, Bill Fagerbakke', 'After SpongeBob\'s beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to The Lost City of Atlantic City to bring Gary home.', '2021-04-25 15:34:16', '2021-05-10 07:20:25'),
(80, 'dede', 'dede', '2021-05-14', '2021-05-09T13-53-57.423Zthe-witches.png', '01:10:00', 'dede', 'dede', 'dede', '2021-05-09 20:53:57', NULL),
(81, 'Tenet', 'act', '2021-05-26', '2021-05-09T13-55-51.783Ztenet.png', '01:14:00', 'tenet', 'Exited casts', 'qdqwdqwdqw', '2021-05-09 20:55:51', NULL),
(83, 'Test New', 'Categories', '2021-05-14', '2021-05-10T04-14-20.793ZOptimized-black-widow.png', '01:47:00', 'Directors', 'Casts', 'Synopsis', '2021-05-10 11:14:21', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `premiere_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_created_at`, `premiere_updated_at`) VALUES
(7, 11, 1, 'CineOne21', 50000, '2021-05-01 08:29:20', NULL),
(16, 12, 3, 'ubv.id', 60000, '2021-05-01 09:08:29', NULL),
(17, 7, 8, 'Grage21', 45000, '2021-05-01 09:22:03', NULL),
(18, 65, 8, 'Grage21', 55000, '2021-05-02 03:45:36', NULL),
(19, 7, 6, 'Maxi XXI', 60000, '2021-05-02 04:15:53', NULL),
(20, 7, 4, 'HONX Cinema', 50000, '2021-05-01 08:28:16', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `premiere_location`
--

CREATE TABLE `premiere_location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) NOT NULL,
  `location_address` text NOT NULL,
  `location_created_at` timestamp NULL DEFAULT current_timestamp(),
  `location_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `premiere_location`
--

INSERT INTO `premiere_location` (`location_id`, `location_city`, `location_address`, `location_created_at`, `location_updated_at`) VALUES
(1, 'Purwokerto Selatan', 'Whatever Street No. 12', '2021-05-01 05:46:21', NULL),
(2, 'Purwokerto Selatan', 'Colonel Street No. 2', '2021-05-01 05:46:21', NULL),
(3, 'Purwokerto Timur', 'Downcare Street No. 21', '2021-05-01 05:47:31', NULL),
(4, 'Jakarta Selatan', 'Jln. Ir. Hj. Djuanda No. 200', '2021-05-01 07:46:02', NULL),
(5, 'Bandung', 'Jln. Dipati Ukur No. 34', '2021-05-01 07:46:02', NULL),
(6, 'Bandung', 'Jln. Pahlawan Perjuangan No. 112', '2021-05-01 07:47:03', NULL),
(7, 'Bandung', 'Jln. Cihampelas No. 2', '2021-05-01 07:47:03', NULL),
(8, 'Cirebon', 'Jln. Cipto Mangunkusumo No. 76', '2021-05-01 08:54:05', NULL),
(9, 'Cirebon', 'Jln. Brigjen Darsono No. 120', '2021-05-01 08:55:51', NULL),
(10, 'Jakarta Pusat', 'Jln. Medan Merdeka Barat No. 200', '2021-05-01 08:56:51', NULL),
(11, 'Jakarta Pusat', 'Jln. Monumen Nasional No. 100', '2021-05-01 08:56:51', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `schedule_date_start` date NOT NULL,
  `schedule_date_end` date DEFAULT NULL,
  `schedule_clock` time NOT NULL,
  `schedule_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `schedule_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `premiere_id`, `schedule_date_start`, `schedule_date_end`, `schedule_clock`, `schedule_created_at`, `schedule_updated_at`) VALUES
(8, 17, '2021-05-10', NULL, '10:00:00', '2021-05-01 09:15:56', NULL),
(9, 17, '2021-05-10', NULL, '12:00:00', '2021-05-01 09:15:56', NULL),
(10, 17, '2021-05-10', NULL, '18:00:00', '2021-05-01 09:17:12', NULL),
(11, 17, '2021-05-10', NULL, '20:00:00', '2021-05-01 09:17:12', NULL),
(12, 18, '2021-05-10', NULL, '12:00:00', '2021-05-01 09:20:44', NULL),
(13, 18, '2021-05-10', NULL, '16:00:00', '2021-05-01 09:20:44', NULL),
(14, 18, '2021-05-12', NULL, '18:00:00', '2021-05-01 11:09:19', NULL),
(15, 18, '2021-05-12', NULL, '14:00:00', '2021-05-02 03:23:58', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone_number` varchar(20) NOT NULL,
  `user_profile_picture` varchar(150) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime DEFAULT NULL,
  `user_role` enum('admin','user') NOT NULL,
  `user_verification` enum('1','0') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_phone_number`, `user_profile_picture`, `user_created_at`, `user_updated_at`, `user_role`, `user_verification`) VALUES
(10, 'admin admin', 'admin@admin.com', '$2b$10$K4pQMwoSrs7hVLufmd/.jeRkDiESoAoI0xyzEW3Ussb./N4wJtQUy', '', '2021-05-09T14-02-24.355Zadmin.jpg', '2021-04-29 19:05:45', '2021-05-09 21:02:24', 'admin', '0'),
(38, 'Teguh Widodo', 'sayhallo.teguh@gmail.com', '$2b$10$4HbN89g2Xdx91tODgXSsPe.jQWtvaeXj8/d.8janC3Fm3VjK8PMJ.', '082324871066', '2021-05-10T04-10-13.585Zbranch_leaves_minimalism_196771_1680x1050.jpg', '2021-05-06 20:44:01', '2021-05-10 11:11:21', 'user', '0'),
(42, 'test', 'test@gmail.com', '$2b$10$lhBacezQbcRvL.1yGUfja.seA/VLGboQcVOpvF6DdY8RFIJQ.hGui', '', '', '2021-05-10 11:07:16', NULL, 'user', '0');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indeks untuk tabel `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indeks untuk tabel `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indeks untuk tabel `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indeks untuk tabel `premiere_location`
--
ALTER TABLE `premiere_location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indeks untuk tabel `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT untuk tabel `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT untuk tabel `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `premiere_location`
--
ALTER TABLE `premiere_location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
