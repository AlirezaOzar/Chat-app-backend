const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('User fi')
})

module.exports = router;