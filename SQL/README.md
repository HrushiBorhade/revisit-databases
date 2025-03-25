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

