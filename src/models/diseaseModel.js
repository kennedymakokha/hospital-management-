import mongoose from "mongoose";

const Schema = mongoose.Schema;
const testSchema = new Schema({
    name: { type: String, },
   
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const test = mongoose.model('test', testSchema);
export default test