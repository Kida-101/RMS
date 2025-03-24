import React, { useState } from 'react';
import './Kitchen_Available_Menu.css';

function Kitchen_Available_Menu() {
  const [productName, setProductName] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const suggestedItems = ['Burger', 'Pizza', 'Pasta', 'Fries', 'Salad', 'Sandwich', 'Tacos', 'Noodles'];

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    
    if (value) {
      const filtered = suggestedItems.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setProductName(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className='Kitchen_Available_Menu_container'>
      <div className='Kitchen_Available_form'>
        <form>
          <label htmlFor="Select_menu_item">Select Menu Item</label>
          <input
            type="text"
            id="Select_menu_item"
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

          <button type="button">Search</button>

          <div className="Selected_menu_item">
            <form>
                <ul>
              <li><strong>Menu ID:</strong> bu001</li>
              <li><strong>Food Item:</strong> {productName || "None selected"}</li>
              <li><strong>Status:</strong> Unavailable</li>
              <li>
                <strong>Make Status:</strong>
                <select className='Kitchen_Available_selector'>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </li>
            </ul>
             <button type="button">update status</button>
            </form>
          </div>
        </form>
      </div>
      <div className='Kitchen_Available_menu_contener'>
        <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      <div className='Kitchen_Available_menu'>
        <li><strong>Menu ID:</strong> bu001</li>
        <li><strong>Food Item:</strong> {productName || "None selected"}</li>
        <li><strong>Status:</strong> Unavailable</li>
      </div>
      </div>
    </div>
  );
}

export default Kitchen_Available_Menu;
