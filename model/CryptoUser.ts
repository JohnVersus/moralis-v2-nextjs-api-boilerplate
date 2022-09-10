import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    chainId: {
      type: Number,
      required: true,
      unique: false,
    },
    signature: {
      type: String,
      required: true,
      unique: true,
    },
    profileId: {
      type: String,
      required: true,
      unique: true,
    },
    expirationTime: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const CryptoUser =
  mongoose.models.CryptoUser || mongoose.model("CryptoUser", UserSchema);

export default CryptoUser;
