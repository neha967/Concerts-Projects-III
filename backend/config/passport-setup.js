const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const keys = require("./keys");
const User = require("../models/users");

//below 2 functions give access to req.user property that we use later on to check if the user is logged in or not
passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new FacebookStrategy(
        {
    //options for the google strategy
    callbackURL: "/auth/facebook/redirect",
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
    //passport callback function
    console.log("passport callback function fired!");
    console.log(profile);

    //check if user already exists in our db

    User.findOne({facebookId: profile.id}).then((currentUser) => {
        if(currentUser){
            //already exists
            console.log("user is" + currentUser);
            done(null, currentUser);
        } else {
            //create a new user in db
            new User({
                username: profile.displayName,
                facebookId: profile.id,
                email: profile.email,
                password: profile.password,
                thumbnail: profile._json.picture
            }).save().then((newUser) => {
                console.log("new user created:" + newUser);
                done(null, newUser)
            })     
        }
    })  
}
)
);