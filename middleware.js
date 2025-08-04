const listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./joiSchema.js");  


module.exports.isLoggedIn = (req,res,next)=>{
    console.dir(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    const { id } = req.params;
    let Listing = await listing.findById(id);
    if(!Listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you do not have permission to do that !");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
  



//---------------------------------validate listing-----------------------------------
module.exports.validateListing = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

//--------------------------validate Review----------------------------
module.exports.validateReview = (req,res,next)=>{
    const{error} = reviewSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.isReviewAuthor = async (req,res,next)=>{
    const { id, reviewId } = req.params;
    let rev = await Review.findById(reviewId);
    if(!rev.author.equals(res.locals.currUser._id)){
        req.flash("error", "you do not have permission to do that !");
        return res.redirect(`/listing/${id}`);
    }
    next();
};