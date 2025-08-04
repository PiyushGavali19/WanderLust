const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../joiSchema.js");
const Review = require("../models/reviews.js");
const listing  = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewsControllers = require("../controllers/reviews.js");


//-------------------------------------------- REVIEWS -----------------------------------------------------

//--------------------POST Review Route--------------------
router.post('/',isLoggedIn,validateReview, wrapAsync( reviewsControllers.createReview));

//-----------------------------------DELETE Review Route--------------------------------
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync( reviewsControllers.deleteReview));

module.exports = router;