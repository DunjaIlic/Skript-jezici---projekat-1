const { sequelize, OrderItems } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/orderitems', (req, res) => {

    OrderItems.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/orderitems/:id', (req, res) => {

    OrderItems.findAll({ where: { OrderId: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/orderitems', (req, res) => {
    
    OrderItems.create({ count: req.body.count })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/orderitems/:id', (req, res) => {
    
    OrderItems.findOne({ where: { id: req.params.id } })
        .then( oi => {
            oi.count = req.body.count;

            oi.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/orderitems/:id', (req, res) => {

    OrderItems.findOne({ where: { id: req.params.id } })
        .then( oi => {
            oi.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route;