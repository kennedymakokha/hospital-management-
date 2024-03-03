import mongoose from "mongoose";

const Schema = mongoose.Schema;
const VisitSchema = new Schema({
    token: { type: String },
    role_id: { type: Schema.Types.ObjectId, ref: 'role' },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    start: { type: Date, default: null },
    end: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const visit = mongoose.model('duty', VisitSchema);
export default visit