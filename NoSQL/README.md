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
- Projections
```
adoption> db.pets.find({type:"dog"}, {name:1}).limit(5)
[
  { _id: ObjectId('67de3f2674b98dd823fc0422'), name: 'Luna' },
  { _id: ObjectId('67de3f7774b98dd823fc0423'), name: 'Luna' },
  { _id: ObjectId('67de3f7774b98dd823fc0427'), name: 'Spot' },
  { _id: ObjectId('67de3f7774b98dd823fc042b'), name: 'Zero' },
  { _id: ObjectId('67de3f7774b98dd823fc042f'), name: 'Carina' }
]
```
```
adoption> db.pets.find({type:"dog"}, {name:true, breed:true, _id:false}).limit(5)
[
  { name: 'Luna', breed: 'Havanese' },
  { name: 'Luna', breed: 'Havanese' },
  { name: 'Spot', breed: 'African Gray' },
  { name: 'Zero', breed: 'Bichon Frise' },
  { name: 'Carina', breed: 'Tabby' }
]
```
- Updating
```
adoption> db.pets.updateMany({ type: "dog" }, { $inc: { age: 1 } });
```
```
adoption> db.pets.updateOne(
  { type: "dog", name: "Luna", breed: "Havanese" },
  { $set: { owner: "Hrushi" } }
);
```
```
adoption> db.pets.updateOne(
  {
    type: "dog",
    name: "Sudo",
    breed: "Wheaten",
  },
  {
    $set: {
      type: "dog",
      name: "Sudo",
      breed: "Wheaten",
      age: 5,
      index: 10000,
      owner: "Sarah Drasner",
    },
  },
  {
    upsert: true,
  }
);
```
- Delete
```
adoption> db.pets.deleteMany({type:"reptile", breed:"Havanese"})
{ acknowledged: true, deletedCount: 357 }
```
```
adoption> db.pets.findOneAndDelete({name:"Fido"})
{
  _id: ObjectId('67de3f7774b98dd823fc0424'),
  name: 'Fido',
  type: 'cat',
  age: 2,
  breed: 'Bichon Frise',
  index: 1
}
```

- Indexing
```
adoption> db.pets.createIndex({name:1})
name_1
```
```
adoption> db.pets.find({name:"Fluffy"}).explain("executionStats")
{
  explainVersion: '1',
  queryPlanner: {
    namespace: 'adoption.pets',
    parsedQuery: { name: { '$eq': 'Fluffy' } },
    indexFilterSet: false,
    planCacheShapeHash: '544F3E5C',
    planCacheKey: 'EEE0759C',
    optimizationTimeMillis: 0,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { name: 1 },
        indexName: 'name_1',
        isMultiKey: false,
        multiKeyPaths: { name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { name: [ '["Fluffy", "Fluffy"]' ] }
      }
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 1071,
    executionTimeMillis: 6,
    totalKeysExamined: 1071,
    totalDocsExamined: 1071,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 1071,
      executionTimeMillisEstimate: 4,
      works: 1072,
      advanced: 1071,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 1071,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 1071,
        executionTimeMillisEstimate: 4,
        works: 1072,
        advanced: 1071,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { name: 1 },
        indexName: 'name_1',
        isMultiKey: false,
        multiKeyPaths: { name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { name: [ '["Fluffy", "Fluffy"]' ] },
        keysExamined: 1071,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  queryShapeHash: 'E9D342F4EBE690C2A2A85458850DD2861E11652EB849BFB8EA8D8B8FAB49B7E6',
  command: { find: 'pets', filter: { name: 'Fluffy' }, '$db': 'adoption' },
  serverInfo: {
    host: 'eb3a0172e28b',
    port: 27017,
    version: '8.0.4',
    gitVersion: 'bc35ab4305d9920d9d0491c1c9ef9b72383d31f9'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
```
```
adoption>   db.pets.createIndex({index:1}, {unique:true})
index_1
adoption> db.pets.insertOne({name:"tuffy",index:10})
MongoServerError: E11000 duplicate key error collection: adoption.pets index: index_1 dup key: { index: 10 }
```

