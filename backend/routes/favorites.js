const express = require("express");
const router = express.Router();
const Favorites = require("../models/favorites");

router.get("/favorites/hover/:eventId", (req,res)=>{
    Favorites.find({eventId: req.params.eventId})
    .populate("userId")
    .then(favorites=>{
        res.json(favorites)
    })
    .catch(error=>console.log(error))
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

router.get("/add/:userId", (req,res,next)=>{

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

module.exports = router;