const express = require('express')
const multer = require('multer')
const { storage, cloudinary } = require('../cloudinary.js')

const wrapAsync = require('../utils/wrapAsyc.js')
const { isLoggedIn, isOwner, validateListing, isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad } = require('../middleware.js')
const { index, newListingForm, detaileListingPage, addNewListingDetails, editListingPage, updateListingDetails, deleteListing } = require('../controllers/listings.js')


const router = express.Router();
const upload = multer({ storage })

router.route("/")
  //index-page, Get
  .get(wrapAsync(index))
  // add-new-listing-details, Post
  .post(
    isLoggedIn,
    isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad,
    validateListing,
    upload.single('listing[image]'),
    wrapAsync(addNewListingDetails));


//new-listing-form, Get
router.get("/new",
  isLoggedIn,
  isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad,
  newListingForm);

router.route('/:id')
  //detaile-listing-page, Get
  .get(wrapAsync(detaileListingPage))
  // update-listing-details, Put
  .put(
    isLoggedIn,
    isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad,
    isOwner, // yha middleware ek trika s kam isi k kr rha h ---> isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad <--- bcz jab ek hi user lisiting kr rha h to fr owner kable whi hoga n
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(updateListingDetails))
  // delete-listing, Delete
  .delete(
    isLoggedIn,
    isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad,
    isOwner,
    wrapAsync(deleteListing));

// edit-listing-page, Get
router.get("/:id/edit",
  isLoggedIn,
  isVirtual_Catalog_Owner_With_Shayam_Baba_Ashirwad,
  isOwner,
  wrapAsync(editListingPage));





















//index-page, Get
// router.get("/", wrapAsync(index));

//new-listing-form, Get
// router.get("/new", isLoggedIn, newListingForm);

//detaile-listing-page, Get
// router.get("/:id", wrapAsync(detaileListingPage));

// add-new-listing-details, Post
// router.post("/", isLoggedIn, validateListing, wrapAsync(addNewListingDetails))

// edit-listing-page, Get
// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListingPage));

// update-listing-details, Put
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(updateListingDetails));

// delete-listing, Delete
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;