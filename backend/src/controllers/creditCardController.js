const creditCardModel = require('../models/creditCardModel.js');
const db = require('../config/db.js');
const getPaginatedCreditCards = (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 9; // default to 9 items per page

  creditCardModel.getPaginatedCreditCards(page, limit, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving credit cards' });
    }
    
    creditCardModel.getCreditCardCount((countErr, countResults) => {
      if (countErr) {
        return res.status(500).json({ error: 'Error retrieving credit card count' });
      }
      
      const totalItems = countResults[0].count;
      const totalPages = Math.ceil(totalItems / limit);
      
      res.json({
        data: results,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          perPage: limit
        }
      });
    });
  });
};

// const addCreditCard = (req, res) => {
//   console.log(req.body)
//   creditCardModel.addCreditCard(req.body, (err, results) => {
//     console.log(results)
//     if (err) {
//       return res.status(500).json({ error: 'Error adding credit card' });
//     }
//     res.status(201).json({ message: 'Credit card added successfully' });
//   });
// };
const addCreditCard = (req, res) => {
  console.log(req.body);
  creditCardModel.addCreditCard(req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding credit card' });
    }
    // Assuming `results.insertId` is the ID of the newly inserted card
    const newCardId = results.insertId;
    
    // Fetch the new card including the created_at time
    db.query('SELECT * FROM credit_cards WHERE id = ?', [newCardId], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching the new card' });
      }
      res.status(201).json({ message: 'Credit card added successfully', newCard: rows[0] });
    });
  });
};
const editCreditCard = (req, res) => {
  const { id } = req.params;
  creditCardModel.editCreditCard(id, req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating credit card' });
    }
    res.json({ message: 'Credit card updated successfully' });
  });
};

const deleteCreditCard = (req, res) => {
  const { id } = req.params;
  creditCardModel.deleteCreditCard(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting credit card' });
    }
    res.json({ message: 'Credit card deleted successfully' });
  });
};

module.exports = {
  getPaginatedCreditCards,
  addCreditCard,
  editCreditCard,
  deleteCreditCard
};
