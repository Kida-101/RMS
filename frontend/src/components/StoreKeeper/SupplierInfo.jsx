import React, { useState, useActionState } from "react";
import Card from "./Card";
import Form from "./Form";
import ConfirmationPopup from "./ConfirmationPopup";

const SupplierInfo = ({ suppliersInfo }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedId, setDeleteId] = useState();
  const [suppliers, setSuppliers] = useState(suppliersInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState({
    id: null,
    name: "",
    address: "",
    contacts: [],
    stockType: "",
  });

  // Open modal for adding/editing supplier
  const openModal = (supplier = null) => {
    if (supplier) {
      setCurrentSupplier(supplier); // Edit mode
    } else {
      setCurrentSupplier({
        id: null,
        name: "",
        address: "",
        contacts: [],
        stockType: "",
        email: "",
      }); // Add mode
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission using React 19 form action
  const handleSubmit = async (formData) => {
    const newSupplier = {
      id: currentSupplier.id || suppliers.length + 1,
      name: formData.get("name"),
      address: formData.get("address"),
      contacts: formData.getAll("contacts[]"),
      stockType: formData.get("stockType"),
      email: formData.get("email"),
    };
    console.log(newSupplier);
    if (currentSupplier.id) {
      setSuppliers(
        suppliers.map((supplier) =>
          supplier.id === currentSupplier.id ? newSupplier : supplier
        )
      );
    } else {
      setSuppliers([...suppliers, newSupplier]);
    }
    closeModal();
  };
  const handleDeleteClick = (id) => {
    setShowConfirmation(true);
    setDeleteId(id);
  };
  const handleConfirmDelete = () => {
    deleteSupplier(deletedId);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
  };

  return (
    <div className="p-4  ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Stock Supplier Info
      </h2>

      {/* Add Supplier Button */}
      <button
        onClick={() => openModal()}
        className="bg-[#3447AA]  text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Add Supplier
      </button>

      <div className="flex flex-wrap  gap-4">
        {suppliers.map((supplier) => (
          <Card
            key={supplier.id}
            supplier={supplier}
            openModal={openModal}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      {isModalOpen && (
        <Form
          handleSubmit={handleSubmit}
          currentSupplier={currentSupplier}
          closeModal={closeModal}
        />
      )}
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to delete this supplier?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default SupplierInfo;
