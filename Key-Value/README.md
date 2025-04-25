# Redis

```
➜  ~ docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
```
➜  ~ docker exec -it redis-stack bash
```
```
➜  ~ docker exec -it redis-stack bash
root@447c60542912:/# redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```

```
http://localhost:8001/redis-stack/browser
```