const express = require('express');
const router = express.Router();
const creditCardController = require('../controllers/creditCardController.js');

router.get('/creditcards', creditCardController.getPaginatedCreditCards);

router.post('/creditcards', creditCardController.addCreditCard);

router.put('/creditcards/:id', creditCardController.editCreditCard);

router.delete('/creditcards/:id', creditCardController.deleteCreditCard);

module.exports = router;
