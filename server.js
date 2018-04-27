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

var MovieSchema = new mongoose.Schema({
    name: { type: String, required: [true, "The movie title needs to be at least 3 characters in length"], minlength: [3, "Movie title needs to be at least 3 characters"], unique: [true, "This movie already exists in the database!"]},
    movie_review: [{ 
        name:{ type: String, required: [true, "Your name needs to be at least 3 characters in length"], minlength: [3, "Name needs to be at least 3 characters"] },
        stars: { type: String, default:"1", required: [true, "You need to give a star rating!"] },
        review:{ type: String, required: [true, "Your review needs to be longer.. at least 3 characters in length"], minlength: [3, "Review needs to be at least 3 characters"] },
        }]
    
},
    { timestamps: true });

mongoose.model('Movie', MovieSchema);
var Movie = mongoose.model('Movie')
//^^^^^^^^^^^^^^^ END of MONGOOSE/DB Section ^^^^^^^^^^^^^^^//


//=====*****===== ROUTING Section =====*****=====//

app.post('/newMovie', function (req, res) {
    console.log("POST DATA", req.body);
    var movie = new Movie();
    movie.name = req.body.name;
    movie.movie_review = req.body.movie_review;

    movie.save(function (err) {
        //If there are any errors...
        if (err) {
            //Log restaurant and errors
            console.log("Errors!", movie.errors);
            res.json({ message: "Error", error: movie.errors })
        //Otherwise, redirect to /  
        }else {
            console.log('Added a Movie!');
            res.json({ message: "Success", data: movie })
        }
    })
})


app.get('/homeMovies', function (req, res) { 
    Movie.find({}, function (err, movies) {
        if (err) {
            console.log("Error", err);
            res.json({ message: "Error", error: err })

        }else {
            res.json({ message: "Success", data: movies })
        }
    })
})


app.put('/editMovie/:id', function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        if (movie) {
            movie.name = req.body.name;

            movie.save(function (err) {
                if(err) {
                    console.log("Error!", err);
                    res.json({ message: "Error", error: movie.errors })
                }else {
                    console.log("Successfully edited the movie!");
                    res.json({ message: "Success", data: movie })
                }
            })
        }
    })

})


app.get('/reviewsMovie/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        if(err) {
            console.log("Error!!", err);
            res.json({ message: "Error", error: err })
        }else {
            console.log('Successfully retrieved a movie!');
            res.json({ message: "Success", data: movie })
        }
    })
})


app.put('/writeMovieReview/:id', function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        movie.movie_review.push(req.body);

        movie.save(function (err) {
        //If there are any errors...
        if (err) {
            //Log restaurant and errors
            console.log("Errors!", movie.errors);
            res.json({ message: "Error", error: movie.errors })
        //Otherwise, redirect to /  
        }else {
            console.log('Added a movie review!');
            res.json({ message: "Success", data: movie })
        }
    })
    })
})


app.delete('/deleteMovie/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Movie.remove({ _id: req.params.id }, function (err) {
        if(err) {
            console.log("Error", err);
            res.json({ message: "Error", error: err })
        }else {
            console.log('Successfully deleted a movie!');
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