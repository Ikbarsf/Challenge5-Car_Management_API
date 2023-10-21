const router = require("express").Router();

const User = require("../controller/userController");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get("/", User.getAllUsers);
router.get("/:id", User.getUserById);
router.patch("/:id", autentikasi, checkRole("Super Admin"), User.editUser);
router.delete("/:id", autentikasi, checkRole("Super Admin"), User.removeUser);

module.exports = router;
