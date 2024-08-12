const db = require('../config/db.js');

const getPaginatedCreditCards = (page, limit, callback) => {
  const offset = (page - 1) * limit;
  db.query('SELECT * FROM credit_cards LIMIT ? OFFSET ?', [limit, offset], callback);
};

const getCreditCardCount = (callback) => {
  db.query('SELECT COUNT(*) AS count FROM credit_cards', callback);
};

// const getAllCreditCards = (callback) => {
//   db.query('SELECT * FROM credit_cards', callback);
// };

const addCreditCard = (data, callback) => {
  const { bank_name, credit_card_name, enabled } = data;
  db.query('INSERT INTO credit_cards (bank_name, credit_card_name, enabled) VALUES (?, ?, ?)',
    [bank_name, credit_card_name, enabled], callback);
};

const editCreditCard = (id, data, callback) => {
  const { bank_name, credit_card_name, enabled } = data;
  db.query('UPDATE credit_cards SET bank_name = ?, credit_card_name = ?, enabled = ? WHERE id = ?',
    [bank_name, credit_card_name, enabled, id], callback);
};

const deleteCreditCard = (id, callback) => {
  db.query('DELETE FROM credit_cards WHERE id = ?', [id], callback);
};

module.exports = {
  getPaginatedCreditCards,
  getCreditCardCount,
  addCreditCard,
  editCreditCard,
  deleteCreditCard
};
