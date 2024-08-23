const { Router } = require("express");
const { addBlogs, allBlogs, viewMoreAboutBlog } = require("../controller/blogController");
const { checkForAuthentication, restrictToUser } = require("../middlewares/auth");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const router = Router();

router.get("/", checkForAuthentication, allBlogs);

router.get("/:id", viewMoreAboutBlog);

router.post("/add-new", checkForAuthentication, upload.single('coverImage'), addBlogs);

module.exports = router;
