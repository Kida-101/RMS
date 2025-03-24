import "./menu.css";
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
    image: "../../src/assets/food-items/Spaghetti Carbonara.jfif", // Image URL
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
    image: "../../src/assets/food-items/coffee.jfif", // Image URL
    description:
      "A freshly brewed cup of coffee, perfect for a caffeine boost.", // Description
  },
  {
    id: 13,
    name: "Macchiato",
    price: 50,
    category: "Hot-Drinks",
    image: "../../src/assets/food-items/Macchiato.jfif", // Image URL
    description: "espresso drink with a small amount of steamed milk.", // Description
  },
  {
    id: 14,
    name: "Spiced Coffee",
    price: 40,
    category: "Hot-Drinks",
    image: "../../src/assets/food-items/Spiced Coffee.jfif", // Image URL
    description: "A coffee drink infused with warm spices like cinnamon.", // Description
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

const Menu = () => {
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
    const navigate = useNavigate();

    const orderData = {
      totalPrice: calculateTotalPrice(),
      items: cart.map((item) => `${item.quantity}-${item.name}, `),
      orderDate: new Date().toISOString(),
    };
    navigate("/reservation", { state: { orderData } });
    console.log("Order Data being sent:", orderData);
    console.log("Order placed:", orderData);
    // alert("Order selected successfully!", orderData);
    setSuccessMessage("Order selected successfully!");

    setTimeout(() => {
      setCart([]);
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="menu-container">
      <h1
        style={{
          color: "#45a049",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bolder",
        }}
      >
        Restaurant Menu
      </h1>

      <div className="search-container search-box">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={selectedCategory === category.name ? "active" : ""}
          >
            <i className={category.icon}></i>&nbsp;&nbsp;
            {category.name}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-lists">
                <div className="food-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="food-image"
                  />
                </div>
                <h3 className="food-items-header">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <span className="price-slct-btn">
                  <div className="price-rating">
                    <p className="price">{item.price} ETB</p>
                  </div>
                  <div className="counter-container">
                    <button
                      onClick={() => addToCart(item)}
                      className="select-btn"
                    >
                      Select
                    </button>
                  </div>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <div className="selected-items">
        <h3 style={{ color: "#45a049", textAlign: "center" }}>
          Selected Items
        </h3>
        {successMessage && (
          <p style={{ color: "green", textAlign: "center" }}>
            {successMessage}
          </p>
        )}
        {cart.length === 0 ? (
          <p>No selected items</p>
        ) : (
          <ul className="list-items">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} × {item.price} ETB ={" "}
                <strong>{item.quantity * item.price} ETB</strong>
                <i
                  style={{
                    color: "#45a049",
                    paddingLeft: "5px",
                    cursor: "pointer",
                  }}
                  className="fa-solid fa-trash"
                  onClick={() => unSelect(item)}
                ></i>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <h4
            style={{ textAlign: "center", marginTop: "10px", color: "#45a049" }}
          >
            Total Price: {calculateTotalPrice()} ETB
          </h4>
        )}

        <button className="sub-odr" type="submit" onClick={handleConfirmOrder}>
          Confirm selection
        </button>
      </div>
    </div>
  );
};

export default Menu;
