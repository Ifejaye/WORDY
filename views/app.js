const mongoose = require('mongoose'); 
const express = require('express');
const {Post} = require('../models/post');
const {postRouter} = require('../routes/postRoutes');
const {mainRouter} = require('../routes/mainRoutes');


const app = express();

// setting the view engine
app.set('view engine', 'ejs');


// setting our middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}))

//Our dB URI that we copied from the mongoDB
dbURI = 'mongodb+srv://TestUser:testtest@mydb.oefal.mongodb.net/wordy?retryWrites=true&w=majority'

// connecting to our database
mongoose
.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(5000, ()=>{
        console.log('App is listening on port 5000')
    });
})
.catch((error)=>{
    console.log(error);
});

// Route tp everything related to out post
app.use("/posts", postRouter);


 // Router for everythng relating to our home
app.use(mainRouter);

