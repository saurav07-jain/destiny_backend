const Booking = require('../models/Booking');
const Car = require('../models/Car');
const Activity = require('../models/Activity');

const OWNER_ID = '1';

const getBookings = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { carName: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } },
      ];
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.amountPending = (Number(data.amountFinalised) || 0) - (Number(data.amountReceived) || 0);
    data.status = data.status || 'Booked';

    const booking = await Booking.create(data);

    // Mark car as Rented when booking is created
    if (data.carId) {
      await Car.findByIdAndUpdate(data.carId, { status: 'Rented' });
    }

    res.status(201).json({ booking });
  } catch (err) {
    console.error('createBooking error:', err.message);
    next(err);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const prevStatus = booking.status;
    Object.assign(booking, req.body);
    booking.amountPending = booking.amountFinalised - booking.amountReceived;
    await booking.save();

    // Auto-update car status on booking status change
    if (req.body.status && req.body.status !== prevStatus && booking.carId) {
      if (req.body.status === 'Journey Completed') {
        await Car.findByIdAndUpdate(booking.carId, { status: 'Available' });
      } else if (req.body.status === 'Booked') {
        await Car.findByIdAndUpdate(booking.carId, { status: 'Rented' });
      }
    }

    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Restore car to Available
    if (booking.carId) {
      await Car.findByIdAndUpdate(booking.carId, { status: 'Available' });
    }

    // Log deletion activity
    await Activity.create({
      user: OWNER_ID,
      type: 'booking_deleted',
      description: `Booking deleted · ${booking.customerName} · ${booking.carName}`,
      car: booking.carName,
      metadata: { customerName: booking.customerName, carName: booking.carName },
    });

    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBookings, getBooking, createBooking, updateBooking, deleteBooking };
