const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing  = require("../models/listing.js");
const {isLoggedIn ,isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage })

//-----------------------------Search functionality------------------------------

router.get('/search', async (req, res) => {
  const { query } = req.query;
//   console.log("Search triggered with query:", query);  // ✅ DEBUG

  const listings = await listing.find({
     $or: [
    { title: { $regex: query, $options: 'i' } },
    { location: { $regex: query, $options: 'i' } },
    { description: { $regex: query, $options: 'i' } },
    { country: { $regex: query, $options: 'i' } } 
  ]
  });

//   console.log("Found listings:", listings.length);  // ✅ DEBUG
  res.render('listings/searchResults', { listings, query });
});


//---------------Router routes for listing management-------------------
router.route('/')
.get( wrapAsync(listingController.Index))
.post(isLoggedIn, upload.single('listing[image]'), wrapAsync( listingController.createListing),validateListing);
// .post(isLoggedIn, upload.single('listing[image]'), validateListing,  wrapAsync( listingController.createListing));


//-------------CREATE: NEW ROUTE------------------
router.get('/new',isLoggedIn,listingController.renderNewForm);

router.route('/:id')
.get( wrapAsync( listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync( listingController.updateListing),validateListing,)
.delete(isLoggedIn,isOwner, wrapAsync( listingController.deleteListing));


//------------------------------------------ READ -----------------------------------------
//---------------INDEX ROUTE-------------------
// router.get('/', wrapAsync(listingController.Index));

//-------------CREATE: NEW ROUTE------------------
// router.get('/new',isLoggedIn,listingController.renderNewForm);

// router.post('/',isLoggedIn, validateListing, wrapAsync( listingController.createListing));
//---------------UPDATE: EDIT ROUTE ----------------------
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync( listingController.renderEditForm));

// router.put('/:id',isLoggedIn,isOwner, validateListing, wrapAsync( listingController.updateListing));

//-------------------DELETE------------------------
// router.delete('/:id',isLoggedIn,isOwner, wrapAsync( listingController.deleteListing));

//-------------- READ:SHOW ROUTE -----------------------
// router.get('/:id', wrapAsync( listingController.showListing));

module.exports = router;