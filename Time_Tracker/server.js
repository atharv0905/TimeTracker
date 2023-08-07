// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/user');
const file = require('./routes/file');
const User = require('./models/user');
const app = express();
const port = 3000;

process.stdout.write('\x1Bc');
app.use('/static',express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', route.router);
app.use('/', file);

async function deleteTaskOfAllUsers() {
    try{
        const users = await User.find();
        users.forEach(async user => {
            user.tasks = {};
            await user.save();
        });
    } catch (err) {
        console.log("Error");
    }
}

setInterval(async () => {
    let time = new Date();
    let hours = time.getHours();
    let mins = time.getMinutes();
    if (hours === 23 && mins === 59) {
        await deleteTaskOfAllUsers();
    }
}, 1000);

function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

// startServer();
function connectToDB() {
    mongoose.connect("mongodb+srv://atharvmirgal09:atharv_rashi_artahsahriv__03098X1wSNM-5d@timetracker.ac4hnj7.mongodb.net/timetracker?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to DB");
        startServer();
    }).catch((err) => {
        console.log("Error");
    });
}

connectToDB();


