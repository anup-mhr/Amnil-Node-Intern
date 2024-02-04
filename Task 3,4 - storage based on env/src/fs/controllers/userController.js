const { readUsersFile, writeUsersFile } = require('./../utils/usersFs')

//this is a middleware
exports.validateUserId = (req, res, next, val) => {
    const users = readUsersFile();
    const id = parseInt(val);
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
    const users = readUsersFile();
    res.json({
        status: 'success',
        result: users.length,
        data: users
    })
}

exports.createUser = (req, res) => {
    const users = readUsersFile()
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    writeUsersFile(users);
    res.status(201).json({
        status: 'success',
        msg: 'New user created',
        data: newUser
    });
}

exports.updateUser = (req, res) => {
    const users = readUsersFile();
    const updatedUser = req.body;
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    users[index] = { ...users[index], ...updatedUser };
    writeUsersFile(users);
    res.status(200).json({
        status: 'success',
        msg: 'User updated',
        data: users[index]
    });
}

exports.deleteUser = (req, res) => {
    const users = readUsersFile();
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    const deletedUser = users.splice(index, 1);
    writeUsersFile(users);
    res.status(204).json({
        status: 'success',
        msg: 'User deleted',
        data: deletedUser
    });
}
