const router = require("express").Router();

const Car = require("../controller/carController");

const upload = require("../middlewares/uploader");

const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post(
  "/",
  authenticate,
  checkRole(["Super Admin", "Admin"]),
  upload.single("image"),
  Car.createCar
);
router.get("/", authenticate, Car.getAllCars);
router.get("/:id", authenticate, Car.getCarById);
router.patch(
  "/:id",
  authenticate,
  checkRole(["Super Admin", "Admin"]),
  upload.single("image"),
  Car.updateCar
);
router.delete(
  "/:id",
  authenticate,
  checkRole(["Super Admin", "Admin"]),
  Car.deleteCar
);

module.exports = router;
