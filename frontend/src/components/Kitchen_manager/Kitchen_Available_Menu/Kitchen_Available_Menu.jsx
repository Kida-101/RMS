import React, { useState } from "react";
import Select from "react-select";

function Kitchen_Available_Menu() {
  const [productName, setProductName] = useState("");
  const suggestedItems = [
    "Burger",
    "Pizza",
    "Pasta",
    "Fries",
    "Salad",
    "Sandwich",
    "Tacos",
    "Noodles",
  ];

  // Format suggested items for react-select
  const options = suggestedItems.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));

  const handleSelectChange = (selectedOption) => {
    setProductName(selectedOption ? selectedOption.label : "");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-5 bg-gray-100 h-screen overflow-y-auto">
      {/* LEFT SIDE: FORM SECTION */}
      <div className="w-full lg:w-1/3 bg-white p-5 rounded-lg shadow-lg">
        <form>
          <label
            htmlFor="Select_menu_item"
            className="block text-lg text-gray-800 font-medium mb-2"
          >
            Select Menu Item
          </label>
          <Select
            options={options}
            onChange={handleSelectChange}
            placeholder="Select or type a menu item"
            className="w-full"
            menuPortalTarget={document.body} // Render the dropdown in a portal
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure it floats above other elements
            }}
          />

          <button
            type="button"
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md transition-all hover:bg-blue-700"
          >
            Search
          </button>

          {/* SELECTED ITEM DETAILS */}
          <div className="Selected_menu_item mt-6 p-4 bg-gray-50 rounded-lg shadow ">
            <ul className="list-none text-gray-700">
              <li className="py-2">
                <strong>Menu ID:</strong> bu001
              </li>
              <li className="py-2">
                <strong>Food Item:</strong> {productName || "None selected"}
              </li>
              <li className="py-2">
                <strong>Status:</strong> Unavailable
              </li>
            </ul>
            <button
              type="button"
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md transition-all hover:bg-blue-700"
            >
              Make unavailable
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE: MENU LIST */}
      <div className="w-full lg:w-2/3 bg-white p-5 rounded-lg shadow-lg max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Unavailable Menu Items
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(39)].map((_, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
              <ul className="list-none text-gray-700">
                <li className="py-2">
                  <strong>Menu ID:</strong> bu00{index + 1}
                </li>
                <li className="py-2">
                  <strong>Food Item:</strong> {productName || "None selected"}
                </li>
                <li className="py-2">
                  <strong>Status:</strong> Unavailable
                </li>
              </ul>
              <button
                type="button"
                className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md transition-all hover:bg-blue-700"
              >
                Make available
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kitchen_Available_Menu;
