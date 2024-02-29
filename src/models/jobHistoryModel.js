import mongoose from "mongoose";

const Schema = mongoose.Schema;
const DocSchema = new Schema({
    facility: {
        type: String,
        required: true
    },
    start: { type: Date, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    end: { type: Date, required: true },
    deletedAt: { type: Date, default: null, },

}, { timestamps: true });

const Doc = mongoose.model('doctor_history', DocSchema);

export default Doc