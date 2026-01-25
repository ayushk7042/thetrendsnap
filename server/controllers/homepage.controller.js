// const Homepage = require("../models/Homepage");

// exports.getHomepage = async (req, res) => {
//   const homepage = await Homepage.findOne()
//     .populate("mainTrending subTrending categorySections.category categorySections.trending categorySections.subTrending");

//   res.json(homepage);
// };

// exports.updateHomepage = async (req, res) => {
//   let homepage = await Homepage.findOne();

//   if (!homepage) {
//     homepage = await Homepage.create(req.body);
//   } else {
//     Object.assign(homepage, req.body);
//     await homepage.save();
//   }

//   res.json(homepage);
// };



const Homepage = require("../models/Homepage");
const mongoose = require("mongoose");

exports.getHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOne()
      .populate(
        "mainTrending subTrending categorySections.category categorySections.trending categorySections.subTrending"
      );

    // 👇 IMPORTANT: empty object return karo
    res.json(homepage || {});
  } catch (err) {
    console.error("Get homepage error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateHomepage = async (req, res) => {
  try {
    const data = req.body;

    // 🔒 SAFETY: limit enforcement
    if (data.subTrending?.length > 5) {
      data.subTrending = data.subTrending.slice(0, 5);
    }

    if (Array.isArray(data.categorySections)) {
      data.categorySections = data.categorySections.map(sec => ({
        ...sec,
        subTrending: sec.subTrending?.slice(0, 5) || []
      }));
    }

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create(data);
    } else {
      Object.assign(homepage, data);
      await homepage.save();
    }

    res.json(homepage);
  } catch (err) {
    console.error("Update homepage error:", err);
    res.status(500).json({ message: err.message });
  }
};
