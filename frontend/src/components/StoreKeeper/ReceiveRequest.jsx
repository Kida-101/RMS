import React, { useEffect, useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import ReasonPopup from "./ReasonPopup";

const ReceiveRequest = () => {
  // Sample data for restaurant stock requests
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [updateRequest, setUpdateRequest] = useState();
  const [updateIndex, setUpdateIndex] = useState();
  const [status, setStatus] = useState();

  const [requests, setRequests] = useState([
    {
      id: 1,
      data: [
        { item: "Tomatoes", quantity: 20, status: "Pending" },
        { item: "Chicken Breast", quantity: 15, status: "Pending" },
      ],
      remark: "dfahlsdfj",
      requester: "Kitchen",
      status: "Pending", // Possible statuses: Pending, Handed, OutOfStock
    },
    {
      id: 2,
      data: [
        { item: "Tomatoes", quantity: 20, status: "Pending" },
        { item: "Tomatoes", quantity: 20, status: "Pending" },
        { item: "Tomatoes", quantity: 20, status: "Pending" },

        { item: "Chicken Breast", quantity: 15, status: "Pending" },
      ],
      requester: "Grill Station",
      status: "Pending",
      remark: "dfahlsdfj",
    },
    {
      id: 3,
      data: [
        { item: "Tomatoes", quantity: 20, status: "Pending" },
        { item: "Chicken Breast", quantity: 15, status: "Pending" },
      ],
      requester: "Salad Station",
      status: "Pending",
      remark: "dfahlsdfj",
    },
    {
      id: 4,
      data: [
        { item: "Tomatoes", quantity: 20, status: "Pending" },
        { item: "Chicken Breast", quantity: 15, status: "Pending" },
      ],
      requester: "Sous Chef",
      status: "Pending",
      remark: "dfahlsdfj",
    },
    {
      id: 5,
      data: [
        { item: "Tomatoes", quantity: 20, status: "Pending" },
        { item: "Chicken Breast", quantity: 15, status: "Pending" },
      ],
      requester: "Italian Station",
      status: "Pending",
      remark: "dfahlsdfj",
    },
  ]);

  // Function to handle the handed over
  const handleResponse = (req, itemId, status) => {
    setStatus(status);
    setUpdateRequest(req);
    setUpdateIndex(itemId);
    setShowConfirmation(true);
  };

  const handleConfirmUpdate = () => {
    updateStatus(updateRequest?.id, updateIndex);
    setShowConfirmation(false);
    setStatus(null);
    setUpdateIndex(null);
  };

  const handleCancelPopup = () => {
    setShowConfirmation(false);
    setStatus(null);
    setUpdateIndex(null);
  };

  const updateStatus = (id, itemId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id === id) {
          const updatedData = request.data.map((item, index) =>
            index === itemId ? { ...item, status } : item
          );

          const allHanded = updatedData.every(
            (item) => item.status === "Handed"
          );

          const allResponded = updatedData.every(
            (item) => item.status === "Handed" || item.status === "OutOfStock"
          );

          let newRequestStatus = request.status;
          if (allHanded) {
            newRequestStatus = "Handed";
          } else if (allResponded) {
            newRequestStatus = "Responded";
          }

          return { ...request, data: updatedData, status: newRequestStatus };
        }
        return request;
      })
    );
  };

  // Function to handle the out of stock
  const OutOfStockHandler = (req, itemId, status) => {
    setStatus(status);
    setUpdateRequest(req);
    setUpdateIndex(itemId);
    setShowReasonPopup(true);
  };

  const handleReason = (reason) => {
    sendReason(updateRequest?.id, reason);
    setStatus(null);
    setUpdateIndex(null);
    setShowReasonPopup(false);
  };

  const handleCancelReasonPopup = () => {
    setStatus(null);
    setUpdateIndex(null);
    setShowReasonPopup(false);
  };

  const sendReason = (id, reason) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id === id) {
          const updatedData = request.data.map((item, index) =>
            index === updateIndex ? { ...item, status, reason } : item
          );

          const allOutOfStock = updatedData.every(
            (item) => item.status === "OutOfStock"
          );
          const allResponded = updatedData.every(
            (item) => item.status === "Handed" || item.status === "OutOfStock"
          );

          let newRequestStatus = request.status;

          if (allOutOfStock) {
            newRequestStatus = "OutOfStock";
          } else if (allResponded) {
            newRequestStatus = "Responded";
          }
          return { ...request, data: updatedData, status: newRequestStatus };
        }
        return request;
      })
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
        {requests.map(
          (request) =>
            request.status === "Pending" && (
              <div
                key={request.id}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex flex-wrap justify-items-normal items-center ">
                  {request.data.map((data, index) => (
                    <div key={index}>
                      {data.status === "Pending" && (
                        <>
                          <h3 className="text-md font-semibold">{data.item}</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Quantity:</span>{" "}
                            {` ${data.quantity}`}
                          </p>
                          <div className="space-x-2">
                            {data.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleResponse(request, index, "Handed")
                                  }
                                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                                >
                                  Handed Over
                                </button>
                                <button
                                  onClick={() =>
                                    OutOfStockHandler(
                                      request,
                                      index,
                                      "OutOfStock"
                                    )
                                  }
                                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm cursor-pointer mr-9"
                                >
                                  Out of Stock
                                </button>
                              </>
                            )}
                            {request.status === "Handed" && (
                              <span className="text-green-600 text-sm">
                                Handed Over
                              </span>
                            )}
                            {request.status === "OutOfStock" && (
                              <span className="text-red-600 text-sm">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600 my-2">
                      <span className="font-medium">Remark:</span>{" "}
                      {` ${request.remark}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Requester:</span>{" "}
                      {` ${request.requester}`}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {showConfirmation && (
        <ConfirmationPopup
          message={`Are you sure you want to Handed over ${updateRequest?.item} to ${updateRequest?.requester} ?`}
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
