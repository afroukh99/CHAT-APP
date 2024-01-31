import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({

    conversationId: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    sender: {
        type: String,
        required: true
    },
    seenByRecipient: {
        type: Boolean,
        default: false
    }
    ,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: String,
        required: false,
    }

}, { timestamps: true })


export default mongoose.model('Message', MessageSchema)