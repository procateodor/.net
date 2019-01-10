const express = require('express');
const router = express.Router();

const Students = require('./students');
const Professors = require('./professors');

router.use('/students', Students);
router.use('/professor', Professors);

module.exports = router;