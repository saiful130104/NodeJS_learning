const express = require('express');
const app = express();
const bicycles = require('./data/data.json');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('bicycles',{
        bicycles
    });
})

app.get('/bicycle', (req, res) => {
    const bicycle = bicycles.find( bicycle => bicycle.id == req.query.id);
    res.render('overview', {
        bicycle
    });
})

app.listen(3000, (req, res) => {
    console.log('hello express.');
})