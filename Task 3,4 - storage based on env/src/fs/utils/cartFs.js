const fs = require('fs')

const readCartFile = () => JSON.parse(fs.readFileSync(`${__dirname}/../../../dev-data/data/carts.json`, 'utf-8'));
const writeCartFile = (data) => fs.writeFileSync(`${__dirname}/../../../dev-data/data/carts.json`, JSON.stringify(data, null, 2), 'utf-8');

module.exports = {readCartFile, writeCartFile}