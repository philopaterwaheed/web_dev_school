const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
    {
        prodcutId: mongoose.Schema.Types.ObjectId,
        userId: mongoose.Schema.Types.ObjectId,
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Purchase', purchaseSchema);
