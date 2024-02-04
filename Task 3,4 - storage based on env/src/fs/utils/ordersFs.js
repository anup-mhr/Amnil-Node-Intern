const fs = require('fs')

const readOrdersFile = () => JSON.parse(fs.readFileSync(`${__dirname}/../../../dev-data/data/orders.json`, 'utf-8'));
const writeOrdersFile = (data) => fs.writeFileSync(`${__dirname}/../../../dev-data/data/orders.json`, JSON.stringify(data, null, 2), 'utf-8');

module.exports = {readOrdersFile, writeOrdersFile}