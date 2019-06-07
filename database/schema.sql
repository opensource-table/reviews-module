CREATE TABLE restaurants (
  id           serial primary key unique,
  nm           varchar(50),
  loc          varchar(50), 
  noise        varchar(10),
  rec_per      real,
  avg_ov       real,
  avg_fd       real,
  avg_srv      real,
  avg_amb      real,
  val_rat      real
);

CREATE TABLE users (
  id       serial primary key unique,
  f_nm     varchar(50),
  l_nm     varchar(50),
  cit      varchar(50),
  av_col   varchar(10),
  is_vip   boolean,
  tot_rev  int
);

CREATE TABLE reviews (
  id                 serial primary key unique,
  r_id               bigint,
  u_id               bigint,
  txt                varchar(1000),
  date               date,
  ov_scr             smallint,
  fd_scr             smallint,
  srv_scr            smallint,
  amb_scr            smallint,
  val_scr            smallint,
  is_rec             boolean,
  tags               varchar(100)
);

COPY reviews 
FROM '/Users/scotttorres/SDC-OpenSource-Table/slhodak-reviews-and-impressions/reviewData.txt' DELIMITER ',' CSV HEADER;

COPY restaurants 
FROM '/Users/scotttorres/SDC-OpenSource-Table/slhodak-reviews-and-impressions/restaurantData.txt' DELIMITER ',' CSV HEADER;

COPY users
FROM '/Users/scotttorres/SDC-OpenSource-Table/slhodak-reviews-and-impressions/userData.txt' DELIMITER ',' CSV HEADER;

