import React, {useState, useEffect} from "react";
import Delete from "../delete/Delete";
import './creditCardList.css'
import EditForm from "../form/EditForm";
import axios from 'axios';
import { format } from 'date-fns';
import CreditCardForm from "../form/Form";
function CreditCardList() {
  const [creditCards, setCreditCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([])
  const [pagination, setPagination] = useState({});
  const [activeDeleteId, setActiveDeleteId] = useState(null);
  const [edit, setEdit] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/creditcards?page=${page}&limit=9`);
        setCreditCards(response.data.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching credit cards:', error);
      }
    };

    fetchCreditCards();
  }, [page,creditCards]);

  useEffect(() => {
    const filterCards = () => {
      const query = searchQuery.toLowerCase();
      const filtered = creditCards.filter(card =>
        card.bank_name.toLowerCase().includes(query) ||
        card.credit_card_name.toLowerCase().includes(query)
      );
      setFilteredCards(filtered);
    };

    filterCards();
  }, [searchQuery, creditCards]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const toggleDelete = (id) => {
    setActiveDeleteId(activeDeleteId === id ? null : id);
  };

  const toggleEdit = (id) => {
    setEdit(edit === id ? null : id);
  };

  return (
    <div>
          <div className="credit-cards-header">
        <h1>Credit Cards</h1>
        <div className="credit-cards-actions">
          <input type="text" 
          placeholder="Search by bank or card..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="add-card-wrapper">
            <button className="add-card-button" onClick={()=>setOpen(true)}>Add Card</button>
            {open &&
            <div className="add-card">
              <CreditCardForm setOpen={setOpen}/>
            </div>
            }
          </div>
        </div>
      </div>
      <table className="credit-card-table">
        <thead >
          <tr>
            <th>Id</th>
            <th>Bank Name</th>
            <th>Credit Card Name</th>
            <th>Created At</th>
            <th>Enabled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCards.map(card => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.bank_name}</td>
              <td>{card.credit_card_name}</td>
              <td>{format(card.created_at, 'MMMM dd, yyyy')}</td>
              <td className="checkbox"><input type="checkbox" onChange={()=>{}} value={card.enabled} checked={card.enabled}/></td>
              <td>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <div className="edit-wrapper">
                    <button onClick={() => toggleEdit(card.id)}>Edit</button>
                    {edit === card.id && (
                      <div className="edit-wrapper-content">
                        <EditForm card={card} setEdit={setEdit} />
                      </div>
                    )}
                  </div>
                  <div className="delete-wrapper">
                    <button onClick={() => toggleDelete(card.id)}>Delete</button>
                    {activeDeleteId === card.id && (
                      <div className="delete-wrapper-content">
                        <Delete id={card.id} setActiveDeleteId={setActiveDeleteId}/>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page} of {pagination.totalPages}</span>
        <button
          onClick={() => handlePageChange(page < pagination.totalPages ? page + 1 : pagination.totalPages)}
          disabled={page >= pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreditCardList;
