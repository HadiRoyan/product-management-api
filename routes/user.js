const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const router = express.Router();

const secretKey = 'your_secret_key'; 

// Registrasi User
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    userService.registerUser(username, email, password, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User registered successfully');
    });
});

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    userService.loginUser(email, password, (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.message) return res.status(401).send(result.message);

        res.status(200).send({ auth: true, token: result.token });
    });
});

// Mendapatkan Informasi User Berdasarkan Token
router.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');

        userService.getUserById(decoded.id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).send('User not found');
            res.status(200).json(results[0]);
        });
    });
});

module.exports = router;