import React, { useState } from "react";
import './creditCardForm.css';
import axios from "axios";
function CreditCardForm({setOpen}) {
  const [cardName, setCardName] = useState("");
  const [bankName, setBankName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ cardName, bankName, enabled });
    try{
      const response =await axios.post(`http://localhost:5000/api/creditcards`,{bank_name:bankName, credit_card_name:cardName,enabled})
      setMessage(response.data.message)
      setCardName("");
      setBankName("");
      setEnabled(false);
    }catch(error){
      console.log("Something went wrong!", error)
      setMessage("Error creating credit card");
    }
  };
  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
    setMessage(""); // Clear message
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Credit Card</h2>

      <div className="wrapper">
        <div>
          <label htmlFor="card-name">Card Name:</label>
          <input
            type="text"
            id="card-name"
            name="card-name"
            value={cardName}
            onChange={handleCardNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bank-name">Bank Name:</label>
          <select
            id="bank-name"
            name="bank-name"
            value={bankName}
            onChange={(e) => {setBankName(e.target.value);setMessage("")}}
            required
          >
            <option value="">Select Bank</option>
            <option value="Axis Bank">Axis Bank</option>
            <option value="HSBC Bank">HSBC Bank</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="CITI Bank">CITI Bank</option>
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
        <button type="button" onClick={() => setOpen(false)}>Discard</button>
        <button type="submit">Save</button>
      </div>
      {message && 
        <p>{message}</p>
      }
    </form>
  );
}

export default CreditCardForm;
