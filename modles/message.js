const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'title is required']
    },
    roomId: {
        type: String,
        required: [true]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Message', MessageSchema)