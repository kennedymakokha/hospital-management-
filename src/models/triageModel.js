import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TriageSchema = new Schema({
    temp: { type: String, },
    bloodPressure: {
        lowerValue: { type: String },
        upperValue: { type: String }
    },
    height: { type: String },
    bloodSugar: { type: String },
    weight: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    visit_id: { type: Schema.Types.ObjectId, ref: 'visit' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const triage = mongoose.model('triage', TriageSchema);
export default triage