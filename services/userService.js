const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const secretKey = 'your_secret_key'; // Ganti dengan key yang lebih kuat

const registerUser = (username, email, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], callback);
};

const loginUser = (email, password, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return callback(err);

        if (results.length === 0) return callback(null, { message: 'User not found' });

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) return callback(null, { message: 'Invalid password' });

        // membuat token (expired dalam 24 jam)
        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: 86400
        });

        callback(null, { auth: true, token });
    });
};

const getUserById = (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = {
    registerUser,
    loginUser,
    getUserById
};