const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
}, { timestamps: true })
const categoryModel = mongoose.model('Category', categorySchema)

const subcategorySchema = new mongoose.Schema({
    subcategory: { type: String, required: true },
}, { timestamps: true })
const subcategoryModel = mongoose.model('Subcategory', subcategorySchema)

const productSchema = new mongoose.Schema({
    productTitle: { type: String, required: true },
    productDes: { type: String, required: true },
    productPrice: { type: Number, required: true },
    selectCategory: { type: String, required: true },
    selectSubCategory: { type: String, required: true },
    productImageURL: { type: String, required: true },
}, { timestamps: true })
const productModel = mongoose.model('Product', productSchema)

module.exports = {
    categoryModel, subcategoryModel, productModel,
}