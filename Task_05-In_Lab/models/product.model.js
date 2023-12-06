const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
	name: { type: String },
        description: { type: String },
        price: { type: String, required: true },
        stock: { type: Number, required: true },
        categories: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Product', productSchema);
