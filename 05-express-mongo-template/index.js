require("dotenv").config();
// what happens is that when we do config(), the variable MONGO_URI is palce into the mongo os
// console.log(process.env.MONGO_URI) // got to test dotenv is setup correctly use nodemon and console.log this

// // SETUP
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const axios = require("axios");
const response = require("express");
const {connect, getDB} = require("./MongoUtil"); // it is an objec with response to the MongoUtil module.exports
// MongoUtil.connect or MongoUtil.getDB

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

    await connect(process.env.MONGO_URI, "sample_airbnb")

    // SETUP ROUTES
    app.get('/', async function (req, res) {
        const data = await getDB().collection('listingsAndReviews') // select the listingsAndReviews collection
            .find({})
            .limit(10)
            .toArray(); // find all documents

        res.send(data);
    })
}

main();

// BEGIN SERVER (aka LISTEN)
app.listen(3000, function () {
    console.log("server begins");
  });
  