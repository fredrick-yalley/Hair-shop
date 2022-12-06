const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/userModel");

const Users = require('./../models/userModel');


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}




exports.signUp = async(req, res) => {
    try{
        const newUser = await {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        };
    
        let errors = [];

        if(!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password || !newUser.password2) {
            errors.push({message: "Please fill in all the fields"});
        }
        
        if(newUser.password.length < 6) {
            errors.push({message: "Password is too short"});
        }

        if(newUser.password !== newUser.password2) {
            errors.push({message: "Password doesnt match"});
        }

        if(errors.length > 0) {
            res.status(400).render('signUp', {errors});
        }else {
            const hashedPassword = await bcrypt.hash(newUser.password, 10);

            await User.findOne({ where: { email: newUser.email } })
            .then((user => {
                console.log(user);
                if(user !== null) {
                    errors.push({ message: "Email already exist"});
                    res.render("signUp", {errors});
                }else {
                     User.create({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        password: hashedPassword,
                     });

                     const token = signToken(newUser.email);
                        console.log(token);
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        };
                        if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
                        res.session('jwt', token, cookieOptions);
                    
        
                     newUser.password = undefined;
        
                        console.log(user);
                        req.flash("success_msg", "You are now registered. Please log in");
                        res.redirect("/users/login");
                }
            })).catch(err => {

            })
            
            // pool.query(`SELECT * FROM users WHERE email = $1`, [newUser.email], (err, results) => {
            // if(err) {
            //     throw err.message;
            // }
            // console.log(results.rows);

            // if(results.rows.length > 0) {
            //     errors.push({ message: "Email already exist"});
            //     res.render("signUp", {errors});
            // } else {
            //     pool.query(
            //         `INSERT INTO users (firstname, lastname, email, password)
            //         VALUES ($1, $2, $3, $4) RETURNING email, password`, [newUser.firstName, newUser.lastName, newUser.email, hashedPassword],
            //         (err, results) => {
            //             if(err) {
            //                 throw err.message;
            //             }

            //             const token = signToken(newUser.email);
            //             console.log(token);
            //             const cookieOptions = {
            //                 expires: new Date(
            //                     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 * 60 * 60 * 1000
            //                 ),
            //                 httpOnly: true
            //             };
            //             if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
            //             res.cookie('jwt', token, cookieOptions);
                    
        
            //          newUser.password = undefined;
        
            //             console.log(results.rows);
            //             req.flash("success_msg", "You are now registered. Please log in");
            //             res.redirect("/users/login");
            //         }
            //     )
            }

            
    

        
    }catch(err) {
        res.status(400).render('signUp', { err});
        console.log(err.message);
    }
}




exports.login = async(req, res) => {
    try {
        const currentUser = await {
            email: req.body.email,
            password: req.body.password
        }
        console.log(currentUser.password);
        let errors = [];

        
            if(!currentUser.email || !currentUser.password) {
                errors.push({message: "Please provide your email and password"});
                res.render('login', {errors});
            }else {
                await Users.findOne({where: {email: currentUser.email}})
                .then(( async (user) => {
                    console.log(user);
                    if(user == null) {
                        errors.push({message: "You are not a user, please register"});
                        res.render('login', {errors});
                    }else {
                        if(await bcrypt.compare(currentUser.password, user.password)) { 
                            
                            const token = signToken(currentUser.email);
                            console.log(token);
                            const cookieOptions = {
                                expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 * 60 * 60 * 1000
                                ),
                            };
                            if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
                            res.cookie('jwt', token, cookieOptions);
                            currentUser.password = undefined;
    
                            res.status(200).render("dashboard");
                        
                        }else {
                            errors.push({message: "Password is incorrect"});
                           
                            res.status(400).render("login", {errors});
                        }
    
                    }
                })).catch(err => {
    
                })
    
    
                // await pool.query(`SELECT * FROM users WHERE email = $1`, [user.email], async(err, results) => {
                //     if(err) {
                //         throw err;
                //     }
                //         console.log(results.rows)
                //     if(results.rows.length < 1) {
                //         errors.push({message: "You are not a user, please register"});
                //         res.render('login', {errors});
                //     }else {
                //         if(await bcrypt.compare(user.password, results.rows[0].password)) { 
                            
                //             const token = signToken(user.email);
                //             console.log(token);
                //             const cookieOptions = {
                //                 expires: new Date(
                //                     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 * 60 * 60 * 1000
                //                 ),
                //                 httpOnly: true
                //             };
                //             if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
                //             res.cookie('jwt', token, cookieOptions);
                //             user.password = undefined;
    
                            // verifying login token to grant access to dashboard
                            // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                            //     token = req.headers.authorization.split(' ')[1];
                            // }
                    
                            // if(!token) {
                            //     errors.push({message: "You are not logged in!, Please log in to get access."});
                            // }
                    
                    
                            // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
                            // console.log(decoded);
                            
                            // if(!decoded.id) {
                            //     errors.push({message: "The user belonging to this token no longer exist."})
    
                            // }else {
                            //     const username = results.rows[0].firstname;
                            //     console.log(username);
                            //     res.status(200).redirect("/users/dashboard");
                            // }
                        
                        // }else {
                        //     errors.push({message: "Password is incorrect"});
                           
                        //     res.status(400).render("login", {errors});
                        // }
                    
        }

        
    
    

    }catch(err) {
        res.status(400).render('login');
    }
}


