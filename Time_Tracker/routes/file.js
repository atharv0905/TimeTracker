const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('home.html', {root: 'views'});
});

router.get('/register', (req, res) => {
    res.sendFile('register.html', {root: 'views'});
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', {root: 'views'});
});

router.get('/tracker', (req, res) => {
    res.sendFile('tracker.html', {root: 'views'});
});

router.get('/myAccount', (req, res) => {
    // res.sendFile('myAccount.html', {root: 'views'});
    res.send('My Account');
});


module.exports = router;