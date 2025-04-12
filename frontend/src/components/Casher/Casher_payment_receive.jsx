import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Base URL construction (ensure VITE_BACKEND_URL is set correctly)
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/casher/casher_payment_receive`;

function Casher_payment_receive() {
    const [unpaidOrders, setUnpaidOrders] = useState([]);
    const [loading, setLoading] = useState(false); // Optional: Add loading state
    const [error, setError] = useState(null);     // Optional: Add error state for fetching

    // Fetch unpaid orders on component mount
    useEffect(() => {
        const fetchUnpaidOrders = async () => {
            setLoading(true); // Start loading
            setError(null);   // Clear previous errors
            try {
                // Use axios.get - response data is directly in response.data
                const response = await axios.get(`${API_BASE_URL}/unpaid`);
                setUnpaidOrders(response.data || []); // Set fetched data, ensure it's an array
            } catch (err) {
                console.error('Error fetching unpaid orders:', err);
                setError('Failed to load unpaid orders.'); // Set error state
                 // More specific error handling if needed:
                 // if (err.response) { setError(`Server Error: ${err.response.status}`); }
                 // else if (err.request) { setError('Network Error. Please try again.'); }
                 // else { setError('An unexpected error occurred.'); }
                setUnpaidOrders([]); // Clear orders on error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUnpaidOrders();
    }, []); // Empty dependency array ensures it runs only once on mount

    // Handle marking an order as paid
    const handleMarkAsPaid = async (sale_id) => {
        // Optional: Prevent double-clicking
        // setLoading(true); // You might want a specific loading state per button

        try {
            // Use axios.post - second argument is the request body
            // Axios automatically sets Content-Type to application/json
            const response = await axios.post(`${API_BASE_URL}/paid`, { sale_id });

            // Axios considers non-2xx responses as errors, handled by catch block.
            // If we reach here, it was successful (2xx status).
            alert(response.data.message || 'Order marked as paid successfully!'); // Notify success using message from backend

            // Update the state to remove the paid order from the UI
            setUnpaidOrders((prevOrders) =>
                prevOrders.filter((order) => order.sale_id !== sale_id)
            );

        } catch (err) {
            console.error('Error marking as paid:', err);
            // Extract error message: Check backend response first, then Axios message
            let errorMessage = 'Failed to mark order as paid.';
            if (err.response && err.response.data && err.response.data.error) {
                errorMessage = err.response.data.error; // Use specific error from backend
            } else if (err.message) {
                errorMessage = err.message; // Use Axios/network error message
            }
            alert(`Error: ${errorMessage}`); // Show error alert
        } finally {
             // setLoading(false); // Reset button-specific loading state if used
        }
    };

    // --- Render Logic ---

    if (loading) {
        return <div className="p-5 text-center">Loading unpaid orders...</div>;
    }

    if (error) {
         return <div className="p-5 text-center text-red-600">Error: {error}</div>;
    }

    return (
        // Using overflow-y-auto on the container allows scrolling if content exceeds screen height
        <div className='Kitchen_Assign_Order_contener grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 bg-gray-100 h-screen overflow-y-auto'>
            {unpaidOrders.length > 0 ? (
                unpaidOrders.map((order) => (
                    // Added h-fit to make cards size to content if grid cell is tall
                    <div key={order.sale_id} className="single_recived_order w-full h-fit bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-101 flex flex-col">
                        <h2 className="text-lg text-gray-800 font-semibold mb-2">Pending Payment</h2>
                        {/* Use flex-grow to make list take available space */}
                        <ul className="list-none p-0 flex-grow">
                            <li className="text-gray-600 border-b border-gray-300 py-2">
                                <span className="font-medium text-gray-700">Table:</span> {order.table || 'N/A'}
                            </li>
                            <li className="text-gray-600 border-b border-gray-300 py-2">
                                 <span className="font-medium text-gray-700">Waiter:</span> {order.waiter_name || 'N/A'} {/* Assuming field is waiter_name */}
                            </li>
                             {/* Assuming food_items is an array */}
                             <li className="text-gray-600 border-b border-gray-300 py-2">
                                <span className="font-medium text-gray-700">Items:</span>
                                {Array.isArray(order.food_items) ? order.food_items.join(', ') : (order.food_items || 'N/A')}
                             </li>
                            <li className="text-gray-600 py-2 font-semibold text-lg">
                                <span className="font-medium text-gray-700">Total:</span> {parseFloat(order.total_amount || 0).toFixed(2)} Birr
                            </li>
                        </ul>
                         {/* Use mt-auto to push button to bottom */}
                        <button
                            onClick={() => handleMarkAsPaid(order.sale_id)}
                            className="assign_shafe mt-3 w-full p-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            // Optional: disable button while processing
                            // disabled={loading}
                        >
                            Mark as Paid
                        </button>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500 mt-10"> {/* Ensure message spans grid */}
                    <p>No unpaid orders found for today.</p>
                </div>
            )}
        </div>
    );
}

export default Casher_payment_receive;