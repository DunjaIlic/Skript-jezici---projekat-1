const { sequelize, Product, ProductDetails } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/products', (req, res) => {

    Product.findAll(
    //     {
    //     include: [{
    //         model: ProductDetails,
    //         required: true
    //     }]
    // }
    )
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.get('/products/:id', (req, res) => {

    Product.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.post('/products', (req, res) => {

    Product.create({ name: req.body.name, type: req.body.type })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

route.put('/products/:id', (req, res) => {

    Product.findOne({ where: { id: req.params.id } })
        .then(prod => {
            prod.name = req.body.name;
            prod.type = req.body.type;

            prod.save()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));

});

route.delete('/products/:id', (req, res) => {

    console.log(req.params.id);
    Product.findOne({ where: { id: req.params.id } })
        .then(prod => {
            prod.destroy()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
});



module.exports = route;