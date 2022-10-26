CREATE TABLE user_info (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  login_name VARCHAR(10) NOT NULL UNIQUE,
  last_name VARCHAR(10) NOT NULL,
  first_name VARCHAR(10) NOT NULL,
  passwd VARCHAR(512) NOT NULL,
  biography VARCHAR(64) NOT NULL DEFAULT '',
  block_point INT UNSIGNED NOT NULL DEFAULT 0,
  last_login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  gender ENUM('m', 'f', 'o'),
  sexual_preference ENUM('bi', 'hetero', 'homo'),
  blocked_date TIMESTAMP,
  profile_img INT UNSIGNED,
  age TINYINT UNSIGNED
);

CREATE TABLE email_list (
  user_id INT UNSIGNED NOT NULL PRIMARY KEY,
  FOREIGN KEY(user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE,
  email VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE img_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  img_url VARCHAR(128) NOT NULL,
  
  FOREIGN KEY (user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE
);

CREATE TABLE like_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT UNSIGNED NOT NULL,
  to_user_id INT UNSIGNED NOT NULL,
  like_value TINYINT NOT NULL,

  FOREIGN KEY (from_user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE,
  FOREIGN KEY (to_user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE
);

CREATE TABLE notify_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  msg VARCHAR(128) NOT NULL,
  
  FOREIGN KEY (user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE
);

CREATE TABLE tag_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(10) NOT NULL
);

CREATE TABLE user_tag_mapper (
  user_id INT UNSIGNED NOT NULL,
  tag_id INT UNSIGNED NOT NULL,

  PRIMARY KEY (user_id, tag_id),
  FOREIGN KEY (user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE,
  FOREIGN KEY (tag_id)
    REFERENCES tag_list(id)
    ON DELETE CASCADE
);

CREATE TABLE room_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user1_id INT UNSIGNED NOT NULL,
  user2_id INT UNSIGNED NOT NULL,

  FOREIGN KEY (user1_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE,
  FOREIGN KEY (user2_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE
);

CREATE TABLE msg_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_id INT UNSIGNED NOT NULL,
  msg VARCHAR(128) NOT NULL,
  from_id INT UNSIGNED NOT NULL,
  send_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (room_id)
    REFERENCES room_list(id)
    ON DELETE CASCADE
);

CREATE TABLE visit_list (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT UNSIGNED NOT NULL,
  to_user_id INT UNSIGNED NOT NULL,

  FOREIGN KEY (from_user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE,
  FOREIGN KEY (to_user_id)
    REFERENCES user_info(id)
    ON DELETE CASCADE
);

INSERT INTO matcha.user_info (login_name, last_name, first_name, passwd) VALUES
  ('jaham', 'ham', 'jaewon', '1234'),
  ('yeju', 'kim', 'yeju', '1234');

INSERT INTO matcha.email_list (user_id, email) VALUES
  (1, 'jaham@student.42seoul.kr'),
  (2, 'yeju@student.42seoul.kr');

INSERT INTO matcha.img_list (user_id, img_url) VALUES
  (1, 'small_jaham'),
  (1, 'middle_jaham'),
  (1, 'large_jaham'),
  (2, 'small_yeju'),
  (2, 'middle_yeju'),
  (2, 'large_yeju');

INSERT INTO matcha.like_list (from_user_id, to_user_id, like_value) VALUES
  (1, 2, 1),
  (2, 1, -1);

INSERT INTO matcha.tag_list (tag_name) VALUES
  ('game'),
  ('music'),
  ('rock'),
  ('jazz'),
  ('classic'),
  ('pop');

INSERT INTO matcha.user_tag_mapper (user_id, tag_id) VALUES
  (1, 3),
  (1, 5),
  (2, 1),
  (2, 2),
  (2, 3);

INSERT INTO matcha.room_list (user1_id, user2_id) VALUES
  (1, 2);

INSERT INTO matcha.msg_list (room_id, msg, from_id) VALUES
  (1, 'first msg', '1'),
  (1, 'second msg', '2'),
  (1, 'third msg', '1'),
  (1, 'fourth msg', '1'),
  (1, 'fifth msg', '2'),
  (1, 'sixth msg', '2'),
  (1, 'seventh msg', '1');

-- SELECT u.user_id, ui.login_name, t.id AS tagid, t.tag_name FROM user_tag_mapper AS u
--   LEFT JOIN user_info AS ui ON u.user_id = ui.id
--   LEFT JOIN tag_list AS t ON u.tag_id = t.id;
