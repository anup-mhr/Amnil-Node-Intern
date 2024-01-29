const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

function readFile() {
    return JSON.parse(fs.readFileSync('products.json', 'utf-8'));
}
function writeFile(data) {
    fs.writeFileSync('products.json', JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/products', (req, res) => {
    res.json(readFile());
})

app.post('/products', (req, res) => {
    const products = readFile();
    const { name, price, description, quantity, product_type } = req.body;
    if (!name || !price || !description || !quantity || !product_type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description,
        quantity,
        product_type
    };
    products.push(newProduct);
    writeFile(products);
    res.status(201).json(newProduct);
})

app.put('/products/:id', (req, res) => {
    const products = readFile();
    const updatedProduct = req.body;
    const id = parseInt(req.params.id)
    const index = products.findIndex(x => x.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        writeFile(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
})

app.delete('/products/:id', (req, res) => {
    const products = readFile();
    const id = parseInt(req.params.id)
    const index = products.findIndex(x => x.id === id);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        writeFile(products);
        res.status(204).json(deletedProduct); // Send 204 No Content status code
    } else {
        return res.status(404).json({ error: 'Product not found' })
    }
})

// searching api
app.get('/products/search', (req, res) => {
    const { q, sortBy, productType } = req.query;
    const products = readFile();

    if (!q) return res.status(400).json({ error: 'Missing required fields' });

    let searchedProduct = products.filter(x => x.name.toLowerCase().includes(q.toLowerCase()) || x.description.toLowerCase().includes(q.toLowerCase()))

    if (sortBy) {
        searchedProduct = searchedProduct.sort((a, b) => a[sortBy] - b[sortBy]);
    }

    if (productType) {
        searchedProduct = searchedProduct.filter(x => x.product_type.toLowerCase() === productType.toLowerCase());
    }

    res.status(200).json(searchedProduct);
})

// Update product quantity
app.patch('/products/:id/update-quantity', (req, res) => {
    const products = readFile();
    const { quantity } = req.body;
    const id = parseInt(req.params.id)

    if (!quantity) return res.status(400).json({ error: 'No quantity mentioned' });

    const index = products.findIndex((x) => x.id === id);

    if (index !== -1) {
        products[index].quantity = quantity;
        writeFile(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// List out of stock products
app.get('/products/out-of-stock', (req, res) => {
    const products = readFile();
    const outOfStockProducts = products.filter((x) => x.quantity < 5);
    res.json(outOfStockProducts);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})