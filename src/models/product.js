const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    imageUrl: String,
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    variants: [
      {
        params: Object,
        color: String,
        sku: String,
        price: Number,
        inStock: Boolean,
        qty: Number
      },
    ],
    inStock: {
      type: Boolean,
      default: false
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);
