const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patient"
    },
    photoUrl: {
        type: String
    },
    report:{
        type: String
    }
},{timestamps: true});

module.exports = mongoose.model('photo', photoSchema);