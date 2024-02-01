const fs = require('fs')

const readUsersFile = () => JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8'));
const writeUsersFile = (data) => fs.writeFileSync(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(data, null, 2), 'utf-8');

//this is a middleware
exports.validateUserId = (req, res, next, val) => {
    const users = readUsersFile();
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id)

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            msg: 'User not found'
        });
    }

    next();
}

exports.getAllUsers = (req, res) => {
    res.send(readUsersFile())
}

exports.createUser = (req, res) => {
    const users = readUsersFile()
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    writeUsersFile(users);
    res.status(201).json(newUser);
}

exports.updateUser = (req, res) => {
    const users = readUsersFile();
    const updatedUser = req.body;
    // const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    // if (index === -1) return res.status(404).json({ error: 'User not found' });

    users[index] = { ...users[index], ...updatedUser };
    writeUsersFile(users);
    res.status(200).json(users[index]);

}

exports.deleteUser = (req, res) => {
    const users = readUsersFile();
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    // if (index === -1) return res.status(404).json({ error: 'User not found' });

    const deletedUser = users.splice(index, 1);
    writeUsersFile(users);
    res.json(deletedUser);
}
