import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  address: {
    type: String,
  },
  deliveryPartner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
    },
  ],
});

const Branch = mongoose.model("Branch", branchSchema);

export default Branch