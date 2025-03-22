import React, { useEffect, useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import ReasonPopup from "./ReasonPopup";

const ReceiveRequest = () => {
  // Sample data for restaurant stock requests
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [updateRequest, setUpdateRequest] = useState();
  const [status, setStatus] = useState();

  const [requests, setRequests] = useState([
    {
      id: 1,
      item: "Tomatoes",
      quantity: 20,
      requester: "Kitchen",
      status: "Pending", // Possible statuses: Pending, Handed, OutOfStock
    },
    {
      id: 2,
      item: "Chicken Breast",
      quantity: 15,
      requester: "Grill Station",
      status: "Pending",
    },
    {
      id: 3,
      item: "Lettuce",
      quantity: 10,
      requester: "Salad Station",
      status: "Pending",
    },
    {
      id: 4,
      item: "Olive Oil",
      quantity: 5,
      requester: "Sous Chef",
      status: "Pending",
    },
    {
      id: 5,
      item: "Pasta",
      quantity: 30,
      requester: "Italian Station",
      status: "Pending",
    },
  ]);

  // Function to handle the handed over
  const handleResponse = (req, status) => {
    setStatus(status);
    setUpdateRequest(req);
    setShowConfirmation(true);
  };
  const handleConfirmUpdate = () => {
    updateStatus(updateRequest?.id);
    setShowConfirmation(false);
  };

  const handleCancelPopup = () => {
    setShowConfirmation(false);
  };
  const updateStatus = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };
  // Function to handle the out of stock
  const OutOfStockHandler = (req, status) => {
    setStatus(status);
    setUpdateRequest(req);
    setShowReasonPopup(true);
  };
  const handleReason = (reason) => {
    sendReason(updateRequest?.id, reason);
    setShowReasonPopup(false);
  };

  const handleCancelReasonPopup = () => {
    setShowReasonPopup(false);
  };
  const sendReason = (id, reason) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status, reason } : request
      )
    );
  };
  // useEffect(() => {
  //   console.log(requests);
  // }, [requests]);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Receive Request and Hand Over Items
      </h2>

      {/* List of stock requests */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-semibold">{request.item}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {request.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Requester: {request.requester}
                </p>
              </div>
              <div className="space-x-2">
                {request.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleResponse(request, "Handed")}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                    >
                      Handed Over
                    </button>
                    <button
                      onClick={() => OutOfStockHandler(request, "OutOfStock")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                    >
                      Out of Stock
                    </button>
                  </>
                )}
                {request.status === "Handed" && (
                  <span className="text-green-600 text-sm">Handed Over</span>
                )}
                {request.status === "OutOfStock" && (
                  <span className="text-red-600 text-sm">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <ConfirmationPopup
          message={`Are you sure you want to Handed over this to ${updateRequest?.requester} ?`}
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelPopup}
        />
      )}
      {showReasonPopup && (
        <ReasonPopup
          message={``}
          onConfirm={handleReason}
          onCancel={handleCancelReasonPopup}
        />
      )}
    </div>
  );
};

export default ReceiveRequest;
