const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.sendFile('register.html', {root: 'views'});
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', {root: 'views'});
});

router.get('/home', (req, res) => {
    res.sendFile('home.html', {root: 'views'});
});

module.exports = router;