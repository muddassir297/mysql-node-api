const bcrypt = require('bcryptjs');
const passport = require('passport');
const models = require('../models');
let User = models.User;
// Handle index actions
exports.index = function (req, res) {
    User.findAll().then(users => {
        res.json({
            status: "success",
            message: "users retrieved successfully",
            data: allusers(users)
        });
    }).catch(err =>{
        res.json({
            status: "Failure",
            message: err,
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    let user = new User();
    const fname = req.body.fname ? req.body.fname : user.fname;
    const lname = req.body.lname;
    const gender = req.body.gender;
    const email = req.body.email;
    const phone = req.body.phonenumber;
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    let userRole = "";
    if(username == "muddassir297" && email == "hussainmuddassir297@gmail.com" && fname == "Muddassir" && lname == "Hussain"){
        userRole = "admin";
    }else{
        userRole = "user";
    }

    req.checkBody('fname', 'Name is required').notEmpty();
    req.checkBody('lname', 'Name is required').notEmpty();
    req.checkBody('gender', 'Gender is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('phonenumber', 'Phone is required').notEmpty();    
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    //req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('address', 'Address is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        // res.render('register', {
        //   errors:errors
        // });
        //console.log(`Error! ${errors}`);
        res.send(errors);
        return;
      } else {
        user.fname = fname,
        user.lname = lname,
        user.phone = phone,
        user.email = email,
        user.gender = gender,
        user.username = username,
        user.password = password,
        user.address = address,
        user.role = userRole

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
              if(err){
                //console.log(err);
                res.json({
                    success: false,
                    error: err
                });
              }
              user.password = hash;
              // save the user and check for errors
              user.save().then((user)=>{
                    res.json({
                        status: "200",
                        success:true,
                        message: "New user addedd",
                        data: user
                    });
                }).catch(err => {
                    res.json({
                        success: false,
                        error: err
                    });
                })
            });
          });
      }

    
    };

   
// Handle view user info
exports.view = function (req, res) {
    User.find({
        where: {id:req.params.user_id}
    }).then(user =>{
        res.json({
            message: 'user details loading..',
            data: user
        });
    }).catch(err=>{
        res.send(err);
    })    
};
// Handle update user info
exports.update = function (req, res) {
    User.find({
        where: {id:req.params.user_id}
    }).then(user=>{
        const fname = req.body.fname ? req.body.fname : user.fname;
        const lname = req.body.lname;
        const gender = req.body.gender;
        const email = req.body.email;
        const phone = req.body.phonenumber;
        const username = req.body.username;
        const password = req.body.password;
        const address = req.body.address;
        let userRole = "";
        if(username == "muddassir297" && email == "hussainmuddassir297@gmail.com" && fname == "Muddassir" && lname == "Hussain"){
            userRole = "admin";
        }else{
            userRole = "user";
        }
        req.checkBody('fname', 'Name is required').notEmpty();
        req.checkBody('lname', 'Name is required').notEmpty();
        req.checkBody('gender', 'Gender is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('phonenumber', 'Phone is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        //req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
        req.checkBody('address', 'Address is required').notEmpty();

        let errors = req.validationErrors();

        if(errors){
            // res.render('register', {
            // errors:errors
            // });
            console.log(`Error! ${errors}`);
            res.send(errors);
            return;
        } else {
            user.fname = fname,
            user.lname = lname,
            user.phone = phone,
            user.email = email,
            user.gender = gender,
            user.username = username,
            user.password = password,
            user.address = address,
            user.role = userRole
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                user.password = hash;
                // save the user and check for errors
                user.save().then((user)=>{
                    res.json({
                        status: "success",
                        message: "user updated successfully",
                        data: user
                    });
                }).catch(err=>{
                    res.json({
                        status: "Faliure",
                        message: "user not updated successfully",
                        data: err
                    });
                })
               });
          });
      }
    }).catch(err=>{
        res.send(err);
    })
    
};

// Login Form
// exports.getLogin = function (req, res) {
//     //res.render('login');
// }
  // Login Process
exports.postLogin = function (req, res, next) {
    passport.authenticate('local', function(err, user, info){
        
        //successRedirect:'/api/users',
        // failureRedirect:'/api/login', //uncoment once ui is ready
        // failureFlash: 
        console.log(user)
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (!user) {
            return res.send({status:401, success : false, message : `Authentication failed username or password is incorrect` });
        }
        req.login(user, loginErr => {
            if (loginErr) {
              return next(loginErr);
            }
            return res.send({ status: 200, success : true, message : 'Authentication succeeded',redirectUrl:'/home', 
            username:`${user.username}`, name:`${user.fname}" "${user.lname}`, userRole: user.role});
          });      
        
    })(req, res, next)
}
// logout
exports.logout = function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    return res.send({ status: 200, success : true, message : 'Logged out', redirectUrl:'/login'})
}

// Handle delete user
exports.delete = function (req, res) {
    User.destroy({
        where:{id:req.params.user_id}
    }).then(users=>{
        User.findAll().then(users=>{
            res.json({
                status: "200",
                success:true,
                message: "user deleted succefully",
                data: users
            }); 
        }).catch(err=>{
            res.send(err);
        });
    }).catch(err=>{
        res.send(err);
    });    
};

function allusers(users){
    return user = users.map(person => ({ 
        fname: person.fname, 
        lname: person.lname,
        email: person.email,
        phone: person.phone,
        username: person.username,
        address: person.address,
        gender: person.gender,
        role: person.role,
        date_created: person.createdAt,
        date_updated: person.updatedAt
    }));
}

function userDataFilter(myObject){
    return respData = {
        fname: myObject.fname,
        lname: myObject.lname,
        email: myObject.email,
        phone: myObject.phone,
        username: myObject.username,
        address: myObject.address,
        gender: myObject.gender,
        role: myObject.role,
        date_created: person.createdAt,
        date_updated: person.updatedAt
    }
}