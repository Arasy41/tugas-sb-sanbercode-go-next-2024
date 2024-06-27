CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `profile_id` int
);

CREATE TABLE `profile` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `age` int,
  `biodata` text,
  `address` varchar(255)
);

CREATE TABLE `movie` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `summary` text,
  `year` int,
  `poster` varchar(255)
);

CREATE TABLE `genre` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `movie_genre` (
  `movie_id` int,
  `genre_id` int,
  PRIMARY KEY (`movie_id`, `genre_id`)
);

CREATE TABLE `cast` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `age` int,
  `biodata` text
);

CREATE TABLE `role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `movie_cast` (
  `movie_id` int,
  `cast_id` int,
  `role_id` int,
  PRIMARY KEY (`movie_id`, `cast_id`, `role_id`)
);

CREATE TABLE `review` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `rating` int,
  `critics` text,
  `user_id` int,
  `movie_id` int
);

ALTER TABLE `user` ADD FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`);

ALTER TABLE `movie_genre` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

ALTER TABLE `movie_genre` ADD FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`);

ALTER TABLE `movie_cast` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);

ALTER TABLE `movie_cast` ADD FOREIGN KEY (`cast_id`) REFERENCES `cast` (`id`);

ALTER TABLE `movie_cast` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `review` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `review` ADD FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);
