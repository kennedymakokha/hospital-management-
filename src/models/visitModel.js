import mongoose from "mongoose";

const Schema = mongoose.Schema;
const VisitSchema = new Schema({
    doctor_id: { type: Schema.Types.ObjectId, ref: 'user' },
    user_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const visit = mongoose.model('visit', VisitSchema);
export default visit