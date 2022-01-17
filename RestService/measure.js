const { sequelize, Measure } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/measure', (req, res) => {

    Measure.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/measure/:id', (req, res) => {

    Measure.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/measure', (req, res) => {
    
    Measure.create({ price: req.body.price, quantity: req.body.quantity })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/measure/:id', (req, res) => {
    
    Measure.findOne({ where: { id: req.params.id } })
        .then( measure => {
            measure.ml = req.body.ml;

            proddet.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/measure/:id', (req, res) => {

    Measure.findOne({ where: { id: req.params.id } })
        .then( measure => {
            measure.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route;