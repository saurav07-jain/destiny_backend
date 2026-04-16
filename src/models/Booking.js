const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingFrom: { type: Date, required: [true, 'Booking from date is required'] },
    bookingTo: { type: Date},
    carId: { type: String, required: [true, 'Car is required'] },
    carName: { type: String, required: [true, 'Car name is required'] },
    customerName: { type: String, required: [true, 'Customer name is required'], trim: true },
    customerPhone: { type: String, required: [true, 'Customer phone is required'], trim: true },
    aadharCard: { type: String, default: null },   // base64 or URI
    licenseUpload: { type: String, default: null }, // base64 or URI
    rate: { type: Number, required: [true, 'Rate is required'] },
    amountFinalised: { type: Number, required: [true, 'Amount finalised is required'] },
    amountReceived: { type: Number, default: 0 },
    amountPending: { type: Number, default: 0 },
    description: { type: String, default: '' },
    status: { type: String, enum: ['Booked', 'Journey Completed'], default: 'Booked' },
  },
  { timestamps: true }
);

// Auto-calculate pending amount before save
bookingSchema.pre('save', function (next) {
  this.amountPending = this.amountFinalised - this.amountReceived;
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
