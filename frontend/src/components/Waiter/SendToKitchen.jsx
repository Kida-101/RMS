import React, { useState, useEffect } from "react";

// Mock menu data (replace with your actual menu items)
const mockMenuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 500,
    category: "Pizza",
    description: "mozzarella cheese, fresh basil, and tomato sauce."
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 600,
    category: "Pizza",
    description: "topped pepperoni and melted mozzarella cheese."
  },
  // Add more items as needed
];

const ReceiveFromCustomer = () => {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [selectedTable, setSelectedTable] = useState("");
  const [cart, setCart] = useState([]);
  const [orderSent, setOrderSent] = useState(false);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('waiterCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('waiterCart', JSON.stringify(cart));
  }, [cart]);

  // Add item to order
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      const newCart = existing ? 
        prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i) :
        [...prev, { 
          id: item.id, 
          name: item.name, 
          quantity: 1 
        }];
      return newCart;
    });
  };

  // Send to kitchen (mock version)
  const sendToKitchen = () => {
    if (!selectedTable || cart.length === 0) return;

    const kitchenOrder = {
      table: selectedTable,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      })),
      timestamp: new Date().toISOString()
    };

    // Mock "sending" to kitchen
    console.log("Order sent to kitchen:", kitchenOrder);
    alert(`Order for Table ${selectedTable} has been received by the kitchen!`);
    
    // Save to localStorage as "kitchenOrders"
    const existingOrders = JSON.parse(localStorage.getItem('kitchenOrders') || '[]');
    localStorage.setItem('kitchenOrders', JSON.stringify([...existingOrders, kitchenOrder]));
    
    setOrderSent(true);
    setCart([]);
    localStorage.removeItem('waiterCart');
  };

  // Start new order
  const startNewOrder = () => {
    setOrderSent(false);
    setSelectedTable("");
  };

  return (
    <div className="waiter-interface" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Waiter Order System</h2>
      
      {!orderSent ? (
        <>
          {/* Table Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Select Table: </label>
            <select 
              value={selectedTable} 
              onChange={(e) => setSelectedTable(e.target.value)}
              style={{ padding: '8px', width: '100%' }}
            >
              <option value="">Select Table</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>Table {num}</option>
              ))}
            </select>
          </div>

          {/* Menu Display */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {menuItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => addToCart(item)}
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ margin: '0', color: '#666' }}>{item.price} ETB</p>
              </div>
            ))}
          </div>

          {/* Order Preview */}
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '15px',
            marginTop: '20px'
          }}>
            <h3 style={{ marginTop: '0' }}>Order for {selectedTable || "No Table Selected"}</h3>
            
            {cart.length === 0 ? (
              <p>No items selected</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {cart.map(item => (
                  <li key={item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '5px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCart(cart.filter(i => i.id !== item.id));
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'red',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            
            <button 
              onClick={sendToKitchen} 
              disabled={!selectedTable || cart.length === 0}
              style={{
                marginTop: '15px',
                padding: '10px 15px',
                backgroundColor: selectedTable && cart.length ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: selectedTable && cart.length ? 'pointer' : 'not-allowed'
              }}
            >
              Send to Kitchen
            </button>
          </div>
        </>
      ) : (
        <div style={{ 
          textAlign: 'center',
          padding: '20px',
          border: '1px solid #28a745',
          borderRadius: '5px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ color: '#28a745' }}>Order for Table {selectedTable} Sent Successfully!</h3>
          <p>The kitchen has received your order.</p>
          <button 
            onClick={startNewOrder}
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Start New Order
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceiveFromCustomer;