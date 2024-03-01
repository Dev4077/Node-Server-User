const db = require('../model/theProductModel')
const categoryModel = db.categoryModel
const subcategoryModel = db.subcategoryModel
const productModel = db.productModel


const addCategory = async (req, res) => {
    try {
        const { category } = req.body
        if (!category) { res.json({ status: false, message: 'Category required' }) }

        else {
            const isCategory = await categoryModel.count({ category })
            if (isCategory) {
                res.json({ status: false, message: 'Category already exists' })
            } else {
                if (req.path) {
                    await categoryModel.create({
                        category,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                } else {
                    await categoryModel.create({
                        category,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                }
            }
        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

const addSubCategory = async (req, res) => {
    try {
        const { subcategory, perentCategory } = req.body
        if (!perentCategory) { res.json({ status: false, message: 'Perent-Category required' }) }
        else if (!subcategory) { res.json({ status: false, message: 'Sub-Category required' }) }

        else {
            const isSubCategory = await subcategoryModel.count({ subcategory })
            if (isSubCategory) {
                res.json({ status: false, message: 'Sub-Category already exists' })
            } else {
                if (req.path) {
                    await subcategoryModel.create({
                        perentCategory,
                        subcategory,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                } else {
                    await subcategoryModel.create({
                        perentCategory,
                        subcategory,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                }
            }
        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const { productTitle, productDes, productPrice, categoryID, subCategoryID, productImageURL } = req.body
        if (!productTitle) { res.json({ status: false, message: 'Title required' }) }
        else if (!productDes) { res.json({ status: false, message: 'Description required' }) }
        else if (!productPrice) { res.json({ status: false, message: 'Price required' }) }
        else if (!categoryID) { res.json({ status: false, message: 'Category required' }) }
        else if (!subCategoryID) { res.json({ status: false, message: 'selectSubCategory required' }) }
        else if (!productImageURL) { res.json({ status: false, message: 'productImageURL required' }) }
        else {
            const isTitle = await productModel.count({ productTitle })
            if (isTitle) {
                res.json({ status: false, message: 'Product Title already exists! Please Write a new Title' })
            } else {
                if (req.path) {
                    await productModel.create({
                        productTitle,
                        productDes,
                        productPrice,
                        categoryID,
                        subCategoryID,
                        productImageURL,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                } else {
                    await productModel.create({
                        productTitle,
                        productDes,
                        productPrice,
                        categoryID,
                        subCategoryID,
                        productImageURL,
                    })
                    res.json({ status: true, message: 'Data recorded successfully...' })
                }
            }
        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

const getCategory = async (req, res) => {
    try {
        const users = await categoryModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSubCategory = async (req, res) => {
    try {
        const users = await subcategoryModel.find().populate('perentCategory');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const products = await productModel.find().populate('categoryID').populate('subCategoryID');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addCategory,
    addSubCategory,
    getCategory,
    getSubCategory,
    addProduct,
    getProduct,
}