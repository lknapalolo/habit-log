var mongoose = require('./connection');
var seedData = require('./meditation')

var Meditation = mongoose.model("Meditation")

Meditation.remove({}).then(function(){
  Meditation.collection.insert(seedData).then(function(){
    process.exit();
  })
});
