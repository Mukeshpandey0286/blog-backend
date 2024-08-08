const {Router} = require("express");
const { addComment, showComment } = require("../controller/commentController");
const { checkForAuthentication } = require("../middlewares/auth");

const router = Router();


router.post("/add-new/:id", checkForAuthentication, addComment);
router.get("/all-comments/:id", showComment);

module.exports = router;