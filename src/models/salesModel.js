import mongoose from "mongoose";

const Schema = mongoose.Schema;
const salesSchema = new Schema({

    deletedAt: { type: Date, default: null },
    price: { type: Number },
    drug_id: { type: Schema.Types.ObjectId, ref: 'medications' },
    labTest_id: { type: Schema.Types.ObjectId, ref: 'lab_results' },
    patient_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });
const sales = mongoose.model('sales', salesSchema);
export default sales