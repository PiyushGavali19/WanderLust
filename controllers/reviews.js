const listing  = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createReview = async(req,res)=>{
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
     
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash("success","New Review created!");
    // console.log("new review saved");
    res.redirect(`/listing/${Listing._id}`);
}


module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    const deleteReview = await Review.findByIdAndDelete(reviewId); 
    console.log(deleteReview);
    req.flash("success","Review Deleted!");
    res.redirect(`/listing/${id}`);
}