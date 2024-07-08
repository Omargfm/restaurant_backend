import {model, Schema} from "mongoose";

const ProductSchema = Schema({
    name: {
        type: String,
        require: [true, 'name is required'],
    },
    price: {
        type: Number,
        default: 0
    },
    description: { type: String },
    available: { type: Boolean, defult: true },
    img: { type: String }
})


ProductSchema.methods.toJSON = function () {
    const {__v, state, _id, ...product} = this.toObject();
    product.uid = _id;
    return product;
}

export default model('Product', ProductSchema)