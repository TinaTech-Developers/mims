import mongoose, { Schema, Document } from "mongoose";

interface IVehicleData extends Document {
  userId: string;
  vehiclereg: string;
  ownername: string;
  zinarastart: string;
  zinaraend: string;
  expiresIn: string;
  phonenumber: string;
  premium: number;
}

const vehicleDataSchema: Schema<IVehicleData> = new mongoose.Schema({
  userId: { type: String, required: true },
  vehiclereg: { type: String, required: true },
  ownername: { type: String, required: true },
  zinarastart: { type: String, required: true },
  zinaraend: { type: String, required: true },
  expiresIn: { type: String, required: true },
  phonenumber: { type: String, required: true },
  premium: { type: Number, required: true },
});

// Check if the model already exists; if not, create it
const VehicleData =
  mongoose.models.VehicleData ||
  mongoose.model<IVehicleData>("VehicleData", vehicleDataSchema);

export default VehicleData;
