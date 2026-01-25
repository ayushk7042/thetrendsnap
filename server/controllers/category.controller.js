const Category = require("../models/Category");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true });

    const category = await Category.create({
      ...req.body,
      slug
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find({ status: "active" }).sort({ order: 1 });
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true });
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};
