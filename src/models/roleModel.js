import mongoose from "mongoose";

const Schema = mongoose.Schema;
const roleSchema = new Schema({
    name: { type: String, },
    display_name: { type: String },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const role = mongoose.model('role', roleSchema);
export default role