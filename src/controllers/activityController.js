const Activity = require('../models/Activity');

const OWNER_ID = '1';

const getActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const activities = await Activity.find({ user: OWNER_ID })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ activities });
  } catch (err) {
    next(err);
  }
};

const createActivity = async (req, res, next) => {
  try {
    const { type, description, car, metadata } = req.body;
    const activity = await Activity.create({
      user: OWNER_ID,
      type,
      description,
      car: car ?? null,
      metadata: metadata ?? {},
    });
    res.status(201).json({ activity });
  } catch (err) {
    next(err);
  }
};

module.exports = { getActivities, createActivity };
