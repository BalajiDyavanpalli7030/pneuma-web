import React, {useState} from 'react';
import axios from 'axios';
const Delete = ({setActiveDeleteId, id,handleDelete}) => {
  const [message, setMessage] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response =await axios.delete(`http://localhost:5000/api/creditcards/${id}`)
      setMessage(response.data.message)
      handleDelete(id);
    }catch(error){
      console.log("Something went wrong!", error)
      setMessage("Error updating credit card");
    }
  };
  return (
    <div className=''>
     <h1>Confirm Deletion</h1>
     <h3>Are you sure?</h3>
     <div>
        <button onClick={handleSubmit}>Yes</button>
        <button onClick={()=>setActiveDeleteId(null)}>No</button>
     </div>
     {message && 
        <p>{message}</p>
      }
    </div>
  );
};

export default Delete;