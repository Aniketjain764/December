const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');

router.get('/', publicController.getHomePage);

router.post('/contact', publicController.submitContact);
router.post('/newsletter', publicController.subscribeNewsletter);

module.exports = router;
