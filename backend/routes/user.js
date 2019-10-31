const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require(".././models/users");
const transporter = require("../mailer/mailer");
var createError = require('http-errors');
var jwt = require('jsonwebtoken');

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

// router.post("/fb-login", (req,res)=> {
//     User.findOne({"facebookId": req.body.facebookId})
//         .then((user)=> {
//             debugger
//             if(!user){

//                 let fbUser = new User({
//                     username: req.body.username,
//                     email: req.body.email,
//                     facebookId: req.body.facebookId
//                 })

//                 fbUser.save()
//                 .then(user=>{
//                     req.session.user = user
//                     res.json(user)
//                 })
//                 .catch(error=>console.log(error))

//             } else{
//                 req.session.user = user
//                 res.json(user)
//             }
//         })
//         .catch(error=>console.log(error))
// })

router.post("/send-reset", (req,res)=> {
    jwt.sign({email: req.body.email}, process.env.jwtSecret, { expiresIn: 60 * 60 }, function(err, token){
        
        if(err) next(createError(500))        
        else {
                transporter.sendMail({
                from: `"Concerts" <concerts@concerts.com>`, 
                to: req.body.email, 
                subject: 'Reset your password ✔', 
                text: 'Hello world?', 
                html: `<b>Password reset: <a href="http://localhost:3000/auth/reset-password?token=${token}">Reset your password</a></b>` // html body
            })
            .then((result)=> {
                debugger
                res.send("Check Your Email")
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    })
})

router.post("/reset-password", (req,res)=> {
    jwt.verify(req.body.token, process.env.jwtSecret, function(err, token){
        if(err) res.send(err)
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err) res.send(err)
            else {
                User.findOneAndUpdate({email: token.email}, {password: hash})
                .then((result)=> {
                    res.send("updated")
                })
                .catch((err)=> {
                    res.send(err)
                })
            }
        })
    })
})

router.get("/logout", (req, res)=> {
    req.session.destroy();
    res.send("logged out successfully")
})

module.exports = router;