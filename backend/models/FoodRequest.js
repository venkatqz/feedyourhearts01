const mongoose = require("mongoose");

const foodRequestSchema = new mongoose.Schema(
  {
    orphanageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orphanage",
      required: true,
    },
    orphanageName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Ensures it's exactly 10 digits
        },
        message: "Invalid phone number.",
      },
    },
    address: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["food", "grocery", "freshGrocery"],
      required: true,
    },
    foodRequired: {
      type: Number,
      required: function () {
        return this.foodType === "food";
      },
    },
    dateTill: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodRequest", foodRequestSchema);
