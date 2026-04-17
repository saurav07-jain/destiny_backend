const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    car: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ['rental', 'service', 'review', 'added', 'status_change', 'booking_deleted'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
