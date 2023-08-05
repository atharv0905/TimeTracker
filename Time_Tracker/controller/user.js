const User = require('../models/user');

let _idByUser;
async function createUser(req, res) {
    const user = new User({
        _id: req.body._id,
        name: req.body.name,
        password: req.body.password,
        tasks: req.body.tasks
    });

    try {
        const newUser = await user.save();
        console.log(newUser._id + " has been created");
        res.status(201);
        res.sendFile('login.html', {root: "views"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

async function getAllUsers(req, res) {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUserById(req, res) {
    try{
        const user = await User.findById(_idByUser);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteUserById(req, res) {
    try{
        const user = await User.findByIdAndDelete(_idByUser);
        res.json(`User ${user._id} has been deleted`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateUserTaskById(req, res){
    let {tasks} = req.body;
    try{
        const user = await User.findById(_idByUser);
        user.tasks = tasks;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function loginUser(req, res){
    _idByUser = req.body._id;
    let passwordByUser = req.body.password;
    try{
        const user = await User.findById(_idByUser);
        if(user.password == passwordByUser){
            res.sendFile('home.html', {root: "views"});
        }else{
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { 
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserTaskById,
    loginUser
};