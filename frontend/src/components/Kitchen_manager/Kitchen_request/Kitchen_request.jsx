import React, { useState } from 'react';
import './Kitchen_request.css';

function Kitchen_request() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [remark, setRemark] = useState('');
  const [items, setItems] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [requestId, setRequestId] = useState('');

 const suggestedProducts = [
  "Rice", "Tomatoes", "Chicken", "Onions", "Spices", "Banana", "Cornflower",
  "Garlic", "Ginger", "Potatoes", "Carrots", "Cabbage", "Beef", "Pork", "Fish",
  "Milk", "Butter", "Cheese", "Eggs", "Yogurt", "Flour", "Sugar", "Salt",
  "Black Pepper", "Paprika", "Turmeric", "Oregano", "Basil", "Thyme", "Rosemary",
  "Lettuce", "Cucumber", "Spinach", "Broccoli", "Cauliflower", "Green Beans",
  "Mushrooms", "Pumpkin", "Zucchini", "Sweet Corn", "Lemon", "Lime", "Orange",
  "Apple", "Grapes", "Strawberries", "Blueberries", "Pineapple", "Mango",
  "Watermelon", "Coconut", "Avocado", "Peanuts", "Almonds", "Walnuts",
  "Cashews", "Honey", "Olive Oil", "Vegetable Oil", "Soy Sauce", "Vinegar",
  "Bread", "Pasta", "Noodles", "Lentils", "Chickpeas", "Black Beans", "Kidney Beans",
  "Green Peas", "Canned Tuna", "Canned Sardines", "Ketchup", "Mayonnaise",
  "Mustard", "Chili Powder", "Soy Milk", "Coconut Milk", "Tea Leaves",
  "Coffee Beans", "Instant Coffee", "Cocoa Powder", "Baking Powder",
  "Baking Soda", "Yeast", "Corn Starch", "Gelatin", "Whipping Cream",
  "Dark Chocolate", "White Chocolate", "Peanut Butter", "Jam", "Pickles",
  "Raisins", "Dates", "Sesame Seeds", "Sunflower Seeds", "Energy Drink",
  "Bottled Water", "Soft Drinks", "Ice Cream", "Yams", "Radish", "Celery"
];


  const addItem = () => {
    if (productName && quantity) {
      if (items.length >= 10) {
        alert('You can only add up to 10 items.');
        return;
      }

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
        }
      } else {
        setItems([...items, { name: productName, quantity }]);
      }

      setProductName('');
      setQuantity('');
      setFilteredSuggestions([]); // ✅ Close suggestions list after adding
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length > 0) {
      const dataToSubmit = { requestId, items, remark }; // ✅ Include request ID
      console.log('Submitting:', dataToSubmit);
      alert('Stock request submitted successfully!');
      setItems([]);
      setRemark('');
      setRequestId('');
    } else {
      alert('Please add at least one item to the list before submitting.');
    }
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    if (value) {
      const filtered = suggestedProducts
        .filter((product) => product.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // ✅ Limit suggestions to 5 items
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setProductName(suggestion);
    setFilteredSuggestions([]); // ✅ Close suggestions list when clicked
  };

  return (
    <div className="Kitchen_request_container">
      <form onSubmit={handleSubmit} className="Kitchen_request_form">
        <legend>Stock Request Form</legend>
        <label htmlFor='request_id'>Request ID</label>
        <input
          type="text"
          id='request_id'
          placeholder='Request ID'
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          required
        />

        <label htmlFor="product_name">Product Name:</label>
        <input
          type="text"
          id="product_name"
          value={productName}
          onChange={handleProductChange}
          required
        />
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button className="Kitchen_request_add_button" type="button" onClick={addItem}>
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
            rows="4"
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
