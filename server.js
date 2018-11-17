require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var passport     = require('passport');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var app = express();
var PORT = process.env.PORT || 8080;

//
var db = require("./models");

require('./config/passport')(passport);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.use(express.static("public"));

app.use(session({
    key: 'user_sid',
    secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require("./controllers/account-controller")(app, passport);
require("./controllers/alt-html-routes-alt")(app, passport);

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("Listening on localhost:" + PORT);
    })
})