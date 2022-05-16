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


const app = express();

const PORT = process.env.PORT

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
    app.listen(5000, ()=>{
        console.log('App is listening on port 5000')
    });
})
.catch((error)=>{
    console.log(error);
});


app.get('/signup',(req,res)=>{
    console.log(req.session);
    req.session.save(()=>{
        console.log('done');
    })
    res.render('signup')
});

app.get('/signin',(req,res)=>{
    res.render('signin')
})

app.post('/signup',async(req,res)=>{
    const {username, email, password} = req.body;
    console.log(req.body);
    let user =  User.findOne({ email })
    try {
        if (user){
            try {
                const saltRounds = 10;
                const {username, email, password} = req.body;
    
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password,salt)
                
                // newUser = new User({username, email, hash});
                const newUser = new User({
                   username: username,
                   email: email,
                   password: hashedPassword, 
                });
                result = await newUser.save();
                console.log('saved');
                res.redirect('/signin');
                 }
            catch{
                console.log("trial failed");
                console.log(error);
                 }
        }else{
            res.redirect('/about');
        }
    } catch (error) {
       console.log('error'); 
    }
}); 

app.post('/signin',async(req,res)=>{
    const {email, password} = req.body;
    console.log(req.body);
    console.log(password);

    
    let user =  await User.findOne({email}) 
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        
            console.log(validPassword);
            if (email == user.email && validPassword) {
                // This is where express session takes over to help me save my session


                req.session.regenerate(function (err) {
                    if (err) next(err)
                
                    // store user information in session, typically a user id
                    console.log(req.body);
                    req.session.user =user.username
                
                    console.log(req.session);
                    req.session.save(function (err) {
                      if (err) 
                      return console.log(err)
                      res.redirect('/')
                    })
                  })



                // Express session should have saved my session by now
            } else {
                res.redirect('/signin')
            }   
    } else {
        res.redirect('/signup')
    } 


});



   
                           

// app.use(userRouter);
                       
// Route tp everything related to out post
app.use("/posts", postRouter);


 // Router for everythng relating to our home
app.use(mainRouter);
