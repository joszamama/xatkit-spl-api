const mongoose = require('mongoose');

const ChatbotSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"]},
    name: {type: String, required: [true, "can't be blank"]},
    description: {type: String, required: [true, "can't be blank"]},
    intents: {type: [mongoose.Schema.Types.ObjectId], ref: 'Intent'},
    compiled: {type: Boolean, default: false}
}, {timestamps: true})

ChatbotSchema.methods.cleanup = function() {
    return {
        id: this._id,
        owner: this.owner,
        name: this.name,
        description: this.description,
        intents: this.intents,
        compiled: this.compiled
    }
}

module.exports = mongoose.model('Chatbot', ChatbotSchema)