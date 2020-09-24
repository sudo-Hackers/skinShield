const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitorDataSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patient"
    },
    photo: {
        type: Buffer
    }
},{timestamps: true});

monitorDataSchema.methods.toJSON = function(){
    const result = this.toObject();
    delete result.photo;
    return result;
};

module.exports = mongoose.model('monitor', monitorDataSchema);