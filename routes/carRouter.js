const router = require("express").Router();

const Car = require("../controller/carController");

const upload = require("../middlewares/uploader");
// const authenticate = require("../middlewares/authenticate");
// const checkRole = require("../middlewares/checkRole");

router.post("/", upload.single("image"), Car.createCar);
router.get("/", Car.getAllCars);
router.get("/:id", Car.getCarById);
router.patch("/:id", upload.single("image"), Car.updateCar);
router.delete("/:id", Car.deleteCar);

module.exports = router;
