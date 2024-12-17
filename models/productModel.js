const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  quantityInStock: { type: Number, required: true, min: 0 },
});

// productSchema.virtual('finalPrice').get(function () {
//   return this.price - (this.price * this.discountPercentage) / 100;
// });

productSchema.set('toJSON', { virtuals: true });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
