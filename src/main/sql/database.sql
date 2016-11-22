DROP TABLE IF EXISTS highscores;

CREATE TABLE highscores
(
  id serial NOT NULL,
  player_name character varying NOT NULL,
  date_created timestamp without time zone NOT NULL,
  score bigint NOT NULL,
  CONSTRAINT highscore_pk PRIMARY KEY (id),
  CONSTRAINT player_name_chk CHECK ((length(player_name) > 0) AND (LENGTH(player_name) <= 255))
);