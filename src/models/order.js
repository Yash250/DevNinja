const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		purchaseDate: {
			type: String,
			required: true,
			unique: false,
		},
		name: {
			type: String,
			required: true,
			unique: false,
		},
		email: {
			type: String,
			required: true,
			unique: false,
		},
		items: [
			{
				productId: {
					type: String,
					required: true,
					unique: false
				},
				imageURL: {
					type: String,
					required: true,
					unique: false
				},
				title: {
					type: String,
					required: true,
					unique: false
				},
				qty: {
					type: Number,
					required: true,
					unique: false
				},
				price: {
					type: Number,
					required: true,
					unique: false
				},
				color: {
					type: String,
					required: true,
					unique: false
				}
			},
		],
		deliveryStatus: {
			type: String,
			required: true,
			unique: false
		},
		paymentStatus: {
			type: String,
			required: true,
			unique: false
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);;
