var MongoClient = require('mongodb').MongoClient,
    co = require('co');

var collection;
co(function*() {
    var db = yield MongoClient.connect('mongodb://localhost:27017/test');
    var collection = db.collection("simple_document_insert_collection_with_generators");
    return yield Promise.resolve(collection);
}).then(function(obj) {
    collection = obj;
    console.log(collection.s.dbName, ' collection success');
}, function(err) {
    console.log('collection error');
});


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
