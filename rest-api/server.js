const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const app = express();

const products = [
    {
        id: '1',
        name: 'mango',
        price: 70,
    },
    {
        id: '2',
        name: 'Banana',
        price: 40,
    },
];

app.get('/api/', (req, res) => {
    res.send('Hello rest api');
});

app.get('/api/products/', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find((prod) => prod.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product is not found for this id' });
    }
    return res.json(product);
});

// insert a product
// this is body parser middleware
app.use(express.json());

app.post('/api/products', (req, res) => {
    const { error } = validation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const product = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
    };
    products.push(product);
    return res.json(product);
});

// update a product using put
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((prod) => prod.id === id);
    if (index === -1) {
        return res.status(404).json({ Message: `Producti id ${id} is not found.` });
    }
    const { error } = validation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    products[index].name = req.body.name;
    products[index].price = req.body.price;
    res.json(products[index]);
});

// update a product using put
app.patch('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((prod) => prod.id === id);
    if (index === -1) {
        return res.status(404).json({ Message: `Producti id ${id} is not found.` });
    }
    const { error } = validationForPatchMethod(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const updatedProduct = {
        ...products[index],
        ...req.body,
    };
    products[index] = updatedProduct;
    return res.json(updatedProduct);
});

// delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((prod) => prod.id === id);
    if (index === -1) {
        return res.status(404).json({ Message: `Producti id ${id} is not found.` });
    }
    products.splice(index, 1);
    return res.json(products);
});

// helper functions
function validation(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        price: Joi.number().min(3).max(20000).required(),
    });
    return schema.validate(body);
}

function validationForPatchMethod(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20),
        price: Joi.number().min(3).max(20000),
    });
    return schema.validate(body);
}

app.listen(3000, () => {
    console.log('Server is running at port number 3000');
});
