import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
    },
    img2xURL: {
        type: String,
    },
    demoImgURL: {
        type: String,
    },
    basicInfo: {
        type: String,
        required: true,
    },
    information: {
        type: Object,
    },
},
    { versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

export default Product;