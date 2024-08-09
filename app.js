const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Run Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});