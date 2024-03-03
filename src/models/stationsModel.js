import mongoose from "mongoose";

const Schema = mongoose.Schema;
const StationSchema = new Schema({
    name: { type: String },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const visit = mongoose.model('station', StationSchema);
export default visit