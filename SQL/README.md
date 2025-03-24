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