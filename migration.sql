CREATE DATABASE `4movies`;
USE `4movies`;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(128) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);

CREATE TABLE directors (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
);

CREATE TABLE movies (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  copies SMALLINT UNSIGNED NOT NULL,
  director_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (title, director_id),
  CONSTRAINT movies_director_id_fk FOREIGN KEY (director_id) REFERENCES directors (id) ON DELETE CASCADE
);

CREATE TABLE rentals (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  movie_id INT UNSIGNED NOT NULL,
  rented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  returned_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  CONSTRAINT rentals_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT rentals_movie_id_fk FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE
);

-- Directors
INSERT INTO directors (id, name) VALUES (1, 'Milos Forman');
INSERT INTO directors (id, name) VALUES (2, 'Martin Scorsese');
INSERT INTO directors (id, name) VALUES (3, 'Alfred Hitchcock');

-- Movies
INSERT INTO movies (id, title, copies, director_id) VALUES (1, 'Um Estranho no Ninho', 2, 1);
INSERT INTO movies (id, title, copies, director_id) VALUES (2, 'O Lobo de Wall Street', 0, 2);
INSERT INTO movies (id, title, copies, director_id) VALUES (3, 'Psicose', 5, 3);


