import mongoose from "mongoose";

const SuperDealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  auth_id: { type: mongoose.Schema.Types.ObjectId, ref: "signup" },
  type: { type: String },
  dealers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dealer" }],
});

const SuperDealerModel = mongoose.model("SuperDealer", SuperDealerSchema);

export default SuperDealerModel;
