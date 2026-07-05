import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(

  {

    // ===============================
    // Basic Information
    // ===============================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      enum: [
        "Plot",
        "Villa",
        "Apartment",
        "Farm Land",
        "Commercial",
        "House"
      ],
      default: "Plot",
    },

    category: {
      type: String,
      enum: [
        "Sale",
        "Rent"
      ],
      default: "Sale",
    },

    // ===============================
    // Price
    // ===============================

    pricePerSqft: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    area: {
      type: Number,
      required: true,
    },

    areaUnit: {
      type: String,
      default: "Sq.ft"
    },

    // ===============================
    // Location
    // ===============================

    location: {

      address: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },

      latitude: {
        type: Number,
        default: 0,
      },

      longitude: {
        type: Number,
        default: 0,
      },

      googleMap: {
        type: String,
        default: "",
      }

    },

    // ===============================
    // Description
    // ===============================

    description: {
      type: String,
      default: "",
    },

    // ===============================
    // Amenities
    // ===============================

    amenities: [
      {
        type: String,
      }
    ],

    // ===============================
    // Nearby Places
    // ===============================

    nearbyPlaces: [
      {
        type: String,
      }
    ],

    // ===============================
    // Office Details
    // ===============================

    office: {

      phone: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      }

    },

    // ===============================
    // Images
    // ===============================

    images: [
      {
        type: String,
      }
    ],

    // ===============================
    // Video
    // ===============================

    video: {
      type: String,
      default: "",
    },

    // ===============================
    // Status
    // ===============================

    status: {
      type: String,
      enum: [
        "Available",
        "Sold",
        "Booked"
      ],
      default: "Available",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Statistics
    // ===============================

    views: {
      type: Number,
      default: 0,
    },

    favorites: {
      type: Number,
      default: 0,
    }

  },

  {
    timestamps: true,
  }

);

export default mongoose.model(
  "Property",
  propertySchema
);