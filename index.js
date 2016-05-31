var express = require('express');
var mongoose = require("./data/connection");
var hbs = require('express-handlebars')

var app = express();

var Meditation = mongoose.model("Meditation");

app.use("/assets", express.static("public"));
app.set("port", process.env.PORT || 4321)
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "main"
}));

app.get("/*", function(req, res){
  res.render("main", {layout:false})
});

app.listen(app.get("port"), function(){
  console.log("'The soul, like the body, accepts by practice whatever habit one wishes it to contact' [Socrates]");
});
