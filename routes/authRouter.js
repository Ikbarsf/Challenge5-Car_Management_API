const router = require("express").Router();

const Auth = require("../controller/authController");
const Token = require("../middlewares/checkToken");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/token", Token, Auth.checktoken);
router.post(
  "/addAdmin",
  autentikasi,
  checkRole(["Super Admin"]),
  Auth.register
);

module.exports = router;
