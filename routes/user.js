const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const listing  = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userContoller = require("../controllers/users.js");


//-------------------------- SIGN UP -----------------------------
router.get("/signup",userContoller.renderSignUp);

router.post("/signup", wrapAsync( userContoller.signUp ));

//-------------------------- LOGIN -----------------------
router.get("/login",userContoller.renderLogin);

router.post("/login",saveRedirectUrl,passport.authenticate('local', { failureRedirect:'/login', failureFlash:true }), userContoller.login);

// --------------------------- LOG OUT ----------------------------
router.get("/logout",userContoller.logout);
module.exports = router;