const { sequelize, Order } = require('../models');
const express = require('express');
const order = require('../models/order');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/order', (req, res) => {

    Order.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/order/:id', (req, res) => {

    Order.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/order', (req, res) => {
    
    Order.create({}) //?
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/order/:id', (req, res) => {
    
    Order.findOne({ where: { id: req.params.id } })
        .then( order => {
            order.orderId = req.body.orderId;

            order.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/order/:id', (req, res) => {

    Order.findOne({ where: { id: req.params.id } })
        .then( order => {
            order.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route;