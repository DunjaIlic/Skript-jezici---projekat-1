const { sequelize, Address } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/address', (req, res) => {

    Address.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/address/:id', (req, res) => {

    Address.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/address', (req, res) => {
    
    Address.create({ address: req.body.address})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/address/:id', (req, res) => {
    
    Address.findOne({ where: { id: req.params.id } })
        .then( adrs => {
            adrs.address = req.body.address;

            adrs.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/address/:id', (req, res) => {

    Address.findOne({ where: { id: req.params.id } })
        .then( proddet => {
            adrs.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route;