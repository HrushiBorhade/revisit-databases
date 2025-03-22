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

```
myDatabase> db.users.findOne()
{ _id: ObjectId('67de3c8374b98dd823fc0421'), name: 'Hrushi', age: 22 }
```

## Pet Adoption Database Example

- Creating and Inserting Documents
```
myDatabase> use adoption
switched to db adoption
adoption> db.pets.insertOne({name:"Luna", type:"dog", breed:"Havanese", age:8})
{
  acknowledged: true,
  insertedId: ObjectId('67de3f2674b98dd823fc0422')
}
adoption> db.pets.findOne()
{
  _id: ObjectId('67de3f2674b98dd823fc0422'),
  name: 'Luna',
  type: 'dog',
  breed: 'Havanese',
  age: 8
}
```
```
adoption> db.pets.insertMany(
  Array.from({ length: 10000 }).map((_, index) => ({
    name: [
      "Luna",
      "Fido",
      "Fluffy",
      "Carina",
      "Spot",
      "Beethoven",
      "Baxter",
      "Dug",
      "Zero",
      "Santa's Little Helper",
      "Snoopy",
    ][index % 9],
    type: ["dog", "cat", "bird", "reptile"][index % 4],
    age: (index % 18) + 1,
    breed: [
      "Havanese",
      "Bichon Frise",
      "Beagle",
      "Cockatoo",
      "African Gray",
      "Tabby",
      "Iguana",
    ][index % 7],
    index: index,
  }))
)
```

```
adoption> db.pets.countDocuments()
10001
```

- Querying
  
```
adoption> db.pets.findOne({type:"dog", age:8})
{
  _id: ObjectId('67de3f2674b98dd823fc0422'),
  name: 'Luna',
  type: 'dog',
  breed: 'Havanese',
  age: 8
}
```

```
adoption> db.pets.countDocuments({type:"dog", age:9})
278
```

```
adoption> db.pets.find({type:"dog", age:9})
[
  {
    _id: ObjectId('67de3f7774b98dd823fc042b'),
    name: 'Zero',
    type: 'dog',
    age: 9,
    breed: 'Bichon Frise',
    index: 8
  },
  ...
]
Type "it" for more
```

```
adoption> db.pets.find({type:"dog", age:9}).limit(3)
[
  {
    _id: ObjectId('67de3f7774b98dd823fc042b'),
    name: 'Zero',
    type: 'dog',
    age: 9,
    breed: 'Bichon Frise',
    index: 8
  },
  {
    _id: ObjectId('67de3f7774b98dd823fc044f'),
    name: 'Zero',
    type: 'dog',
    age: 9,
    breed: 'Beagle',
    index: 44
  },
  {
    _id: ObjectId('67de3f7774b98dd823fc0473'),
    name: 'Zero',
    type: 'dog',
    age: 9,
    breed: 'Cockatoo',
    index: 80
  }
]
adoption> it
no cursor
```

```
adoption> db.pets.count({type:"dog", age: {$gt : 10}})
1110
```
- logical operators
```  
adoption> db.pets.count({type:"dog", $and:[{age:{$gte:4}},{age:{$lte:10}}]})
835
```
```
adoption> db.pets.find().sort({age: -1}).limit(2)
[
  {
    _id: ObjectId('67de3f7774b98dd823fc0446'),
    name: 'Zero',
    type: 'reptile',
    age: 18,
    breed: 'Havanese',
    index: 35
  },
  {
    _id: ObjectId('67de3f7774b98dd823fc0434'),
    name: 'Zero',
    type: 'cat',
    age: 18,
    breed: 'Cockatoo',
    index: 17
  }
]
```