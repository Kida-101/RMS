// import "./menu.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 500,
    category: "Pizza",
    image: "../../src/assets/food-items/Margherita Pizza.jfif",
    description: "mozzarella cheese, fresh basil, and tomato sauce.",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 600,
    category: "Pizza",
    image: "../../src/assets/food-items/Pepperoni Pizza.jfif",
    description: "topped pepperoni and melted mozzarella cheese.",
  },
  {
    id: 3,
    name: "Veggie Burger",
    price: 400,
    category: "Burger",
    image: "../../src/assets/food-items/Veggie Burger.jfif",
    description: "fresh vegetables, cheese, and a savory sauce.",
  },
  {
    id: 4,
    name: "Cheese Burger",
    price: 700,
    category: "Burger",
    image: "../../src/assets/food-items/Cheese Burger.jfif",
    description: "fresh lettuce, tomatoes, cheese, and a grilled patty.",
  },
  {
    id: 5,
    name: "Spaghetti Carbonara",
    price: 200,
    category: "Pasta",
    image: "../../src/assets/food-items/Spaghetti Carbonara.jfif",
    description: "bacon, eggs, and Parmesan.",
  },
  {
    id: 6,
    name: "Chicken Alfredo",
    price: 900,
    category: "Pasta",
    image: "../../src/assets/food-items/Chicken Alfredo.jfif",
    description: "grilled chicken and Alfredo sauce.",
  },
  {
    id: 7,
    name: "Mirinda",
    price: 40,
    category: "Soft-Drinks",
    image: "../../src/assets/food-items/Mirinda.jfif",
    description: "A citrus-flavored carbonated a refreshing taste.",
  },
  {
    id: 8,
    name: "Coca-Cola",
    price: 40,
    category: "Soft-Drinks",
    image: "../../src/assets/food-items/Coca-Cola.jfif",
    description: "A classic cola drink with a unique taste flavour.",
  },
  {
    id: 9,
    name: "Sprite",
    price: 40,
    category: "Soft-Drinks",
    image: "../../src/assets/food-items/sprite.jfif",
    description: "A lemon-lime flavored carbonated drink with a crisp.",
  },
  {
    id: 10,
    name: "Fanta",
    price: 40,
    category: "Soft-Drinks",
    image: "../../src/assets/food-items/fanta.jfif",
    description: "A fruity and refreshing orange soda.",
  },
  {
    id: 11,
    name: "Tea",
    price: 20,
    category: "Hot-Drinks",
    image: "../../src/assets/food-items/tea.jfif",
    description: "A hot cup of tea made with fresh tea leaves.",
  },
  {
    id: 12,
    name: "Coffee",
    price: 20,
    category: "Hot-Drinks",
    image: "../../src/assets/food-items/coffee.jfif",
    description:
      "A freshly brewed cup of coffee, perfect for a caffeine boost.",
  },
  {
    id: 13,
    name: "Macchiato",
    price: 50,
    category: "Hot-Drinks",
    image: "../../src/assets/food-items/Macchiato.jfif",
    description: "espresso drink with a small amount of steamed milk.",
  },
  {
    id: 14,
    name: "Spiced Coffee",
    price: 40,
    category: "Hot-Drinks",
    image: "../../src/assets/food-items/Spiced Coffee.jfif",
    description: "A coffee drink infused with warm spices like cinnamon.",
  },
];

const categories = [
  { name: "All", icon: "fas fa-th" },
  { name: "Pizza", icon: "fas fa-pizza-slice" },
  { name: "Burger", icon: "fas fa-hamburger" },
  { name: "Pasta", icon: "fas fa-utensils" },
  { name: "Soft-Drinks", icon: "fas fa-cocktail" },
  { name: "Hot-Drinks", icon: "fas fa-coffee" },
];

const Menu = ({ sendDataToParent }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const unSelect = (itemToRemove) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
 const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + (parseFloat(item.price) || 0) * item.quantity,
      0
    );
  };
               
  const handleConfirmOrder = () => {
    if (cart.length === 0) return;

    const orderData = {
      totalPrice: calculateTotalPrice(),
      items: cart.map((item) => `${item.quantity}-${item.name}`),
      orderDate: new Date().toISOString(),
    };

    console.log("sendDataToParent:", sendDataToParent);
    if (sendDataToParent) {
      sendDataToParent(orderData);
      console.log("Order Data sent to parent:", orderData);
    } else {
      console.error("sendDataToParent is not defined!");
    }

    setSuccessMessage("Order selected successfully!");

    setTimeout(() => {
      setCart([]);
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="max-w-[1800px] p-5 bg-gray-200/40 rounded-lg shadow-lg mx-auto text-center">
      <h1 className="text-green-600 text-center text-4xl font-bold">
        Restaurant Menu
      </h1>
      <div className="mb-3">
        <div class="relative">
          <div class="absolute inset-y-10 start-2 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[97%] p-2 pl-7 pr-10  mt-5 rounded-lg border-2 border-white focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/50 transition-all"
          />
        </div>{" "}
      </div>

      <div className="flex flex-wrap sm:flex-row flex-col justify-center items-center gap-2 mb-2 py-5 px-6 rounded-full bg-transparent text-green-600 cursor-pointer">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-3 py-1 text-sm border-2 border-green-600 text-white rounded-full transition-colors duration-300 hover:bg-green-600 hover:text-white ${
              selectedCategory === category.name
                ? "bg-green-600 text-white"
                : ""
            }`}
          >
            <i className={category.icon}></i>&nbsp;&nbsp;
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex-1 min-w-[200px] max-w-[195px] bg-gray-200/70 p-4 rounded-lg shadow-md text-center hover:scale-105 transition-transform"
            >
              <div className="food-item-lists">
                <div className="flex justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[110px] h-[110px] object-cover rounded-full border-2 border-green-600 hover:rotate-3 transition-transform"
                  />
                </div> 
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="italic text-sm text-center">{item.description}</p>
                <div className="flex flex-row gap-2 items-center justify-center w-full mt-2">
                  <p className="text-green-600 font-bold text-sm">
                    {item.price} ETB
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-1 border-2 border-green-600 text-green-600 rounded-full transition-colors duration-300 hover:bg-green-600 hover:text-white"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <div className="mt-5 p-4 bg-gray-200/70 rounded-lg">
        <h3 className="text-green-600 text-center">Selected Items</h3>
        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}
        {cart.length === 0 ? (
          <p>No selected items</p>
        ) : (
          <ul className="list-none p-0 m-0">
            {cart.map((item, index) => (
              <li key={index} className="justify-between items-center">
                {item.name} - {item.quantity} × {item.price} ETB =
                <strong> {item.quantity * item.price} ETB</strong>
                <i
                  className="fa-solid fa-trash text-green-600 pl-2 cursor-pointer"
                  onClick={() => unSelect(item)}
                ></i>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <h4 className="text-center mt-2 text-green-600">
            Total Price: {calculateTotalPrice()} ETB
          </h4>
        )}

        <button
          className="bg-green-600 text-white px-5 py-2 rounded-md mt-3 hover:bg-green-700"
          type="submit"
          onClick={handleConfirmOrder}
        >
          Confirm selection
        </button>
      </div>
    </div>
  );
};

export default Menu;
