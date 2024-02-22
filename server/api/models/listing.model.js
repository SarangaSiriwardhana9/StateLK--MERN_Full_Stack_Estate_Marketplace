import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    NoOfFloors:{
      type: Number,
      
    },
    AgeOfBuilding:{
      type: Number,
      
    },
    WidthOfApproachRoad:{
      type: Number,
     
    },
 AreaOfLand:{
      type: Number,
      
    },
    FloorArea:{
      type: Number,
      
    },

    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
     
    },
    bedrooms: {
      type: Number,
      
    },
    furnished: {
      type: Boolean,
      
    },
    parking: {
      type: Boolean,
      
    },
    type: {
      type: String,
     
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;