var express = require('express');
var mongoose = require("./data/connection");
var hbs = require('express-handlebars');
var parser = require('body-parser')

var app = express();

var Meditation = mongoose.model("Meditation");

app.use(parser.json({extended: true}));
app.use("/assets", express.static("public"));
app.set("port", process.env.PORT || 4321)
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "main"
}));

app.get("/api/meditations", function(req, res){
  Meditation.find().then(function(meditations_db){
    res.json(meditations_db)
  })
})

app.post("/api/meditations", function(req, res){
  Meditation.create(req.body).then(function(new_meditation){
    res.json(new_meditation)
  })
})

app.delete("/api/meditations/:_id", function(req, res){
  Meditation.findOneAndRemove(req.params).then(function(){
   res.json({success: true});
 });
});

app.put("/api/meditations/:_id", function(req, res){
  Meditation.findOneAndUpdate(req.params, req.body, {new: true}).then(function(meditation){
    res.json(meditation);
  });
});

app.get("/*", function(req, res){
  res.render("main", {layout:false})
});

app.listen(app.get("port"), function(){
  console.log("'The soul, like the body, accepts by practice whatever habit one wishes it to contact' [Socrates]");
});
