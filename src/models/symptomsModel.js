import mongoose from "mongoose";

const Schema = mongoose.Schema;
const symptomsSchema = new Schema({
    symptoms: { type: String },
    deletedAt: { type: Date, default: null },
    test_id: [
        { type: Schema.Types.ObjectId, ref: 'test' }
    ],
    patient_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    prescription_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });
const symptoms = mongoose.model('symptoms', symptomsSchema);
export default symptoms