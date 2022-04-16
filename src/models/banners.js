const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		imageURL: {
			type: String,
            required: true
		},
		clickedURL: {
			type: String,
			required: true
		},
		type:{
			type: String,
		},
        isActive: {
			type: Boolean,
			select: false,
		},
		isDeleted: {
			type: Boolean,
			default: false,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Banner", bannerSchema);;