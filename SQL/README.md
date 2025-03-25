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