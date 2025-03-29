import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/stock-requests");
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setShowConfirmation(true);
  };

  const handleConfirmApproval = async () => {
    try {
      await axios.put(`http://localhost:5000/api/stock-requests/${selectedRequest.id}/approve`);
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req.id === selectedRequest.id ? { ...req, status: "Approved" } : req))
      );
      setShowConfirmation(false);
      setSelectedRequest(null);
    } catch (err) {
      setError("Failed to approve request");
    }
  };

  const handleReject = async (request) => {
    try {
      await axios.put(`http://localhost:5000/api/stock-requests/${request.id}/reject`);
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req.id === request.id ? { ...req, status: "Rejected" } : req))
      );
    } catch (err) {
      setError("Failed to reject request");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Manager Dashboard</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Review and approve stock requests before sending them to the storekeeper.
      </p>

      {loading && <p className="text-gray-500 text-center">Loading requests...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center">No requests available.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-md font-semibold">Request from {request.requester}</h3>
              <p className="text-sm text-gray-600">Remark: {request.remark}</p>
              <ul className="mt-2">
                {request.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-800">
                    {item.item} - {item.quantity} pcs
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                {request.status === "Pending" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApprove(request)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {request.status === "Approved" && (
                  <span className="text-green-600 text-sm">Approved</span>
                )}
                {request.status === "Rejected" && (
                  <span className="text-red-600 text-sm">Rejected</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="text-lg mb-4">Confirm approval for this request?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmApproval}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerRequests;
