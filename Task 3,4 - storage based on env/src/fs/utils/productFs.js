const fs = require('fs')

const readProductFile = ()=>  JSON.parse(fs.readFileSync(`${__dirname}/../../../dev-data/data/products.json`, 'utf-8'));
const writeProductFile = (data)=>  fs.writeFileSync(`${__dirname}/../../../dev-data/data/products.json`, JSON.stringify(data, null, 2), 'utf-8');

module.exports = {readProductFile, writeProductFile}