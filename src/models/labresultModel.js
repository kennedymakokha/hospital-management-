import mongoose from "mongoose";

const Schema = mongoose.Schema;
const labSchema = new Schema({

    deletedAt: { type: Date, default: null },

    results: [
        {
            test_id: { type: Schema.Types.ObjectId, ref: 'test' },
            results: { type: String }
        }
    ],
    prescription_id: { type: Schema.Types.ObjectId, ref: 'prescription' },
    observation_id: { type: Schema.Types.ObjectId, ref: 'symptoms' },
    patient_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });
const lab = mongoose.model('lab_results', labSchema);
export default lab