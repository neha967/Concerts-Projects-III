const express = require("express");
const router = express.Router();
const User = require(".././models/users");

router.post("/fb-login", (req,res)=> {
    User.findOne({"facebookId": req.body.facebookId})
        .then((user)=> {
            if(!user){

                let fbUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    facebookId: req.body.facebookId
                })

                fbUser.save()
                .then(user=>{
                    req.session.user = user
                    res.json(user)
                })
                .catch(error=>console.log(error))

            } else{
                req.session.user = user
                res.json(user)
            }
        })
        .catch(error=>console.log(error))
})

module.exports = router