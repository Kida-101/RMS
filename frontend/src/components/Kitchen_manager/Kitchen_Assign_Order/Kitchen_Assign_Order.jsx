import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function Kitchen_Assign_Order() {
  const [chefs, setChefs] = useState([]);

  // Simulate fetching chef names from an API
  useEffect(() => {
    // Replace this with an actual API call
    const fetchChefs = async () => {
      const chefNames = ['Abebe', 'Kebede', 'Chala', 'Mulu']; // Example data
      setChefs(chefNames.map((name) => ({ value: name.toLowerCase(), label: name })));
    };

    fetchChefs();
  }, []);

  const handleSelectChange = (selectedOption) => {
    console.log('Selected Chef:', selectedOption);
  };

  return (
    <div className="Kitchen_Assign_Order_contener grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-h-screen overflow-y-auto">
      <div className="single_recived_order w-full bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-101">
        <h2 className="text-lg text-gray-800 font-semibold mb-2">Pending Payment</h2>
        <ul className="list-none p-0">
          <li className="text-gray-600 border-b border-gray-300 py-2">Table: 02</li>
          <li className="text-gray-600 border-b border-gray-300 py-2">Waiter is:</li>
          <li className="text-gray-600 border-b border-gray-300 py-2">
            Food Items: Burger, Pizza, Sushi, Pasta, Tacos, Fried Chicken, Salad, Pancakes, Steak, and Ice Cream.
          </li>
          <li className="text-gray-600 py-2">Total Amount:</li>
        </ul>
        <Select
          options={chefs}
          onChange={handleSelectChange}
          placeholder="Select Chef"
          className="mt-2"
          menuPortalTarget={document.body} // Render the dropdown in a portal
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure it floats above other elements
          }}
        />
        <button className="assign_shafe mt-2 w-full p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700">
          Mark as Paid
        </button>
      </div>
    </div>
  );
}

export default Kitchen_Assign_Order;