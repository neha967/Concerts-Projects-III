const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    image: String,
    artistName: String,
    venueName: String,
    artistId: Number,
    eventId: Number,
    userId: {type: Schema.Types.ObjectId, ref: "User"}
});

const Favorites = mongoose.model("Favorites", FavoriteSchema);

module.exports = Favorites;