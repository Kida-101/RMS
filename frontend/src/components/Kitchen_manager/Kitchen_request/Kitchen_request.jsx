import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function Kitchen_request() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [remark, setRemark] = useState('');
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Simulate fetching product names from an API
  useEffect(() => {
    // Replace this with an actual API call
    const fetchProducts = async () => {
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
      setProducts(suggestedProducts.map((product) => ({ value: product.toLowerCase(), label: product })));
    };

    fetchProducts();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setProductName(selectedOption ? selectedOption.label : '');
  };

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
      setQuantity('1');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length > 0) {
      const dataToSubmit = { items, remark };
      console.log('Submitting:', dataToSubmit);
      alert('Stock request submitted successfully!');
      setItems([]);
      setRemark('');
    } else {
      alert('Please add at least one item to the list before submitting.');
    }
  };

  return (
    <div className="flex justify-center items-center h-[97vh] p-5 overflow-hidden overflow-y-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[500px] border border-gray-200 relative">
        <legend className="text-2xl font-bold text-black mb-5 text-center">Stock Request Form</legend>

        <div className="mb-4">
          <label htmlFor="product_name" className="block text-sm text-gray-700 mb-2">Product Name:</label>
          <Select
            options={products}
            onChange={handleSelectChange}
            placeholder="Select or type a product"
            className="w-full"
            menuPortalTarget={document.body} // Render the dropdown in a portal
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure it floats above other elements
            }}
          />
        </div>

        <label htmlFor="quantity" className="block text-sm text-gray-700 mb-2">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-black"
        />

        <button
          type="button"
          onClick={addItem}
          className="w-full p-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
        >
          Add to List
        </button>

        <div className="mt-5">
          <h3 className="text-lg text-black mb-2">Items to be Requested:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="bg-gray-100 p-2 border border-gray-200 rounded-lg mb-2 flex justify-between items-center">
                <span>{item.name} - {item.quantity}</span>
              </li>
            ))}
          </ul>

          <label htmlFor="remark" className="block text-sm text-gray-700 mb-2">Remark:</label>
          <textarea
            id="remark"
            placeholder="Add a remark for all items"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows="4"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg font-medium mt-5 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Kitchen_request;
