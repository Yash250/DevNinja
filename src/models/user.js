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
        dob: String,
        cart: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                color:String,
                qty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        shippingAddress: [
            {
                country: { type: String},
                firstName : { type: String},
                lastName : { type: String},
                company: { type: String},
                add1: { type: String},
                add2: { type: String},
                city: { type: String},
                pinCode: { type: String},
                state: { type: String},
                phone: { type: String},
                isDefault : {
                    type: Boolean,
                    default: false
                }
            }
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
