const fs = require('fs')

const readUsersFile = () => JSON.parse(fs.readFileSync(`${__dirname}/../../../dev-data/data/users.json`, 'utf-8'));
const writeUsersFile = (data) => fs.writeFileSync(`${__dirname}/../../../dev-data/data/users.json`, JSON.stringify(data, null, 2), 'utf-8');

module.exports = {readUsersFile, writeUsersFile}