const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

  slug: {
    type: String,
    unique: true,
    index: true
  },

  description: String,

  icon: String,

  seoTitle: String,
  seoDescription: String,

  showOnHome: {
    type: Boolean,
    default: true
  },

  maxSubTrending: {
    type: Number,
    default: 5 // 🔥 tumhari requirement
  },

  order: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  // 🤖 AUTO UPDATE CONTROL (ADMIN)
  autoUpdateEnabled: {
    type: Boolean,
    default: false
  },

  dailyAutoUpdateLimit: {
    type: Number,
    default: 10 // admin category-wise set karega
  },



}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
