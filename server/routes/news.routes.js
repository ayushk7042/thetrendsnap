const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  getNewsBySlug,
  updateNews,
  deleteNews
} = require("../controllers/news.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

// Public
router.get("/", getNews);
router.get("/:slug", getNewsBySlug);

// Admin
router.post(
  "/", 
  authMiddleware,    
  adminMiddleware("canPublish"),
  createNews
);

// router.put(
//   "/:id",
//   authMiddleware,
//   adminMiddleware("canPublish"),
//   updateNews
// );


router.put(
  "/:slug",
  authMiddleware,
  adminMiddleware("canPublish"),
  updateNews
);


router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware("canDelete"),
  deleteNews
);

module.exports = router;
