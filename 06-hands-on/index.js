const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const {
    connect,
    getDB
} = require('./MongoUtil');

const app = express();
app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// for forms to work
app.use(express.urlencoded({
    extended:false
}));

async function main() {
    // connect to the mongodb
    // first arg of the MongoClient.connect() is the URI (or your connection string)
    await connect(process.env.MONGO_URI, "tgc16-shelter")

    // SETUP ROUTES
    app.get('/', async function (req, res) {
        const db = getDB();
        let allAnimal = await db.collection('shelter_records').find({}).toArray();
        res.render('shelter-table.hbs',{
            'shelterAnimal':allAnimal
        })
    })

    app.get('/animal/add', async function(req,res){

        res.render('shelter.hbs',{
        })
    })

    app.post('/animal/add', async function(req,res){
 
        let { animalName, age, type, gender, notes} = req.body;  // <-- object destructuring
       

        // step 2 and 3. insert in the collection
        let db = getDB();
        await db.collection('shelter_records').insertOne({
            'name': animalName,
            'age': age,
            'type': type,
            'gender':gender,
            'notes':notes,
        });
        // res.send("form recieved");
        res.redirect('/'); // instruct the browser to go to the / route
        
    })
}

main();


app.listen(3001, function () {
    console.log("Server has started")
});