db.food_records.find({},{
    'name':1,
    'beds':1
}).pretty().limit(5);