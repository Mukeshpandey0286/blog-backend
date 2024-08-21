const {Router} = require("express");
const { signUp, signIn, getProfile, updateProfile } = require("../controller/userController");
const { checkForAuthentication } = require("../middlewares/auth");

const router = Router();

router.post("/signup", signUp)
.post("/signin", signIn)
.get("/profile",checkForAuthentication, getProfile)
.patch("/profile-update",checkForAuthentication, updateProfile)

module.exports = router;
