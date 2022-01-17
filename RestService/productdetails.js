const { sequelize, ProductDetails } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/productdetails', (req, res) => {

    ProductDetails.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/productdetails/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/productdetails', (req, res) => {
    
    Users.create({ price: req.body.price, quantity: req.body.quantity })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/productdetails/:id', (req, res) => {
    
    ProductDetails.findOne({ where: { id: req.params.id } })
        .then( proddet => {
            proddet.name = req.body.name;
            proddet.email = req.body.email;

            proddet.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/productdetails/:id', (req, res) => {

    ProductDetails.findOne({ where: { id: req.params.id } })
        .then( proddet => {
            proddet.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route;