const { CLIENT_RENEG_WINDOW } = require("tls");

const Users = require('./../models/userModel');

exports.getAllUsers = async(req, res) => {
    try{

         await Users.findAll()
        .then((users) => {
            console.log(users)
            res.status(200).json({data: users});
        })
        .catch(err => {console.log(err.message)});
        


        // await pool.query(users, (err, result) => {
        //     if(!err) {
        //         res.send(result.rows);
        //     } else {
        //         console.log(err.message);
        //     }
        //     // pool.end;
        // })
        
    }catch (error) {
        
    }
};

exports.getUser = async(req, res) => {
    try{
        await pool.query(`Select * from users where id=${req.params.id}`, (err, result) => {
            if(!err) {
                res.send(result.rows);
            } else {
                console.log(err.message);
            }
            // pool.end;
        });
    }catch (error) {

    }
}

exports.creatUser = async(req, res) => {
    try{
        const data = {
            firstName: "fredrick",
            lastName: "yalley",
            email: "ff@gmail.com",
            password: 123456
        };

        let {firstName, lastName, email, password} = data;
        await Users.create({
            firstName, 
            lastName,
            email,
            password
        }).then((el) => {
            console.log(el);
            res.json({data: el})
        })
            .catch(err => {console.log(err.messgae)})


        // const user = await req.body;
        // let newUser = `insert into users(first_name, last_name, email, password, passwordConfirm)
        //                 values('${user.first_name}','${user.last_name}','${user.email}',' ${user.password}', '${user.passwordConfirm}')`;
        //  client.query(newUser, (err, result) => {
        //     if(!err) {
        //         res.send('new user created');
        //     } else {
        //         console.log(err.message);
        //     }
        //     client.end;
        // })
    }catch (error) {

    }
};

exports.updateUser = async(req, res) => {
    try {
        const user = await req.body;
        let updatedUser = `update users 
                            set first_name = '${user.first_name}',
                            last_name = '${user.last_name}',
                            email = '${user.email}',
                            password = '${user.password}',
                            passwordConfirm = '${user.passwordConfirm}'
                            where id = ${req.params.id}`
        client.query(updatedUser, (err, result) => {
            if(!err) {
                res.send('User updated successfuly');
            }else {
                console.log(err.message);
            }
            client.end;
        })
    }catch(err) {

    }
};

exports.deletUser = async(req, res) => {
    try {
        const deletedUser = `delete from users where id = ${req.params.id}`;
        await client.query(deletedUser, (err, results) => {
            if(!err) {
                res.send('user removed');
            }else {
                console.log(err.message);
            }
            client.end;
        })
    }catch (err) {

    }
}