const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
}, { timestamps: true })
const categoryModel = mongoose.model('Category', categorySchema)

const subcategorySchema = new mongoose.Schema({
    perentCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: String, required: true },
}, { timestamps: true })
const subcategoryModel = mongoose.model('Subcategory', subcategorySchema)

const productSchema = new mongoose.Schema({
    productTitle: { type: String, required: true },
    productDes: { type: String, required: true },
    productPrice: { type: Number, required: true },
    categoryID: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subCategoryID: {type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    productImageURL: { type: String, required: true },
}, { timestamps: true })
const productModel = mongoose.model('Product', productSchema)

module.exports = {
    categoryModel, subcategoryModel, productModel,
}