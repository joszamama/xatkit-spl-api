const mongoose = require('mongoose');

const IntentSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"] },
    title: { type: String, required: [true, "can't be blank"], index: true },
    description: { type: String, required: [true, "can't be blank"] },
    training: { type: [String], required: [true, "can't be blank"] },
    response: { type: String, required: [true, "can't be blank"] },
    frompl: { type: Boolean, default: false }
}, { timestamps: true })

IntentSchema.methods.cleanup = function () {
    return {
        id: this._id,
        owner: this.owner,
        title: this.title,
        description: this.description,
        training: this.training,
        response: this.response,
        frompl: this.frompl
    }
}

IntentSchema.methods.toChatbot = function () {
    return {
        title: this.title,
        training: this.training,
        response: this.response
    }
}

module.exports = mongoose.model('Intent', IntentSchema)