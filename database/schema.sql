CREATE TABLE restaurants (
  id                serial primary key unique,
  name              varchar(50),
  location          varchar(50), 
  noise             varchar(10),
  rec_percent       real,
  avg_overall       real,
  avg_food          real,
  avg_service       real,
  avg_ambience      real,
  value_rating      real
);

CREATE TABLE users (
  id             serial primary key unique,
  first_name     varchar(50),
  last_name      varchar(50),
  city           varchar(50),
  avatar_color   varchar(10),
  is_vip         boolean,
  total_reviews  int
);

CREATE TABLE reviews (
  id                 serial primary key unique,
  restaurant_id      bigint,
  user_id            bigint,
  text               varchar(1000),
  date               date,
  overall_score      smallint,
  food_score         smallint,
  service_score      smallint,
  ambience_score     smallint,
  value_score        smallint,
  is_recommended     boolean,
  tags               varchar(300)
);

COPY reviews 
FROM '/Users/scotttorres/SDC-OpenSource-Table/slhodak-reviews-and-impressions/reviewData.txt' DELIMITER ',' CSV HEADER;

COPY restaurants 
FROM '/Users/scotttorres/SDC-OpenSource-Table/slhodak-reviews-and-impressions/restaurantData.txt' DELIMITER ',' CSV HEADER;

COPY users
FROM '/Users/scotttorres/SDC-OpenSource-Table/slhodak-reviews-and-impressions/userData.txt' DELIMITER ',' CSV HEADER;

