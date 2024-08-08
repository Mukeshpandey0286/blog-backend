const {Router} = require("express");
const { signUp, signIn } = require("../controller/userController");

const router = Router();

router.post("/signup", signUp)
.post("/signin", signIn)

module.exports = router;