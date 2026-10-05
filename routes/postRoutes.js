const router = require("express").Router();
const { createPost, getPosts } = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);

module.exports = router;