const express = require('express');
const router  = express.Router();
const User  = require("../models/User");
const passport   = require("passport");
const session    = require("express-session");
const cryptowatch = require('cryptowatch')
const ensureLogin = require("connect-ensure-login");
let encryptor = require('simple-encryptor')('imaginethatiwentandgotit');


// BCrypt to encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;

router.get('/signup',(req,res,next)=>{
  
  res.render('auth/signup');
})

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const pubKey = req.body.pubKey;
  const priKey = req.body.priKey;

console.log(username,password, '----------------------------------------')

  if(username ==='' || password===''){
    console.log("you need to enter a username and password");
    res.redirect('/signup')
    return 
  }else{

console.log("We are in the else fool")

  let encrypted = encryptor.encrypt(priKey);

  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
 
User.findOne({ "username": username })
.then(user => {
  if (user !== null) {
      res.redirect("/signup");
      return;
    }
 //--------

console.log("Creating the user here hjkkjh")

 User.create({
  username,
  password: hashPass,
  apikey:pubKey,
  secretKey:encrypted,
}).then((user) => {

console.log("We gonna redirect.....maybe")

  res.redirect("/")


   
}).catch(error => {
  console.log(error);
})
  }).catch(err=>{
    console.log(err)
  });
  }
});


//login Passport Style


router.post("/login", passport.authenticate("local", {
  successRedirect: "/trading",
  failureRedirect: "/trading",
  failureFlash: true,
  passReqToCallback: true
}));


//Logout PassPort Style
router.get('/logout', (req, res, next)=>{
  req.flash('success', "You Have Been Logged Out");

  req.logout();
  res.redirect("/trading");
})




router.get('/profile',ensureLogin.ensureLoggedIn("/trading"),(req,res,next)=>{
  
res.render('user/profile');

})


//---

//Update Api Key
router.post('/profile', (req, res, next)=>{
  const pubKey = req.body.pubKey;
  const priKey = req.body.priKey;

  if(pubKey ==='' || priKey===''){
    console.log("you need to enter a key");
    res.redirect('/profile')
  }else{
  let encrypted = encryptor.encrypt(priKey);
  
  User.findByIdAndUpdate(req.user._id,{

    apikey:pubKey,
    secretKey:encrypted,

  }).then((callback)=>{
    req.flash('success', "Post Was Successfully Updated");

    res.redirect('/profile')
  
}).catch((err)=>{

  console.log(err)

})

}//end of else in if

})

router.post('/deleteaccount',(req,res,next)=>{
  User.findByIdAndDelete(req.user._id).then(()=>{
    
    res.redirect('/trading')

  })
})





module.exports = router;
