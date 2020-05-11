# Redis ORM

## Rationale

This library came about from a project that required a massively scalable and fast database, but only for a few minutes a day. There are some great Redis ORM's already out there, such as [Nohm](https://github.com/maritz/nohm), but it didn't quite fit our needs; support for redis cluster, a closer syntax to existing schemas and support for slow-sync. But a highly recommend Nohm!

## Summary

To support this need, the RedisORM provides the following high level features;

* Support for typical database queries.
* Support for mosst common data types.
* Support for redis clusters.
* Ability to export to, and import from, a Postgres database (other databases coming soon) - to allow the redis data to be shut down or stood up as needed.
* Versioning to support concurrent read/writes on same object.
* Indexing for enhanced performance and query support.

### Road map

* TTL for auto-deleting of objects (such as sessions).
* Enumerated types.
* Custom and pre-defined validators.
* Support for Mongo sync (export/import)
* Pub/sub support.

## Schema 

Supported types;

| Type                      | Descriptions  |
|---------------------------|---------------------------------------------------------|
| 'integer'                 | Integer data types, validated using parseInt  |
| 'float', 'number'         | Numeric data types, validated using parseFloat |
| 'date', 'timestamp'       | Date types, will be stored as a integer (unix epoch)   |
| 'json', 'array', 'object' | Complex data types, stored as a string using JSON.stringify |
| 'boolean'                 | Boolean, stored as a 1 or 0 |
| 'string'                  | Basic string |

### Enumerated data types

Coming soon!

## Note on Indexes

Indexes are required for any field that you wish to perform a query on. However non-complex (object, array or json types) fields 
can not be indexed so therefore can not be queried on.

## Query

Support for the following operators is provided;

$gte, $gt
$lte, $lt
limit
offset

## Instance methods

remove()
save()

## Static methods

register()
exists(id)
count(query)
distinct(field, query)
remove(id)
getField(query, field)
setFieldById(id, field, val)
setField(query, field, val)
loadFromId(id)
findOne(query)
find(query)
getIds(query)

## Utils Static Methods

generateToken(length)
generateMock()
getUUID()

## Syncing

Support for slow sync with a Postgres or Mongo database is provided;

| Para                  | Descriptions  |
|-----------------------|---------------------------------------------------------|
| mode                  | The sync direction; 'sync', 'postgres-to-redis', 'redis-to-postgres'  |
| indexField            | The index field used in both databases (defaults to 'uuid' or 'uid' if found in the Redis schema) |
| basePostgresQuery     | Allows you to overide so you can sync just a single item   |
| baseRedisQuery        | Allows you to overide so you can sync just a single item |

For example, this would sync a single user from redis to postgress

```js
    let options = {
            mode: 'redis-to-postgres',
            indexField: 'uuid',
            baseRedisQuery: {uid: 'KIWglD3T1tXHMGW2qmvmDy8RXmF3'},
            basePostgresQuery: {userUid: 'KIWglD3T1tXHMGW2qmvmDy8RXmF3'}   
    }
```

sync(PostgresModel)
syncAllToPostgres(PostgresModel, opts)
syncAllToRedis(PostgresModel, opts)
syncAll(PostgresModel, opts)