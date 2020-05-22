//jshint esversion:6

// require installed packages
const express = require("express");
const bodyParser = require("body-parser");

// create a new app
const app = express();

// create arrays to store lists
let items = [];
let workItems = [];

// set the ejs engine
app.set("view engine", "ejs");

// use body-parser to get data entered by the user
// use express static to use css on the server
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// make a get request
app.get("/", function(req, res){

    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    
    res.render("list", {listTitle: day, newItemsList:items});
});

// make a post request to add item to the list for work
app.post("/", function(req, res){
    let item = req.body.item;
    
    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
 
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newItemsList: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.post("/work", function(req, res){
    let item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
});

// listen to the server
let port = 3000;
app.listen(port, function(){
    console.log(`The server is running on port ${port}.`);
});
