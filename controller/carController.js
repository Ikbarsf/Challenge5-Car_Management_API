const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const getAllCars = async (req, res, next) => {
  try {
    const Cars = await Car.findAll();
    res.status(200).json({
      status: "Success",
      data: {
        Cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "Success",
      data: {
        car,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createCar = async (req, res, next) => {
  const { name, price, category, description } = req.body;
  const file = req.file;

  console.log("check", file);
  try {
    //dapatkan extension filenya
    const split = file.originalname.split(`.`);
    const extension = split[split.length - 1];
    //upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    const newCar = await Car.create({
      name,
      price,
      category,
      description,
      imageUrl: img.url,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateCar = async (req, res, next) => {
  const { name, price, category, description } = req.body;
  const file = req.file;

  try {
    //dapatkan extension filenya
    const split = file.originalname.split(`.`);
    const extension = split[split.length - 1];
    //upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    await Car.update(
      {
        name,
        price,
        category,
        description,
        imageUrl: img.url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const Cars = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!Cars) {
      next(new ApiError("Car id tersebut gak ada", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: `Berhasil menghapus data`,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
