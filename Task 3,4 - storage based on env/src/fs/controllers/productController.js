const { readProductFile, writeProductFile } = require('./../utils/productFs')

exports.validateProduct = (req, res, next, val) => {
    const products = readProductFile();
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id)
    if (index === -1)
        return res.status(404).json({
            status: 'fail',
            msg: 'Product not found'
        })
    next();
}

exports.validateProductFields = (req, res, next) => {
    const { name, price, description, quantity, product_type } = req.body;
    if (!name || !price || !description || !quantity || !product_type) {
        return res.status(400).json({
            status: 'Fail',
            msg: 'Missing required fields'
        });
    }
    next();
}

exports.getAllProducts = (req, res) => {
    const products = readProductFile()
    res.json({
        status: 'Success',
        result: products.length,
        data: products
    });
}

exports.createProduct = (req, res) => {
    const products = readProductFile();
    const newProduct = req.body;
    console.log(req.files.image)

    if (req.files.image) {
        newProduct.images = req.files.image.map(file => file.filename)
    }
    console.log(req.files.coverImage)
    if (req.files.coverImage) {
        newProduct.coverImage = req.files.coverImage[0].filename;
    }
    newProduct.id = products.length + 1;
    products.push(newProduct);
    writeProductFile(products);
    res.status(201).json({
        status: 'Success',
        msg: 'Product added',
        data: newProduct
    });
}

exports.updateProduct = (req, res) => {
    const products = readProductFile();
    const updatedProduct = req.body;
    const id = parseInt(req.params.id)
    const index = products.findIndex(x => x.id === id);

    products[index] = { ...products[index], ...updatedProduct };
    writeProductFile(products);
    res.json({
        status: 'Success',
        msg: 'Product has been updated',
        data: products[index]
    });
}

exports.deleteProduct = (req, res) => {
    const products = readProductFile();
    const id = parseInt(req.params.id)
    const index = products.findIndex(x => x.id === id);

    const deletedProduct = products.splice(index, 1);
    writeProductFile(products);
    res.status(204).json({
        status: 'Success',
        msg: 'Product has been deleted',
        data: deletedProduct
    }); // Send 204 No Content status code

}

exports.updateProductQantity = (req, res) => {
    const products = readProductFile();
    const { quantity } = req.body;
    const id = parseInt(req.params.id)

    if (!quantity) return res.status(400).json({ error: 'No quantity mentioned' });

    const index = products.findIndex((x) => x.id === id);

    products[index].quantity = quantity;
    writeProductFile(products);
    res.json({
        status: 'Success',
        msg: 'Product Updated',
        data: products[index]
    });

}

exports.filterProducts = (req, res) => {
    const { q, sortBy, productType } = req.query;
    const products = readProductFile();

    if (!q) return res.status(400).json({ error: 'Missing required fields' });

    let searchedProduct = products.filter(x => x.name.toLowerCase().includes(q.toLowerCase()) || x.description.toLowerCase().includes(q.toLowerCase()))

    if (sortBy) {
        searchedProduct = searchedProduct.sort((a, b) => a[sortBy] - b[sortBy]);
    }

    if (productType) {
        searchedProduct = searchedProduct.filter(x => x.product_type.toLowerCase() === productType.toLowerCase());
    }

    res.status(200).json({
        status: 'Success',
        result: searchedProduct.length,
        data: searchedProduct
    });
}

exports.outOfStock = (req, res) => {
    const products = readProductFile();
    const outOfStockProducts = products.filter((x) => x.quantity < 5);
    res.status(200).json({
        status: 'Success',
        result: outOfStockProducts.length,
        data: outOfStockProducts
    });
}