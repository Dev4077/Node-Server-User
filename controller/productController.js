const db = require('../model/theProductModel')
const categoryModel = db.categoryModel
const subcategoryModel = db.subcategoryModel
const productModel = db.productModel


const addCategory = async (req, res) => {
    try {
        const { category, isCatActive, flag } = req.body
        if (!category) { res.json({ status: false, message: 'Category required' }) }
        else if(!isCatActive) {res.json({status: false, message: 'State required' }) }
        else if(!flag) {res.json({status: false, message: 'State required' }) }

        else {
            const isCategory = await categoryModel.count({ category })
            if (isCategory) {
                res.json({ status: false, message: 'Category already exists' })
            } else {
                if (req.path) {
                    await categoryModel.create({
                        category,
                        isCatActive,
                        flag
                    })
                    res.json({ status: true, message: 'Category added successfully...' })
                } else {
                    await categoryModel.create({
                        category,
                        isCatActive,
                        flag
                    })
                    res.json({ status: true, message: 'Category added successfully...' })
                }
            }
        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

const addSubCategory = async (req, res) => {
    try {
        const { subcategory, perentCategory, isSubCatActive, flag } = req.body
        if (!perentCategory) { res.json({ status: false, message: 'Perent-Category required' }) }
        else if (!subcategory) { res.json({ status: false, message: 'Sub-Category required' }) }
        else if(!isSubCatActive) {res.json({status: false, message: 'State required' }) }
        else if(!flag) {res.json({status: false, message: 'State required' }) }

        else {
            const isSubCategory = await subcategoryModel.count({ subcategory })
            if (isSubCategory) {
                res.json({ status: false, message: 'Sub-Category already exists' })
            } else {
                if (req.path) {
                    await subcategoryModel.create({
                        perentCategory,
                        subcategory,
                        isSubCatActive,
                        flag
                    })
                    res.json({ status: true, message: 'Sub-Category added successfully...' })
                } else {
                    await subcategoryModel.create({
                        perentCategory,
                        subcategory,
                        isSubCatActive,
                        flag
                    })
                    res.json({ status: true, message: 'Sub-Category added successfully...' })
                }
            }
        }
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const { productTitle, productDes, productPrice, categoryID, subCategoryID, productImageURL,flag } = req.body
        if (!productTitle) { res.json({ status: false, message: 'Title required' }) }
        else if (!productDes) { res.json({ status: false, message: 'Description required' }) }
        else if (!productPrice) { res.json({ status: false, message: 'Price required' }) }
        else if (!categoryID) { res.json({ status: false, message: 'Category required' }) }
        else if (!subCategoryID) { res.json({ status: false, message: 'selectSubCategory required' }) }
        else if (!productImageURL) { res.json({ status: false, message: 'productImageURL required' }) }
        else if (!flag) { res.json({ status: false, message: 'productImageURL required' }) }
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
                        flag
                    })
                    res.json({ status: true, message: 'Product added successfully...' })
                } else {
                    await productModel.create({
                        productTitle,
                        productDes,
                        productPrice,
                        categoryID,
                        subCategoryID,
                        productImageURL,
                        flag
                    })
                    res.json({ status: true, message: 'Product added successfully...' })
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

const activeCat = async (req, res) => {
    const { _id } = req.params;
    try {
        const category = await categoryModel.findById(_id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Toggle the isCatActive field
        category.isCatActive = !category.isCatActive;
        await category.save();
        return res.status(200).json(category);
    } catch (error) {
        console.error('Error toggling category active status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const activeSubCat = async (req, res) => {
    const { _id } = req.params;
    try {
        const subcategory = await subcategoryModel.findById(_id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Sub-Category not found' });
        }
        // Toggle the isSubCatActive field
        subcategory.isSubCatActive = !subcategory.isSubCatActive;
        await subcategory.save();
        return res.status(200).json(subcategory);
    } catch (error) {
        console.error('Error toggling sub-category active status:', error);
        return res.status(500).json({ message: 'Internal server error' });
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

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, isCatActive, flag } = req.body;
        const updatedAt = new Date();

        const updatedCategory = await subcategoryModel.findByIdAndUpdate(id, { category, isCatActive, flag, updatedAt }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteCategory = async (req, res) => {
    const { _id } = req.params;

    try {
        const category = await categoryModel.findById(_id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.flag = false;
        await category.save();
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

  

const editSubCategory = async (req, res) => {
    const { _id } = req.params;
    const { subcategory, perentCategory, isSubCatActive } = req.body;

    try {
        const updatedSubCategory = await subcategoryModel.findById(_id, { subcategory, perentCategory, isSubCatActive }, { new: true });
        if (!updatedSubCategory) {
            return res.status(404).json({ message: 'Sub-Category not found' });
        }
        return res.status(200).json(updatedSubCategory);
    } catch (error) {
        console.error('Error editing sub-category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteSubCategory = async (req, res) => {
    const { _id } = req.params;

    try {
        const subcategory = await subcategoryModel.findById(_id);
        if (!subcategory) {
            return res.status(404).json({ message: 'Sub-Category not found' });
        }
        subcategory.flag = false;
        await subcategory.save();
        return res.status(200).json({ message: 'Sub-Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting sub-category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    addCategory,
    addSubCategory,
    getCategory,
    getSubCategory,
    addProduct,
    getProduct,
    activeCat,
    activeSubCat,
    editCategory,
    deleteCategory,
    editSubCategory,
    deleteSubCategory,
}