const express = require('express');
const app = express()

const { products } = require('./data');

app.get('/', (req, res) => {
    res.json(products)
})

app.get('/products/:pId', (req, res) => {
    const { pId } = req.params;

    const product = products.find((product) => product.id === +pId)

    res.json(product)
})

app.listen(5000, () => {
    console.log('Server is listening');
})