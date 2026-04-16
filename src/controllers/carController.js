const Car = require('../models/Car');
const Activity = require('../models/Activity');

const OWNER_ID = '1';

const getCars = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { licensePlate: { $regex: search, $options: 'i' } },
      ];
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json({ cars });
  } catch (err) {
    next(err);
  }
};

const getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ car });
  } catch (err) {
    next(err);
  }
};

const createCar = async (req, res, next) => {
  try {
    const owner = req.body.owner || OWNER_ID;
    const car = await Car.create({ ...req.body, owner });

    await Activity.create({
      user: owner,
      car: car._id,
      type: 'added',
      description: `Added ${car.name} ${car.model} to the fleet`,
    });

    res.status(201).json({ car });
  } catch (err) {
    next(err);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const prevStatus = car.status;
    Object.assign(car, req.body);
    await car.save();

    if (req.body.status && req.body.status !== prevStatus) {
      await Activity.create({
        user: OWNER_ID,
        car: car._id,
        type: 'status_change',
        description: `${car.name} status changed from ${prevStatus} to ${car.status}`,
        metadata: { from: prevStatus, to: car.status },
      });
    }

    res.json({ car });
  } catch (err) {
    next(err);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, owner: OWNER_ID });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCars, getCar, createCar, updateCar, deleteCar };
