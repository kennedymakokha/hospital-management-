import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPass){
    return await bcrypt.compare(enteredPass,this.password);
}

const User = mongoose.model('user', UserSchema);

export default User