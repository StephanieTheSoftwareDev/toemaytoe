//=====*****===== CONFIG Section =====*****=====//
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use(bodyParser.json());

var path = require('path');
app.use( express.static( __dirname + '/client/dist' ));

var mongoose = require('mongoose');
//^^^^^^^^^^^^^^^ END of CONFIG Section ^^^^^^^^^^^^^^^//




//=====*****===== MONGOOSE/DB Section =====*****=====//
mongoose.connect('mongodb://localhost/examDB');
mongoose.Promise = global.Promise;

var RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, "The restaurant name needs to be at least 3 characters in length"], minlength: [3, "Name needs to be at least 3 characters"], unique: [true, "Invalid name"]},
    type: { type: String, required: [true, "The cuisine type needs to be at least 3 characters in length"], minlength: [3, "Type needs to be at least 3 characters"] },
    customer: [{ 
        name:{ type: String, required: [true, "Your name needs to be at least 3 characters in length"], minlength: [3, "Name needs to be at least 3 characters"] },
        stars: { type: String, default:"" },
        review:{ type: String, required: [true, "Your review needs to be longer.. at least 3 characters in length"], minlength: [3, "Review needs to be at least 3 characters"] },
        }]
    
},
    { timestamps: true });

mongoose.model('Restaurant', RestaurantSchema);
var Restaurant = mongoose.model('Restaurant')
//^^^^^^^^^^^^^^^ END of MONGOOSE/DB Section ^^^^^^^^^^^^^^^//


//=====*****===== ROUTING Section =====*****=====//

app.post('/newRestaurant', function (req, res) {
    console.log("POST DATA", req.body);
    var restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.type = req.body.type;

    restaurant.save(function (err) {
        //If there are any errors...
        if (err) {
            //Log restaurant and errors
            console.log("Errors!", restaurant.errors);
            res.json({ message: "Error", error: restaurant.errors })
        //Otherwise, redirect to /  
        }else {
            console.log('Added a Restaurant!');
            res.json({ message: "Success", data: restaurant })
        }
    })
})


app.get('/homeRestaurants', function (req, res) { 
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            console.log("Error", err);
            res.json({ message: "Error", error: err })

        }else {
            res.json({ message: "Success", data: restaurants })
        }
    })
})


app.put('/editRestaurant/:id', function (req, res) {
    Restaurant.findOne({ _id: req.params.id }, function (err, restaurant) {
        if (restaurant) {
            restaurant.name = req.body.name;
            restaurant.type = req.body.type;

            restaurant.save(function (err) {
                if(err) {
                    console.log("Error!", err);
                    res.json({ message: "Error", error: restaurant.errors })
                }else {
                    console.log("Successfully edited the restaurant!");
                    res.json({ message: "Success", data: restaurant })
                }
            })
        }
    })

})


app.get('/reviewsRestaurant/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Restaurant.findOne({ _id: req.params.id }, function (err, restaurant) {
        if(err) {
            console.log("Error!!", err);
            res.json({ message: "Error", error: err })
        }else {
            console.log('Successfully retrieved a restaurant!');
            res.json({ message: "Success", data: restaurant })
        }
    })
})


app.put('/writeCustomer/:id', function (req, res) {
    Restaurant.findOne({ _id: req.params.id }, function (err, restaurant) {
    restaurant.customer.push(req.body);

    restaurant.save(function (err) {
        //If there are any errors...
        if (err) {
            //Log restaurant and errors
            console.log("Errors!", restaurant.errors);
            res.json({ message: "Error", error: restaurant.errors })
        //Otherwise, redirect to /  
        }else {
            console.log('Added a customer!');
            res.json({ message: "Success", data: restaurant })
        }
    })
    })
})


app.delete('/deleteRestaurant/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Restaurant.remove({ _id: req.params.id }, function (err) {
        if(err) {
            console.log("Error", err);
            res.json({ message: "Error", error: err })
        }else {
            console.log('Successfully deleted a restaurant!');
            res.json({ message: "Success!" })
        }
    })
})
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});
//^^^^^^^^^^^^^^^ END of Section ^^^^^^^^^^^^^^^//




//=====*****===== LISTENER Section =====*****=====//
// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
//^^^^^^^^^^^^^^^ END of LISTENER Section ^^^^^^^^^^^^^^^//