
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        bookName: { type: String, required: true },
	number: {type : String, required: true}
    },
    {
        timestamps: true
    }

);
module.exports = mongoose.model('Book', bookSchema);
