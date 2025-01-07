import mongoose from "mongoose";

const DealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  auth_id: { type: mongoose.Schema.Types.ObjectId, ref: "signup" },
  phone: { type: String },
  type: { type: String },
  superDealer: { type: mongoose.Schema.Types.ObjectId, ref: "SuperDealer" }, // Link to Super Dealer
  subDealers: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubDealer" }],
});

const DealerModel = mongoose.model("Dealer", DealerSchema);

export default DealerModel;
