import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    premium: boolean;
    name: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    premium: { type: Boolean, default: false },
    name: { type: String, required: true },
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
