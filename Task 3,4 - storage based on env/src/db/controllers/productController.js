const Product = require('./../models/productModel')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json({
            status: 'Success',
            result: products.length,
            data: products
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        });
    }
}

exports.createProduct = async (req, res) => {
    try {
        let productItem = {...req.body}     //making copy of req.body object
        
        if (req.files.image) {
            productItem.images = req.files.image.map(file => file.filename)
        }
        if(req.files.coverImage){
            productItem.coverImage = req.files.coverImage[0].filename;
        }
        
        const product = await Product.create(productItem)
        res.status(201).json({
            status: 'Success',
            msg: 'Product added',
            data: product
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'Success',
            msg: 'Product has been updated',
            data: newProduct
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            msg: 'Product deleted Successfully',
            data: product
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        });
    }
}

exports.updateProductQantity = async (req, res) => {
    try {
        const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'Success',
            msg: 'Product has been updated',
            data: newProduct
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.filterProducts = async (req, res) => {
    try {
        console.log(req.query)

        //1) filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sortBy', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el])

        //2) Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Product.find({
            name: {
                $regex: new RegExp(queryObj.q, 'i'),
            }
        })

        // sorting
        if (req.query.sortBy) {
            query = query.sort(req.query.sortBy)
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        if (req.query.productType) {
            query = query.find({
                product_type: req.query.productType
            })
        }

        //execute query
        const products = await query;
        res.status(200).json({
            status: 'success',
            result: products.length,
            data: products
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.outOfStock = async (req, res) => {
    try {
        const products = await Product.find({
            quantity: {
                $lt: 5
            }
        })
        res.status(200).json({
            status: 'Success',
            result: products.length,
            data: products
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}