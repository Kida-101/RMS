import React, { useState } from "react";

const Form = ({ handleSubmit, currentSupplier, closeModal }) => {
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    contacts: "",
    email: "",
    stockType: "",
  });

  const [contacts, setContacts] = useState(currentSupplier.contacts || [""]);

  // Validation rules
  const validateName = (name) => {
    const regex = /^[A-Za-z\s'-]+$/;
    return regex.test(name);
  };

  const validateContact = (contact) => {
    const regex = /^(?:[+\-\s]*\d[+\-\s]*){10}$/;

    return regex.test(contact);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (value.length < 3) {
          return "Name must be at least 3 characters long.";
        }
        if (!validateName(value)) {
          return "Name can only contain letters, spaces, hyphens, and apostrophes.";
        }
        return "";
      case "contacts":
        if (value.length === 0) {
          return "At least one contact is required.";
        }
        if (!value.every((contact) => validateContact(contact))) {
          return "Contacts can only contain 10 digits numbers, +, -, and spaces.";
        }

        return "";
      case "email":
        if (!validateEmail(value)) {
          return "Invalid email address.";
        }
        return "";
      case "address":
        if (value.length < 4) {
          return "Address must be at least 4 characters long.";
        }
        return value.trim() ? "" : "Address is required.";
      case "stockType":
        if (value.length < 3) {
          return "Stock type must be at least 3 characters long.";
        }
        return value.trim() ? "" : "Stock type is required.";
      default:
        return "";
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "contacts") {
      const updatedContacts = [...contacts];
      updatedContacts[index] = value;
      setContacts(updatedContacts);
    } else {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const address = formData.get("address");
    const email = formData.get("email");
    const stockType = formData.get("stockType");

    const nameError = validateField("name", name);
    const addressError = validateField("address", address);
    const emailError = validateField("email", email);
    const stockTypeError = validateField("stockType", stockType);
    const contactsError = validateField("contacts", contacts);

    setErrors({
      name: nameError,
      address: addressError,
      contacts: contactsError,
      email: emailError,
      stockType: stockTypeError,
    });

    if (
      !nameError &&
      !addressError &&
      !contactsError &&
      !emailError &&
      !stockTypeError
    ) {
      // Add contacts to form data
      contacts.forEach((contact, index) => {
        formData.append(`contacts[]`, contact);
      });
      handleSubmit(formData);
    }
  };

  // Add a new contact field
  const addContactField = () => {
    setContacts([...contacts, ""]);
  };

  // Remove a contact field
  const removeContactField = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {currentSupplier.id ? "Edit Supplier" : "Add Supplier"}
        </h2>

        {/* Form */}
        <form
          action={handleSubmit}
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          {/* Supplier Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Supplier Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={currentSupplier.name}
              placeholder="Enter supplier name"
              className={`w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              defaultValue={currentSupplier.address}
              placeholder="Enter address"
              className={`w-full px-4 py-3 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={currentSupplier.email}
              placeholder="Enter email"
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contacts */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Contacts
            </label>
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name="contacts"
                  value={contact}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter contact info"
                  className={`w-full px-4 py-3 border ${
                    errors.contacts ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  required
                />
                {contacts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContactField(index)}
                    className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addContactField}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Add Contact
            </button>
            {errors.contacts && (
              <p className="text-red-500 text-sm mt-1">{errors.contacts}</p>
            )}
          </div>

          {/* Type of Stock Supplied */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Type of Stock Supplied
            </label>
            <input
              type="text"
              name="stockType"
              defaultValue={currentSupplier.stockType}
              placeholder="Enter stock type"
              className={`w-full px-4 py-3 border ${
                errors.stockType ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.stockType && (
              <p className="text-red-500 text-sm mt-1">{errors.stockType}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-3 bg-green-500 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer`}
            >
              {currentSupplier.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
