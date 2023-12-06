const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        author: { type: String },
        price: { type: String, required: true },
        stock: { type: Number, required: true },
        categories: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Book', bookSchema);