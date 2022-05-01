const express = require("express");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../models/user");
const {isLoggedIn, isLoggedOut} = require("../middleware/auth.js");

// sign-in
router.get("/sign-in", isLoggedOut, (req, res) => {
    res.render("./auth/signin.ejs");
});

router.post("/sign-in", isLoggedOut, (req, res, next) => {
    passport.authenticate("local", {
        successRedirect : "/",
        failureRedirect : "/sign-in",
        failureFlash : true
    })(req, res, next);
});

// sign-up
router.get("/sign-up", isLoggedOut, (req, res) => {
    res.render("./auth/signup.ejs");
});

router.post("/sign-up", isLoggedOut, async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    // Add validation
    let errors = [];
    

    if(!name || !email || !password) {
        errors.push({msg: "Please enter all fields"});
    }
    if(password.length < 6) {
        errors.push({msg: "Password should be at least 6 characters"});
    }
    if(errors.length > 0) {
        res.render("./auth/signup.ejs", {errors: errors, name, email, password});
    }
    else{
        console.log(name);
        console.log(email);
        User.findOne({email: email}).then(user => {
            if(user) {
                errors.push({msg: "Email already exists"});
                res.render("./auth/signup.ejs", {errors: errors, name, email, password});
            }
            else{
                const newUser = new User({
                    name: name,
                    email : email,
                    password : password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) 
                            throw err;
                        newUser.password = hash;
                        
                        newUser.save().then(user => {
                            req.flash("success_msg", "Welcome onboard!");
                            res.redirect("/sign-up");
                        }).catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

router.get("/sign-out", isLoggedIn,(req,res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/sign-in");
});

module.exports = router;