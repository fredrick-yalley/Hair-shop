const express = require('express');
const app = express();
const router = express.Router();
const viewsController = require('../Controllers/viewsController');
const authController = require('../Controllers/authController');
// const passport =require("passport");

// const initializePassport =require("./../passportConfig");

// initializePassport(passport);

// app.use(passport.initialize());
// app.use(passport.session());


// router.post("/users/login",
//     passport.authenticate("local", {
//         successRedirect: "/users/dashboard",
//         failureRedirect: "/users/login",
//         failureFlash: true
//     }))

// function checkAuthenticated(req, res, next) {
//     if(req.isAuthenticated) {
//         return res.redirect("/users/dashboard");
//     }
//     next();
// }

// function checkNotAuthenticated(req, res, next) {
//     if(req.isAuthenticated) {
//         return next();
//     }

//     res.redirect("/users/login");
// }

router
.route('/')
.get(viewsController.getIndex);
router.get('/users/upload', viewsController.upload);




router.get('/users/login', viewsController.login);
router.get('/users/signUp', viewsController.signUp);
router.get('/resetPassword', viewsController.resetPassword);
router.get('/users/logout', viewsController.logout);
router.get("/users/dashboard",  viewsController.dashboard);


// router.get("/users/logout", (req, res) => {
//     req.logOut;
//     req.flash("success_msg", "You have logged out");
//     res.redirect("/users/login");
// });



 

module.exports = router;