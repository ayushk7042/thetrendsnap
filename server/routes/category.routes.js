const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

// Public
router.get("/", getCategories);

// Admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware("canPublish"),
  createCategory
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware("canPublish"),
  updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware("canDelete"),
  deleteCategory
);

module.exports = router;
