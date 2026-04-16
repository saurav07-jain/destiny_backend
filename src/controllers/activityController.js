const Activity = require('../models/Activity');

const OWNER_ID = '1';

const getActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const activities = await Activity.find({ user: OWNER_ID })
      .populate('car', 'name model licensePlate')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ activities });
  } catch (err) {
    next(err);
  }
};

module.exports = { getActivities };
