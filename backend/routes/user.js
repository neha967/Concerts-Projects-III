const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require(".././models/users");
const Favorites = require("../models/favorites");
const passport = require("passport");

router.post("/signup", (req,res,next) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    if(username === "" || email === "" || password === ""){
        res.json({
            message: "Give credentials to signup"
        })
        return;
    }

    User.findOne({"email": email})
    .then(user => {
        if(user !== null) {
            res.json({
                message: "Email exists"
            })
            return;
        }
        let newUser = new User({
            username,
            email,
            password: hashPass
        });
    
        newUser.save()
        .then(user => {
            req.session.user = user
            res.json(user)            
        })
    })
    .catch(error => {
        console.log(error)
    })
})

router.post("/login", (req,res,next) => {

    let email = req.body.email;
    let password = req.body.password;

    if(email === "" || password === ""){
        res.json({
            message: "Indicate credentials to login"
        })
        return;
    }

    User.findOne({"email": email})
    .then(user => {
        if(!user){
            res.json({
                message: "Email does not exist"
            })
            return;
        }
        
        if(bcrypt.compareSync(password, user.password)){
            req.session.user = user;
            res.json(user)
        } else {
            res.json({
                message: "Invalid credentials"
            })
        }
    })
})

router.get("/add/:userId", (req,res,next)=>{
    debugger
    let newFavorite = new Favorites ({
        image: req.query.image,
        artistName: req.query.artistName,
        venueName: req.query.venueName,
        artistId: req.query.artistId,
        eventId: req.query.eventId,
        userId: req.params.userId
    })


    newFavorite.save()
    .then(favorite=>{
        res.json(favorite)
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/favorites/:userId", (req,res,next)=>{
    Favorites.find({userId: req.params.userId})
    .then(favorites=>{
        res.json(favorites)
    })
    .catch(error=>{
        console.log(error)
    })
})

router.post("/favorites/delete/:userId/:eventId", (req,res,next)=>{
    Favorites.findOneAndDelete({userId: req.params.userId, eventId: req.params.eventId})
    .then(()=>{
        Favorites.find({userId: req.params.userId})
        .then(favorites=>{
            res.json(favorites)
        })
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/facebook", passport.authenticate("facebook", {
    scope: ["profile"]
}))

//call back route for google to redirect to
router.get("/google/redirect", passport.authenticate("facebook", { failureRedirect: '/login' }), (req, res) => {
//redirect to home page
    res.redirect("/home")
})


router.get("/logout", (req, res)=> {
    req.session.destroy();
    res.send("logged out successfully")
})

module.exports = router;