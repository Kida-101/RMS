import React, { useState } from 'react';
import './Kitchen_request.css';

function Kitchen_request() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [remark, setRemark] = useState(''); 
  const [items, setItems] = useState([]);
  const suggestedProducts = ['Rice', 'Tomatoes', 'Chicken', 'Onions', 'Spices','banana','Cornflower'];
  const [Rquste_id, setRquste_id] = useState(''); 
  const addItem = () => {
    if (productName && quantity) {
      const existingItemIndex = items.findIndex((item) => item.name === productName);
      if (existingItemIndex !== -1) {
        const confirmed = window.confirm(
          `${productName} is already in the list. Do you want to add the quantity to the existing one?`
        );
        if (confirmed) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity =
            parseInt(updatedItems[existingItemIndex].quantity) + parseInt(quantity);
          setItems(updatedItems);
        } else {
          return;
        }
      } else {
        setItems([...items, { name: productName, quantity }]);
      }
      setProductName('');
      setQuantity('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length > 0) {
      const dataToSubmit = { items, remark }; // Data to send to the backend
      console.log('Submitting:', dataToSubmit); // Replace with actual backend call
      alert('Stock request submitted successfully!');
      setItems([]);
      setRemark('');
    } else {
      alert('Please add at least one item to the list before submitting.');
    }
  };

  return (
    <div className="Kitchen_request_container">
      <form onSubmit={handleSubmit} className="Kitchen_request_form">
        <legend>Stock Request Form</legend>
        <label htmlFor='requste_id'>Requst ID</label>
          <input type="text" id='requste_id' placeholder='Request ID' value={Rquste_id} onChange={(e) => setRquste_id(e.target.value)} required/>
        <label htmlFor="product_name">Product Name:</label>
        <input
          type="text"
          id="product_name"
          list="suggestedProducts"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <datalist id="suggestedProducts">
          {suggestedProducts.map((product, index) => (
            <option key={index} value={product} />
          ))}
        </datalist>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button
          className="Kitchen_request_add_button"
          type="button"
          onClick={addItem}
        >
          Add to List
        </button>
        <div className="Kitchen_request_item_list">
          <h3>Items to be Requested:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="Kitchen_request_list_item">
                <span>{item.name} - {item.quantity}</span>
              </li>
            ))}
          </ul>
          <label htmlFor="remark">Remark:</label>
          <textarea
            id="remark"
            placeholder="Add a remark for all items"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="Kitchen_request_remark_textarea"
            rows="4" // Adjust rows for desired height
          />
        </div>
        <button className="Kitchen_request_submit_button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Kitchen_request;
