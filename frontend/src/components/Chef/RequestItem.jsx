import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RequestItem = ({ categoryStructure }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [showSubcategory, setShowSubcategory] = useState(false);

  const category = watch("category");
  const item = watch("name");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setValue("name", "");
    setValue("unit", "");
    setShowSubcategory(false);
  };

  const handleItemChange = (e) => {
    const value = e.target.value;
    setSelectedItem(value);

    if (categoryStructure[selectedCategory]?.subcategories?.[value]) {
      setShowSubcategory(true);
      setValue("unit", "");
    } else {
      setShowSubcategory(false);
      setValue("unit", categoryStructure[selectedCategory]?.units[value] || "");
    }
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    setValue(
      "unit",
      categoryStructure[selectedCategory]?.subcategories[selectedItem]?.units[
        value
      ] || ""
    );
  };

  const onSubmit = (data) => {
    console.log("Item requested:", data);
    // Here you would typically send the request to the storekeeper
    alert(
      `Request submitted: ${data.quantity} ${data.unit} of ${
        data.subcategory || data.name
      }`
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Request Item</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Selection */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            size={6}
            id="category"
            {...register("category", { required: "Category is required" })}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            {Object.keys(categoryStructure).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Item Selection */}
        {selectedCategory && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item
            </label>
            <select
              id="name"
              size={6}
              {...register("name", { required: "Item is required" })}
              onChange={handleItemChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Item</option>
              {categoryStructure[selectedCategory]?.items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              {Object.keys(
                categoryStructure[selectedCategory]?.subcategories || {}
              ).map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
            </select>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}

        {/* Subcategory Selection */}
        {showSubcategory && (
          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type/Variation
            </label>
            <select
              size={6}
              id="subcategory"
              {...register("subcategory", { required: "Type is required" })}
              onChange={handleSubcategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Type</option>
              {categoryStructure[selectedCategory]?.subcategories?.[
                selectedItem
              ]?.items.map((subItem) => (
                <option key={subItem} value={subItem}>
                  {subItem}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subcategory.message}
              </p>
            )}
          </div>
        )}

        {/* Quantity Input */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Unit Display */}
        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Unit
          </label>
          <input
            id="unit"
            type="text"
            {...register("unit")}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};
export default RequestItem;
