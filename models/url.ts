import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    qrCode: string;
    userId: Schema.Types.ObjectId;
    createdAt: Date;
}

const UrlSchema: Schema = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    shortCode: { type: String, required: true, unique: true },
    qrCode: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
const Url: Model<IUrl> = mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema);
export default Url
