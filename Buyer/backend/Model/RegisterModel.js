const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    title: String,
    description: String,
    industry: String,
    category: String,
    space :String,
    state :String,
    district:String,
    investmentrange: {
        min: Number,
        max: Number
    },
    role: {  // Update role to accept an object with "dealer" and "franchise"
        dealer: { type: Boolean, default: false },
        franchise: { type: Boolean, default: false },
        wholesaler: { type: Boolean, default: false },
        stockist: { type: Boolean, default: false },
        distributor: { type: Boolean, default: false },
        agency: { type: Boolean, default: false },
        retailer: { type: Boolean, default: false },
        BusinessBuyOuts: { type: Boolean, default: false },
        InvestPartners: { type: Boolean, default: false },
        SharePartners: { type: Boolean, default: false },
        WorkingPartners: { type: Boolean, default: false },
        ShareBuyers: { type: Boolean, default: false },
        SeedFunders : { type: Boolean, default: false },
        VentureCapitals: { type: Boolean, default: false }
    },
    revenue:String,
    duration:String,
    numberhide:Boolean,
    approve:Boolean
});

const RegisterModel = mongoose.model("register", RegisterSchema);

module.exports = RegisterModel;
