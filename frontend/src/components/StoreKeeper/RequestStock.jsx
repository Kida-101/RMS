import React, { useActionState, useState, useEffect } from "react";
import RequestDetails from "./RequestDetails";

const RequestStock = ({ suppliersInfo, prefilledMaterial, onComplete }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [materials, setMaterials] = useState([
    { material: "", quantity: "", unit: "" },
  ]);

  useEffect(() => {
    if (prefilledMaterial && materials[0].material === "") {
      setMaterials([
        {
          material: prefilledMaterial.material,
          quantity: "",
          unit: prefilledMaterial.unit,
        },
      ]);
    }
  }, [prefilledMaterial]);

  const handleSubmit = (prevState, formData) => {
    const supplierId = formData.get("supplier");
    const selectedSupplier = suppliersInfo.find(
      (supplier) => supplier.id === parseInt(supplierId)
    );

    const items = materials.map((item) => ({
      material: item.material,
      quantity: item.quantity,
      unit: item.unit,
    }));

    setIsPopup(true);
    // console.log(items, "supplier", selectedSupplier);
    return {
      success: true,
      items,
      supplier: selectedSupplier,
    };
  };

  const [message, formAction, isPending] = useActionState(handleSubmit, null);

  const addMaterialField = () => {
    setMaterials([...materials, { material: "", quantity: "", unit: "" }]);
  };

  const removeMaterialField = (index) => {
    if (materials.length > 1) {
      const updatedMaterials = [...materials];
      updatedMaterials.splice(index, 1);
      setMaterials(updatedMaterials);
    }
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index][field] = value;
    setMaterials(updatedMaterials);
  };

  const closePopup = () => {
    setIsPopup(false);
    // onComplete();
  };

  const clearForm = () => {
    // onComplete();
    setMaterials([{ material: "", quantity: "", unit: "" }]);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-14">
        Request Stock Material from Suppliers
      </h2>
      <form className="w-fill sm:w-[60%]" action={formAction}>
        {materials.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">Material #{index + 1}</h3>
              {materials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMaterialField(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Material Name
              </label>
              <input
                type="text"
                name={`material-${index}`}
                value={item.material}
                onChange={(e) =>
                  handleMaterialChange(index, "material", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={3}
                maxLength={80}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name={`quantity-${index}`}
                value={item.quantity}
                onChange={(e) =>
                  handleMaterialChange(index, "quantity", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={1}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Unit
              </label>
              <input
                type="text"
                name={`unit-${index}`}
                value={item.unit}
                onChange={(e) =>
                  handleMaterialChange(index, "unit", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
          </div>
        ))}

        <div className="mb-4">
          <button
            type="button"
            onClick={addMaterialField}
            className="text-blue-500 text-sm mb-4 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Another Material
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select Supplier
          </label>
          <select
            name="supplier"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a supplier</option>
            {suppliersInfo.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="reset"
          onClick={clearForm}
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer mr-5"
        >
          Clear Form
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          {isPending ? "See Details..." : "See Details"}
        </button>
      </form>
      {isPopup && <RequestDetails data={message} closePopup={closePopup} />}
    </div>
  );
};

export default RequestStock;
