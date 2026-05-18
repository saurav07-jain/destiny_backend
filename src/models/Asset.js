const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ['asset', 'finance'],
      required: true,
    },
    carId: { type: String, default: null },
    carName: { type: String, required: true, trim: true },
    // Fields for 'asset' section
    loanActive: { type: Boolean, default: false },
    valueToday: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    // Fields for 'finance' section
    amountGiven: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);
