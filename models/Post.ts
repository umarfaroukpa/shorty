import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
