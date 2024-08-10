import React, { useState } from "react";
import './creditCardForm.css';
import axios from "axios";
function EditForm({setEdit, card}) {
  const [cardName, setCardName] = useState(card.cardName);
  const [bankName, setBankName] = useState(card.bankName);
  const [enabled, setEnabled] = useState(card.enabled);
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ cardName, bankName, enabled });
    try{
      const response =await axios.put(`http://localhost:5000/api/creditcards/${card.id}`,{bank_name:bankName, credit_card_name:cardName,enabled})
      setMessage(response.data.message)
    }catch(error){
      console.log("Something went wrong!", error)
      setMessage("Error updating credit card");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Credit Card</h2>

      <div className="wrapper">
        <div>
          <label htmlFor="card-name">Card Name:</label>
          <input
            type="text"
            id="card-name"
            name="card-name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bank-name">Bank Name:</label>
          <select
            id="bank-name"
            name="bank-name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          >
            <option value={bankName}>{bankName}</option>
            <option value="Axis Bank">Axis Bank</option>
            <option value="HSBC Bank">HSBC Bank</option>
            <option value="CITI Bank">CITI Bank</option>
            <option value="HDFC Bank">HDFC Bank</option>
          </select>
        </div>
      </div>
      <div className="wrapper">
        <div>
          <label htmlFor="enabled">Enabled:</label>
          <input
            type="checkbox"
            id="enabled"
            name="enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
        </div>
        <div>
          <label>Created At</label>
          <p>...</p>
        </div>
      </div>
      <div className="wrapper1">
        <button type="button" onClick={() => setEdit(false)}>Discard</button>
        <button type="submit">Save</button>
      </div>
      {message && 
        <p>{message}</p>
      }
    </form>
  );
}

export default EditForm;
