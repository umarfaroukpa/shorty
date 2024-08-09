import mongoose from 'mongoose';

const markdownSchema = new mongoose.Schema({
    content: { type: String, required: true },
}, { timestamps: true });

const MarkdownModel = mongoose.models.Markdown || mongoose.model('Markdown', markdownSchema);

export default MarkdownModel;
