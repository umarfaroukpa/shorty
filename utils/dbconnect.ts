import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const dbConnect = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect(MONGODB_URI);
};

export default dbConnect;
