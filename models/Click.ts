import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema({
    url: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    referrer: { type: String, required: true },
    country: { type: String, required: true },
});

export default mongoose.models.Click || mongoose.model('Click', ClickSchema);
