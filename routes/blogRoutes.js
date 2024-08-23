const { Router } = require("express");
const { addBlogs, allBlogs, viewMoreAboutBlog } = require("../controller/blogController");
const { checkForAuthentication, restrictToUser } = require("../middlewares/auth");

const router = Router();

router.get("/", checkForAuthentication, allBlogs);

router.get("/:id", viewMoreAboutBlog);

router.post("/add-new", checkForAuthentication, addBlogs);

module.exports = router;
