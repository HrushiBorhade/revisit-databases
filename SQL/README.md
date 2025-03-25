```
➜  revisit-databases git:(main) docker run -d --rm --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword  -p 5432:5432 postgres
fc42935d8d5a0a279b86e781b805c0cbecaa392999ca794ba1a36a1db94b4dc6
```
```
➜  revisit-databases git:(main) docker exec -it -u postgres my-postgres psql
psql (17.4 (Debian 17.4-1.pgdg120+2))
```

- Create a Database
```
postgres=# CREATE DATABASE message_boards;
CREATE DATABASE
```
- Connect to a Database
```
postgres=# \c message_boards;
You are now connected to database "message_boards" as user "postgres".
```

- some psql commands
```
-- see all databases
\l

-- see all tables in this database, probably won't see anything
\d

-- see all available commands
\?

-- see available queries
\h

-- run a shell command
\! ls && echo "hi from shell!"
```

- Create Table
```
message_boards=# CREATE TABLE users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 25 ) UNIQUE NOT NULL,
  email VARCHAR ( 50 ) UNIQUE NOT NULL,
  full_name VARCHAR ( 100 ) NOT NULL,
  last_login TIMESTAMP,
  created_on TIMESTAMP NOT NULL
);
```

- Insert into table 
```
message_boards=# INSERT INTO users(username, email, full_name, created_on) VALUES ('hrushiB', 'hrushi@gmail.com', 'hrushi borhade', NOW());
```

- Get Records
```
message_boards=# SELECT * FROM users;
 user_id | username |      email       |   full_name    | last_login |         created_on
---------+----------+------------------+----------------+------------+----------------------------
       1 | hrushiB  | hrushi@gmail.com | hrushi borhade |            | 2025-03-25 02:38:00.358372
(1 row)
```

```
message_boards-# SELECT * FROM users LIMIT 10;
 user_id |  username   |              email              |     full_name     |         last_login         |         created_on
---------+-------------+---------------------------------+-------------------+----------------------------+----------------------------
       1 | dpuckring0  | dpuckring0@wikimedia.org        | Dicky Puckring    |                            | 2025-03-18 02:49:39.980287
       2 | ssiviour1   | ssiviour1@ow.ly                 | Suzanna Siviour   | 2025-03-23 02:49:39.980287 | 2025-03-22 02:49:39.980287
       3 | gsomerled2  | gsomerled2@auda.org.au          | Geneva Somerled   |                            | 2025-03-21 02:49:39.980287
       4 | wedginton3  | wedginton3@google.com           | Winny Edginton    | 2025-03-20 02:49:39.980287 | 2025-03-19 02:49:39.980287
       5 | mshine4     | mshine4@army.mil                | Mitchael Shine    | 2025-03-18 02:49:39.980287 | 2025-03-17 02:49:39.980287
       6 | marnli5     | marnli5@google.co.uk            | Magdalena Arnli   | 2025-03-16 02:49:39.980287 | 2025-03-15 02:49:39.980287
       7 | wjohnston6  | wjohnston6@omniture.com         | Wandis Johnston   | 2025-03-08 02:49:39.980287 | 2025-03-13 02:49:39.980287
       8 | shenstone7  | shenstone7@networksolutions.com | Sibyl Henstone    | 2025-03-12 02:49:39.980287 | 2025-03-11 02:49:39.980287
       9 | chuffey8    | chuffey8@csmonitor.com          | Calhoun Huffey    | 2025-03-10 02:49:39.980287 | 2025-03-09 02:49:39.980287
      10 | asandiland9 | asandiland9@sun.com             | Adolphe Sandiland | 2025-03-08 02:49:39.980287 | 2025-03-07 02:49:39.980287
(10 rows)
```

- Projections
```
message_boards=# SELECT username, user_id FROM users LIMIT 15;
  username   | user_id
-------------+---------
 dpuckring0  |       1
 ssiviour1   |       2
 gsomerled2  |       3
 wedginton3  |       4
 mshine4     |       5
 marnli5     |       6
 wjohnston6  |       7
 shenstone7  |       8
 chuffey8    |       9
 asandiland9 |      10
 sfaiera     |      11
 bbordisb    |      12
 gstathorc   |      13
 gsukbhansd  |      14
 jcabbelle   |      15
(15 rows)
```

- Where
```
message_boards=# SELECT username, user_id FROM users WHERE last_login IS NULL LIMIT 15;
   username    | user_id
---------------+---------
 dpuckring0    |       1
 gsomerled2    |       3
 sfaiera       |      11
 gsukbhansd    |      14
 aaizikovj     |      20
 hmaccurtaink  |      21
 gromaynep     |      26
 fbodicumu     |      31
 wcurwoodv     |      32
 gcloneyy      |      35
 rlorenzetti11 |      38
 ldykes12      |      39
 msimonich13   |      40
 klicciardo14  |      41
 fcaldwall17   |      44
(15 rows)
```

- AND and maths
```
message_boards=# SELECT username, email, user_id, created_on FROM users WHERE last_login IS NULL AND created_on < NOW() - interval '6 months'  LIMIT 10;
  username   |         email          | user_id |         created_on
-------------+------------------------+---------+----------------------------
 ggodboltfl  | ggodboltfl@hc360.com   |     562 | 2024-09-17 02:49:39.980287
 gplankfp    | gplankfp@google.nl     |     566 | 2024-09-17 02:49:39.980287
 gturlefs    | gturlefs@nsw.gov.au    |     569 | 2024-09-17 02:49:39.980287
 aordemannfx | aordemannfx@i2i.jp     |     574 | 2024-09-17 02:49:39.980287
 taldisfz    | taldisfz@ameblo.jp     |     576 | 2024-09-17 02:49:39.980287
 cwayong2    | cwayong2@biglobe.ne.jp |     579 | 2024-09-17 02:49:39.980287
 yraittg3    | yraittg3@msu.edu       |     580 | 2024-09-17 02:49:39.980287
 dbyrthg4    | dbyrthg4@sakura.ne.jp  |     581 | 2024-09-17 02:49:39.980287
 cmorsheadg5 | cmorsheadg5@go.com     |     582 | 2024-09-17 02:49:39.980287
 dkoppensg7  | dkoppensg7@globo.com   |     584 | 2024-09-17 02:49:39.980287
(10 rows)
```

- ORDER
```
message_boards=# SELECT username, email, created_on FROM users ORDER BY created_on LIMIT 10;
   username   |            email            |         created_on
--------------+-----------------------------+----------------------------
 edepp        | edepp@360.cn                | 2024-03-22 02:49:39.980287
 saspinps     | saspinps@wired.com          | 2024-03-22 02:49:39.980287
 kdohertypm   | kdohertypm@mayoclinic.com   | 2024-03-22 02:49:39.980287
 hderrickpo   | hderrickpo@wsj.com          | 2024-03-22 02:49:39.980287
 jsappypq     | jsappypq@sciencedaily.com   | 2024-03-22 02:49:39.980287
 cmottepr     | cmottepr@bbc.co.uk          | 2024-03-22 02:49:39.980287
 akarlemanpk  | akarlemanpk@blogs.com       | 2024-03-22 02:49:39.980287
 gtivolierpl  | gtivolierpl@istockphoto.com | 2024-03-22 02:49:39.980287
 vwindridgepn | vwindridgepn@umn.edu        | 2024-03-22 02:49:39.980287
 bbrookespt   | bbrookespt@skyrock.com      | 2024-03-22 02:49:39.980287
(10 rows)

message_boards=# SELECT username, email, created_on FROM users ORDER BY created_on DESC LIMIT 10;
  username   |              email              |         created_on
-------------+---------------------------------+----------------------------
 ssiviour1   | ssiviour1@ow.ly                 | 2025-03-22 02:49:39.980287
 gsomerled2  | gsomerled2@auda.org.au          | 2025-03-21 02:49:39.980287
 wedginton3  | wedginton3@google.com           | 2025-03-19 02:49:39.980287
 dpuckring0  | dpuckring0@wikimedia.org        | 2025-03-18 02:49:39.980287
 mshine4     | mshine4@army.mil                | 2025-03-17 02:49:39.980287
 marnli5     | marnli5@google.co.uk            | 2025-03-15 02:49:39.980287
 wjohnston6  | wjohnston6@omniture.com         | 2025-03-13 02:49:39.980287
 shenstone7  | shenstone7@networksolutions.com | 2025-03-11 02:49:39.980287
 chuffey8    | chuffey8@csmonitor.com          | 2025-03-09 02:49:39.980287
 asandiland9 | asandiland9@sun.com             | 2025-03-07 02:49:39.980287
(10 rows)
```
- Count
```
message_boards=# SELECT COUNT(*) FROM users;
 count
-------
  1000
(1 row)

message_boards=# SELECT COUNT(last_login) FROM users;
 count
-------
   678
(1 row)
```

- Update
```
message_boards=# UPDATE users SET username='hrushi18' WHERE user_id=1 RETURNING *;
 user_id | username |          email           |   full_name    | last_login |         created_on
---------+----------+--------------------------+----------------+------------+----------------------------
       1 | hrushi18 | dpuckring0@wikimedia.org | Dicky Puckring |            | 2025-03-18 02:49:39.980287
(1 row)

UPDATE 1
```
- Delete
```
message_boards=# DELETE FROM users WHERE user_id = 999 RETURNING *;
 user_id |  username  |        email         |   full_name    |         last_login         |         created_on
---------+------------+----------------------+----------------+----------------------------+----------------------------
     999 | ncuttellrr | ncuttellrr@unblog.fr | Nicole Cuttell | 2024-03-22 02:49:39.980287 | 2024-03-22 02:49:39.980287
(1 row)

DELETE 1
```

- Foreign Keys
```
CREATE TABLE users(
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(25) UNIQUE NOT NULL, 
  email VARCHAR(50) UNIQUE NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  last_login TIMESTAMP,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE boards(
  board_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  board_name VARCHAR(50) UNIQUE NOT NULL, 
  board_description TEXT NOT NULL
);

CREATE TABLE comment(
  comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  board_id INT REFERENCES boards(board_id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  time TIMESTAMP
)
```

- JOINS
```
message_boards=# SELECT comment_id, user_id, LEFT(comment,20) AS preview FROM comments WHERE board_id=39;
 comment_id | user_id |       preview
------------+---------+----------------------
         63 |     858 | Maecenas tristique,
        358 |     876 | Mauris enim leo, rho
        410 |     344 | Praesent blandit. Na
        429 |     789 | Maecenas ut massa qu
        463 |     925 | Phasellus sit amet e
        485 |     112 | Maecenas tristique,
        524 |      41 | Lorem ipsum dolor si
        532 |     502 | In hac habitasse pla
        540 |     588 | Nullam porttitor lac
        545 |     587 | Praesent id massa id
        551 |     620 | Morbi porttitor lore
        972 |     998 | Aenean lectus. Pelle
(12 rows)

message_boards=# SELECT comment_id, comments.user_id, users.username, time, LEFT(comments,20) AS preview FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE comment_id | user_id |   username   |        time         |       preview
------------+---------+--------------+---------------------+----------------------
        524 |      41 | klicciardo14 | 2018-07-09 15:36:28 | Lorem ipsum dolor si
        485 |     112 | erobrose33   | 2019-08-30 02:32:38 | Maecenas tristique,
        410 |     344 | tposse9j     | 2018-10-07 19:02:52 | Praesent blandit. Na
        532 |     502 | dbenndx      | 2019-07-06 04:08:15 | In hac habitasse pla
        545 |     587 | rspitaroga   | 2019-11-03 22:48:08 | Praesent id massa id
        540 |     588 | rrandlegb    | 2020-01-21 19:52:11 | Nullam porttitor lac
        551 |     620 | bcarlawh7    | 2020-06-11 00:37:22 | Morbi porttitor lore
        429 |     789 | mpelllw      | 2019-05-24 14:56:49 | Maecenas ut massa qu
         63 |     858 | uvickarnt    | 2020-07-31 04:46:40 | Maecenas tristique,
        358 |     876 | egeffenob    | 2020-06-20 02:28:58 | Mauris enim leo, rho
        463 |     925 | hderrickpo   | 2018-01-02 14:48:49 | Phasellus sit amet e
        972 |     998 | imcdowallrp  | 2018-03-15 00:23:38 | Aenean lectus. Pelle
(12 rows)

(END)

message_boards=# SELECT
  comment_id, comments.user_id, users.username, time, LEFT(comment, 20) AS preview
FROM
  comments
NATURAL INNER JOIN
  users
WHERE
  board_id = 39;

comment_id | user_id |   username   |        time         |       preview
------------+---------+--------------+---------------------+----------------------
        524 |      41 | klicciardo14 | 2018-07-09 15:36:28 | Lorem ipsum dolor si
        485 |     112 | erobrose33   | 2019-08-30 02:32:38 | Maecenas tristique,
        410 |     344 | tposse9j     | 2018-10-07 19:02:52 | Praesent blandit. Na
        532 |     502 | dbenndx      | 2019-07-06 04:08:15 | In hac habitasse pla
        545 |     587 | rspitaroga   | 2019-11-03 22:48:08 | Praesent id massa id
        540 |     588 | rrandlegb    | 2020-01-21 19:52:11 | Nullam porttitor lac
        551 |     620 | bcarlawh7    | 2020-06-11 00:37:22 | Morbi porttitor lore
        429 |     789 | mpelllw      | 2019-05-24 14:56:49 | Maecenas ut massa qu
         63 |     858 | uvickarnt    | 2020-07-31 04:46:40 | Maecenas tristique,
        358 |     876 | egeffenob    | 2020-06-20 02:28:58 | Mauris enim leo, rho
        463 |     925 | hderrickpo   | 2018-01-02 14:48:49 | Phasellus sit amet e
        972 |     998 | imcdowallrp  | 2018-03-15 00:23:38 | Aenean lectus. Pelle
(12 rows)

(END)

```

- SubQueries
```
message_boards=# SELECT comment_id, user_id, LEFT(comment, 20) FROM comments WHERE user_id = (SELECT user_id FROM users WHERE full_name = 'Maynord Simonich');
 comment_id | user_id |         left
------------+---------+----------------------
        208 |      40 | Nullam porttitor lac
        275 |      40 | Sed sagittis. Nam co
        624 |      40 | Integer ac leo. Pell
        917 |      40 | Cras mi pede, malesu
(4 rows)
```

- GroupBy
```
message_boards=# SELECT
  boards.board_name, COUNT(*) AS comment_count
FROM
  comments
INNER JOIN
  boards
ON
  boards.board_id = comments.board_id
GROUP BY
  boards.board_name
ORDER BY
  comment_count DESC
LIMIT 10;
      board_name      | comment_count
----------------------+---------------
 Cloned               |            18
 budgetary management |            18
 open system          |            16
 Universal            |            16
 analyzer             |            15
 puppies              |            15
 Balanced             |            14
 leverage             |            14
 Seamless             |            14
 Innovative           |            13
(10 rows)

message_boards=# SELECT
  boards.board_name, COUNT(*) AS comment_count
FROM
  comments
INNER JOIN
  boards
ON
  boards.board_id = comments.board_id
GROUP BY
  boards.board_name
ORDER BY
  comment_count ASC
LIMIT 10;
   board_name    | comment_count
-----------------+---------------
 Diverse         |             4
 neutral         |             5
 heuristic       |             6
 De-engineered   |             6
 Polarised       |             6
 cars            |             6
 whiskey         |             6
 Mandatory       |             6
 functionalities |             6
 beer            |             6
(10 rows)

message_boards=# SELECT
  boards.board_name, COUNT(comment_id) AS comment_count
FROM
  comments
RIGHT JOIN
  boards
ON
  boards.board_id = comments.board_id
GROUP BY
  boards.board_name
ORDER BY
  comment_count;

       board_name        | comment_count
-------------------------+---------------
 fire                    |             0
 Diverse                 |             4
 neutral                 |             5
 Mandatory               |             6
 responsive              |             6
 functionalities         |             6
 De-engineered           |             6
 Polarised               |             6
 cars                    |             6
 beer                    |             6
 whiskey                 |             6
 heuristic               |             6
 bi-directional          |             7
 Exclusive               |             7
 Function-based          |             7
 impactful               |             7
 dogs                    |             7
 uniform                 |             8
 Virtual                 |             8
 dresses                 |             8
 Upgradable              |             8
 shoes                   |             8
 birds                   |             8
 dedicated               |             8
 computers               |             8
 travel                  |             8
 multi-tasking           |             8
 transitional            |             8
 info-mediaries          |             8
 success                 |             9
 Persevering             |             9
 Decentralized           |             9
 methodical              |             9
 Up-sized                |             9
 protocol                |             9
 Triple-buffered         |             9
 Object-based            |             9
:
```
