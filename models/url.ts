import mongoose, { Schema, model, models } from 'mongoose';

const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    qrCode: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

export default models.Url || model('Url', urlSchema);
