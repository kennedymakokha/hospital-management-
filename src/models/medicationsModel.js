import mongoose from "mongoose";

const Schema = mongoose.Schema;
const medicationSchema = new Schema({
    name: { type: String, },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const Medicine = mongoose.model('medications', medicationSchema);
export default Medicine