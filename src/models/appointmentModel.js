import mongoose from "mongoose";

const Schema = mongoose.Schema;
const appointmentsSchema = new Schema({

    deletedAt: { type: Date, default: null },
    appointment_date: { type: Date, default: null },
    reason_not_approved: { type: String },
    patient_id: { type: Schema.Types.ObjectId, ref: 'user' },
    doc_id: { type: Schema.Types.ObjectId, ref: 'user' },
    approved: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });
const appoinments = mongoose.model('appointments', appointmentsSchema);
export default appoinments 