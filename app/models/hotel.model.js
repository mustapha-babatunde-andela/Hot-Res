// import the mongoose module
var mongoose = require('mongoose');

// create a mongoose object
var Schema = mongoose.Schema;

/* 
  instantiate a mongoose schema object to store
  meta info of database object
*/
var hotelSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    rating: { type: Number },
    roomClass: [ { roomClass: { type: String }, costPerNight: { type: Number } } ],
    reviews: [ { name: { type: String }, review: { type: String }, starRating: { type: Number } } ],
    averageRating: { type: Number },
    profilePicture: { type: String },
    photoGallery: [ { type: String } ],
    amenities: [ { type: String } ],
    foodsAvailable: [ { type: String } ],
    drinksAvailable: [ { type: String } ],
    closeLandmarks: [ { type: String } ],
    description: { type: String }
});

module.exports = mongoose.model('Hotel', hotelSchema);