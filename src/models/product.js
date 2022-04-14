const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
    },
    variants: [
      {
        params: Object,
        sku: String,
        price: Number,
        inStock: Boolean,
      },
    ],
    qty:  {
      type: Number,
    },
    inStock: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = model('Product', productSchema);
