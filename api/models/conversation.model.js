import mongoose from "mongoose";


const ConversationSchema = new mongoose.Schema({

    members: {
        type: Array,
        required: true
    },

}, { timestamps: true })


export default mongoose.model('Conversation', ConversationSchema)