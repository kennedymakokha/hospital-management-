import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PatientSchema = new Schema({
    firstName: { type: String, },
    lastName: { type: String },
    phone: { type: String },
    gender: { type: String },
    email: { type: String },
    dob: { type: Date },
    ID_no: { type: String },
    deletedAt: { type: Date, default: null },
    nextVisit: { type: Date, default: null, },
}, { timestamps: true });
const patient = mongoose.model('patient', PatientSchema);
export default patient