const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const Reviews = require("./reviews.js");
const User = require("./user.js");

const listingSchem = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        filename: { 
            type: String,
            // default: "default-image.jpg"  // Optional: You can add a default filename if needed
        },
        url: { 
            type: String, 
            default: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        },
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
}); 

// to delete reviews corresponding to listing
listingSchem.post("findOneAndDelete", async (listing)=>{
    if(listing){
    await Reviews.deleteMany({_id:{$in: listing.reviews}});
    }
});

const listing = mongoose.model("listing",listingSchem);
module.exports = listing;