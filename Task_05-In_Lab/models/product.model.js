const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
    	name: { type: String , required : true},
        description: { type: String },
        // image: { type: String,required: true },
        price: { type: String, required: true },
        stock: { type: Number, required: true },
	brand: {type: String},
        categories: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Product', productSchema);
