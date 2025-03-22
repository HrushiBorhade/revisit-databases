```
➜  NoSQL git:(main) ✗ docker run -d -p 27017:27017 --name test-mongo --rm mongo
eb3a0172e28b2cbe1ac7689729c73c7d7613d27978f74da1067fae391ef17178
```

```
➜  NoSQL git:(main) ✗ docker exec -it test-mongo mongosh
```

```
test> show dbs
admin   40.00 KiB
config  60.00 KiB
local   40.00 KiB
```

```
test> use myDatabase
switched to db myDatabase
myDatabase> show dbs
admin   40.00 KiB
config  60.00 KiB
local   40.00 KiB
```

```
myDatabase> db.users.insertOne({name:"Hrushi", age:22})
{
  acknowledged: true,
  insertedId: ObjectId('67de3c8374b98dd823fc0421')
}
```

```
myDatabase> db.users.countDocuments()
1
```
