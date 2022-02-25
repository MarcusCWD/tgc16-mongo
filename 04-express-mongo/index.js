require("dotenv").config();
// what happens is that when we do config(), the variable MONGO_URI is palce into the mongo os
// console.log(process.env.MONGO_URI) // got to test dotenv is setup correctly use nodemon and console.log this

// Bring in the mongoclient
const MongoClient = require('mongodb').MongoClient;

// // SETUP
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const axios = require("axios");
const response = require("express");
const MongoClient  = require("mongodb");

// // create the app
const app = express();

// // set the template engine to hbs
app.set("view engine", "hbs"); // 2nd arg is string

// // setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// // static folder
// app.use(express.static("public")); // static files goes into /public

// // enable forms processing
// app.use(express.urlencoded({ extended: false }));

async function main() {
    // connect to the mongodb
    // first arg of the MongoClient.connect() is the URI (or your connection string)
    const client = await MongoClient.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    // SETUP ROUTES
    app.get('/', async function (req, res) {
        const db = client.db('sample_airbnb');// select the sample_airbnb database
       const data = await db.collection('listingsAndReviews') // select the listingsAndReviews collection
                        .find({})
                        .toArray(); // find all documents
        
        res.send(data);
    })
}

// BEGIN SERVER (aka LISTEN)
app.listen(3000, function () {
    console.log("server begins");
  });
  