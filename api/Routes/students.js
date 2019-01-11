const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const DisciplinesModel = require('../models/disciplineModel');
const Discipline = DisciplinesModel(mongoose);


router.get('/disciplines', (req, res) => {
    Discipline.find({}, (err, items) => {
        if (err) {
            res.status(200).send({ status: false, items: [] });
        }

        res.status(200).send({ status: true, items });
    });
});

module.exports = router;