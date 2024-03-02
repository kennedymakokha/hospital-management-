import mongoose from "mongoose";

const Schema = mongoose.Schema;
const symptomsSchema = new Schema({
    symptoms: { type: String },
    deletedAt: { type: Date, default: null },
    test_id: [
        { type: Schema.Types.ObjectId, ref: 'test' }
    ],
    user_id: { type: Schema.Types.ObjectId, ref: 'patient' },
}, { timestamps: true });
const symptoms = mongoose.model('symptoms', symptomsSchema);
export default symptoms