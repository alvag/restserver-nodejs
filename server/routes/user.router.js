const express = require( 'express' );
const app = express();

app.get('/usuario', (req, res) => {
    res.send('get Usuario');
});

app.post('/usuario', (req, res) => {
    res.send('post Usuario');
});

app.put('/usuario', (req, res) => {
    res.send('put Usuario');
});

app.delete('/usuario', (req, res) => {
    res.send('delete Usuario');
});

module.exports = app;
