const router = require("express").Router();

const Auth = require("./authRouter");
const Car = require("./carRouter");

router.use("/api/v1/auth", Auth);
router.use("/api/v1/car", Car);

module.exports = router;
