const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const items = [];
const workItems = [];
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

  const day = date.getDate();
    res.render("lists", {listTitle: day, newlistitems: items});
});

app.post("/",function(req,res){
  const item = (req.body.Item);
  if(req.body.list == "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }


});
app.post("/work",function(req,res){
  let item = req.body.Item;
  workItems.push(item);
  res.redirect("/")
});

app.get("/work",function(req,res){
  res.render("lists",{listTitle:"Work List",newlistitems: workItems});
});

app.get("/about",function(req,res){
  res.render("about");
});



app.listen(PORT,function(){
  console.log("Server is started on port 3000")
})
