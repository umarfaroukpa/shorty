import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUrl extends Document {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    qrCode: string;
    customUrl?: string;
    customDomain?: string;
    userId: Schema.Types.ObjectId;
    createdAt: Date;
}

const UrlSchema: Schema = new Schema<IUrl>({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },  // Ensure shortUrl is unique
    shortCode: { type: String, required: true, unique: true },  // Ensure shortCode is unique
    qrCode: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customDomain: { type: String },
    customUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Compound index to ensure unique combinations of customDomain and customUrl
UrlSchema.index({ customDomain: 1, customUrl: 1 }, { unique: true });

const Url: Model<IUrl> = mongoose.models.Url || mongoose.model<IUrl>('Url', UrlSchema);
export default Url;

