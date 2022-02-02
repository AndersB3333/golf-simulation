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

router.get('/githubprofile', (req, res, next) => {
    res.redirect("https://github.com/AndersB3333")
})

router.get('/inprofile', (req, res, next) => {
    res.redirect("https://www.linkedin.com/in/anders-baumann")
})

module.exports = router