const express = require('express');
const app = express()

const { products } = require('./data');

app.get('/', (req, res) => {
    res.json(products)
})

app.get('/products/query', (req, res) => {
    const { search, limit } = req.query;

    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, +limit)
    }

    res.json(sortedProducts)
})

app.listen(5000, () => {
    console.log('Server is listening');
})