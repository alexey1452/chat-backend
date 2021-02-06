import mongoose from 'mongoose';

const Schema =  mongoose.Schema;

const GroupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageId: {
        type: Schema.Types.ObjectId,
        required: false
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: false
    }
}, {
    timestamps: true
});


export default mongoose.model('group', GroupSchema);
