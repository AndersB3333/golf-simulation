const path = require('path')

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
});

router.get('/program', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'simulation.html'))
})

module.exports = router