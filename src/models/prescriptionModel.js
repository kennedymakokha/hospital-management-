import mongoose from "mongoose";

const Schema = mongoose.Schema;
const prescriptionSchema = new Schema({

    deletedAt: { type: Date, default: null },
    drugs: [
        {
            drug_id: { type: Schema.Types.ObjectId, ref: 'medications' },
            dosage: { type: String },
            name: { type: String }
        }
    ],
    patient_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    details: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });
const prescription = mongoose.model('prescription', prescriptionSchema);
export default prescription