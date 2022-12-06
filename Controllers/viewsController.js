const { reset } = require("nodemon");
const jwt = require("jsonwebtoken");


exports.getIndex = (req, res) => {
    res.status(200).render('index');
}

exports.upload = (req, res) => {
    // console.log(req.cookies.jwt);
    res.status(200).render('addfiles');
}

exports.dashboard = (req, res) => {
    
    let token;
        let errors = [];
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            errors.push({message: "You are not logged in!, Please log in to get access."});
        }
        res.status(200).render('dashboard');

}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    req.flash("success_msg", "You have logged out");
    res.status(200).render('login');
}

exports.login = (req, res) => {
    console.log(req.cookies.jwt);
    res.status(200).render('login');
}


exports.resetPassword = (req, res) => {
    res.status(200).render('resetPassword');
}
exports.signUp = (req, res) => {
    res.status(200).render('signUp');
}