# mongodb_co
node-mongodb-native CURD will return a Promise if no callback passed, and co() returns a promise now, so we can use node-mongodb-native with co nicely.

## Requirement
- Generator
- Promise
- co
- node-mongodb-native

## Usage
```javascript
	co(function*() {
	    var db = yield MongoClient.connect('mongodb://localhost:27017/test');
	    var collection = db.collection("simple_document_insert_collection_with_generators");

	    // Insert document
	    var r = yield collection.insert({
	        hello: 'world ' + new Date().toString()
	    });
	    console.log(r.insertedCount, ' - inserted');

	    // Fetch all document
	    return yield collection.find().toArray();
	}).then(function(docs) {
	    console.log(docs.length, ' - find all');
	}, function(err) {
	    console.error(err.stack);
	});

```