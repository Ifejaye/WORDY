const mongoose = require('mongoose'); 
const express = require('express');
const {Post} = require('./models/post');
const {User} = require('./models/user');
const session = require('express-session');
const MongodbSession = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const  bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();


const {postRouter} = require('./routes/postRoutes');
const {mainRouter} = require('./routes/mainRoutes');
const { userRouter } = require('./routes/userRoutes');


const app = express();

const PORT = process.env.PORT||5000

// setting the view engine
app.set('view engine', 'ejs');


//Our dB URI that we copied from the mongoDB
dbURI = process.env.MONGO_URI

// setting our middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));


const store = new MongodbSession({
    uri: dbURI,
    collection: "userSessions",
});

app.use(
    session({
        secret: "my access to this whole work",
        resave: true,
        rolling: true,
        saveUninitialized: true,
        store: store,  
    })
);


// connecting to our database
mongoose
.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(PORT, ()=>{
        console.log('App is listening on port 5000')
    });
})
.catch((error)=>{
    console.log(error);
});



// app.use(userRouter);
   
app.use(userRouter)
// Route tp everything related to out post
app.use("/posts", postRouter);


 // Router for everythng relating to our home
app.use(mainRouter);
