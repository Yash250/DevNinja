const mongoose = require("mongoose");
const crypto = require("crypto");
// const { DataExchange } = require("aws-sdk");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is a required field"],
        },
        email: {
            type: String,
            required: [true, "Email is a required field"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is a required field"]
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            lowercase: true,
        },
        phone: {
            type: String,
        },
        country: {
            type: String,
        },
        dob: {
            type: {
                day: {
                    type: Number,
                    required: true,
                },
                month: {
                    type: Number,
                    required: true,
                },
                year: {
                    type: Number,
                    required: true,
                },
            },
        },
        cart: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ProductVariant",
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
            select: false,
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

module.exports =  mongoose.model("User", userSchema);;
