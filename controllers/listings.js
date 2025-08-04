const listing = require("../models/listing");

module.exports.Index = async (req,res)=>{
    const allListing = await listing.find({});
    res.render("./listings/index.ejs",{allListing});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res)=>{
    // console.log('Request Params:', req.params);
    // console.log('Request Body:', req.body);
    let {id} = req.params;
    const listingOne = await listing.findById(id).populate({
        path:'reviews',
        populate:{
            path:"author",
        },
    }).populate("owner");
    
    if(!listingOne ){
        req.flash("error","Listing Does Not exist !");
        res.redirect("/listing");
    }
    res.render("listings/show.ejs",{listingOne});
}

module.exports.createListing = async (req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    
    let listingNew = new listing(req.body.listing);
    listingNew.owner = req.user._id;
    listingNew.image = {url, filename};
    await listingNew.save();
    req.flash("success","New Listing created!");
    res.redirect('/listing');
}

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listingOne = await listing.findById(id);
    res.render("./listings/edit.ejs",{listingOne});

    // let originalImage = listingOne.image.url;
    // originalImage = originalImage.replace("/upload", '/upload/h_300, w_250/');
    res.render("./listings/edit.ejs",{listingOne , originalImage}); 
}

module.exports.updateListing = async (req, res) => {
    // console.log('Request Params:', req.params);  // To log the URL params
    // console.log('Request Body:', req.body);  // To log the form data
    const { id } = req.params;
    let updateListing = await listing.findByIdAndUpdate(id,{ ...req.body.listing });

    if(typeof req.file !== 'undefined'){ 
        // console.log('File uploaded:', req.file);  // To log the uploaded file details
        let url = req.file.path;
        let filename = req.file.filename;
        updateListing.image = { url, filename };
        await updateListing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    const deletelisting = await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    console.log(deletelisting);
    res.redirect("/listing");
}