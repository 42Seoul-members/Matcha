create table user_info (
  id int unsigned not null auto_increment primary key,
  last_name varchar(10) not null,
  first_name varchar(10) not null,
  passwd varchar(512) not null,
  gender enum('m', 'f', 'o'),
  sexual_preference enum('bi', 'hetero', 'homo'),
  biography varchar(64) not null default '',
  last_login timestamp not null default current_timestamp,
  blocked_date timestamp,
  profile_img int unsigned,
  age tinyint unsigned
);

create table email_list (
  user_id int unsigned not null primary key,
  foreign key (user_id)
    references user_info(id)
    on delete cascade,

  email varchar(128) not null unique
);

create table login_name_list (
  user_id int unsigned not null primary key,
  foreign key (user_id)
    references user_info(id)
    on delete cascade,
  
  login_name varchar(30) not null
);

create table tag_list (
  id int unsigned not null auto_increment primary key,
  tag_name varchar(10) not null
);

create table user_tag_mapper (
  user_id int unsigned not null,
  foreign key (user_id)
    references user_info(id)
    on delete cascade,

  tag_id int unsigned not null,
  foreign key (tag_id)
    references tag_list(id)
    on delete cascade,

  primary key (user_id, tag_id)
);

create table notify_list (
  id int unsigned not null auto_increment primary key,

  from_user_id int unsigned not null,
  foreign key (from_user_id)
    references user_info(id)
    on delete cascade,
  
  to_user_id int unsigned not null,
  foreign key (to_user_id)
    references user_info(id)
    on delete cascade,

  event_name enum('like', 'unlike', 'visit', 'chat') not null
);

create table report_list (
  id int unsigned not null auto_increment primary key,

  from_user_id int unsigned not null,
  foreign key (from_user_id)
    references user_info(id)
    on delete cascade,
  
  to_user_id int unsigned not null,
  foreign key (to_user_id)
    references user_info(id)
    on delete cascade,
  
  report_date timestamp not null default(current_timestamp)
);

create table img_list (
  id int unsigned not null auto_increment primary key,

  user_id int unsigned not null,
  foreign key (user_id)
    references user_info(id)
    on delete cascade,
  
  img_url varchar(128) not null
);

create table room_list (
  id int unsigned not null auto_increment primary key,

  user1_id int unsigned not null,
  foreign key (user1_id)
    references user_info(id)
    on delete cascade,

  user2_id int unsigned not null,
  foreign key (user2_id)
    references user_info(id)
    on delete cascade
);

create table msg_list (
  id int unsigned not null auto_increment primary key,

  room_id int unsigned not null,
  foreign key (room_id)
    references room_list(id)
    on delete cascade,

  msg varchar(128) not null,
  from_id int unsigned not null,
  send_time timestamp not null default current_timestamp
);

create table like_list (
  id int unsigned not null auto_increment primary key,

  from_user_id int unsigned not null,
  foreign key (from_user_id)
    references user_info(id)
    on delete cascade,

  to_user_id int unsigned not null,
  foreign key (to_user_id)
    references user_info(id)
    on delete cascade
);

create table block_list (
  id int unsigned not null auto_increment primary key,

  from_user_id int unsigned not null,
  foreign key (from_user_id)
    references user_info(id)
    on delete cascade,

  to_user_id int unsigned not null,
  foreign key (to_user_id)
    references user_info(id)
    on delete cascade
);

create table visit_list (
  id int unsigned not null auto_increment primary key,
  from_user_id int unsigned not null,
  to_user_id int unsigned not null,

  foreign key (from_user_id)
    references user_info(id)
    on delete cascade,
  foreign key (to_user_id)
    references user_info(id)
    on delete cascade
);

insert into matcha.user_info (last_name, first_name, passwd) values
  ('ham', 'jaewon', '1234'),
  ('kim', 'yeju', '1234');

insert into matcha.email_list (user_id, email) values
  (1, 'jaham@student.42seoul.kr'),
  (2, 'yeju@student.42seoul.kr');

insert into matcha.login_name_list (user_id, login_name) values
  (1, 'jaham'),
  (2, 'yeju');

insert into matcha.img_list (user_id, img_url) values
  (1, 'small_jaham'),
  (1, 'middle_jaham'),
  (1, 'large_jaham'),
  (2, 'small_yeju'),
  (2, 'middle_yeju'),
  (2, 'large_yeju');

insert into matcha.like_list (from_user_id, to_user_id) values
  (1, 2);

insert into matcha.block_list (from_user_id, to_user_id) values
  (2, 1);

insert into matcha.tag_list (tag_name) values
  ('game'),
  ('music'),
  ('rock'),
  ('jazz'),
  ('classic'),
  ('pop');

insert into matcha.user_tag_mapper (user_id, tag_id) values
  (1, 3),
  (1, 5),
  (2, 1),
  (2, 2),
  (2, 3);

insert into matcha.room_list (user1_id, user2_id) values
  (1, 2);

insert into matcha.msg_list (room_id, msg, from_id) values
  (1, 'first msg', '1'),
  (1, 'second msg', '2'),
  (1, 'third msg', '1'),
  (1, 'fourth msg', '1'),
  (1, 'fifth msg', '2'),
  (1, 'sixth msg', '2'),
  (1, 'seventh msg', '1');

-- select u.user_id, ui.login_name, t.id as tagid, t.tag_name from user_tag_mapper as u
--   left join user_info as ui on u.user_id = ui.id
--   left join tag_list as t on u.tag_id = t.id;
