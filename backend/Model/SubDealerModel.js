import mongoose from "mongoose";

const SubDealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  auth_id: { type: mongoose.Schema.Types.ObjectId, ref: "signup" },
  phone: { type: String },
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: "Dealer" }, // Link to Dealer
  type: { type: String },
});

const SubDealerModel = mongoose.model("SubDealer", SubDealerSchema);

export default SubDealerModel;
