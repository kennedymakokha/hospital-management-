import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;
const PatientSchema = new Schema({
   
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    gender: { type: String },
    dob: { type: Date },
    tokens: [{ type: String }],
    ID_no: { type: String },
    deletedAt: { type: Date, default: null },
    nextVisit: { type: Date, default: null, },
    password: { type: String, required: true },
}, { timestamps: true });
PatientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
PatientSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

const patient = mongoose.model('patient', PatientSchema);
export default patient