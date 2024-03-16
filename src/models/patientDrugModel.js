import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userdrugSchema = new Schema({

    deletedAt: { type: Date, default: null },
    drug_id: { type: Schema.Types.ObjectId, ref: 'medications' },
    dosage: { type: String },
    patient_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    LabTest_id: { type: Schema.Types.ObjectId, ref: 'lab_results' },
    dispenced: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });
const pd = mongoose.model('patient_drug', userdrugSchema);
export default pd