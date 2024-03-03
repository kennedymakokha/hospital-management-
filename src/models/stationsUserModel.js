import mongoose from "mongoose";

const Schema = mongoose.Schema;
const StationSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    station_id: { type: Schema.Types.ObjectId, ref: 'patient' },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const visit = mongoose.model('station_user', StationSchema);
export default visit