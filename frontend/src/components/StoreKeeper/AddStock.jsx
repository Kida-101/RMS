import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddStock({
  handleAddItem,
  categoryStructure,
  onAddCategory,
  onAddSubcategory,
  onAddItem,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState({
    category: false,
    item: false,
    subcategory: false,
  });
  const [customInput, setCustomInput] = useState({
    category: "",
    item: "",
    subcategory: "",
    subcategoryItem: "",
    unit: "",
  });
  const [addingMode, setAddingMode] = useState("item"); // 'item' or 'subcategory'
  const [subcategoryCreationStep, setSubcategoryCreationStep] = useState(1); // 1: group name, 2: items

  // Watch form values
  const category = watch("category");
  const item = watch("name");

  // Toggle custom input visibility
  const toggleCustomInput = (field) => {
    setShowCustomInput((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    if (field === "category") {
      setSelectedCategory("");
      setValue("category", "");
    } else if (field === "item") {
      setSelectedItem("");
      setValue("name", "");
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setValue("name", "");
    setValue("unit", "");
    setShowSubcategory(false);
    setShowCustomInput({
      category: false,
      item: false,
      subcategory: false,
    });
    setAddingMode("item");
    setSubcategoryCreationStep(1);
  };

  // Handle item selection
  const handleItemChange = (e) => {
    const value = e.target.value;
    setSelectedItem(value);

    if (value === "__custom__") {
      setShowCustomInput((prev) => ({ ...prev, item: true }));
      setShowSubcategory(false);
      setValue("unit", "");
      setSubcategoryCreationStep(1);
    } else if (categoryStructure[selectedCategory]?.subcategories?.[value]) {
      setShowSubcategory(true);
      setShowCustomInput((prev) => ({ ...prev, subcategory: false }));
      setValue("unit", "");
    } else {
      setShowSubcategory(false);
      setValue("unit", categoryStructure[selectedCategory]?.units[value] || "");
    }
  };

  // Handle subcategory selection
  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    if (value === "__custom__") {
      setShowCustomInput((prev) => ({ ...prev, subcategory: true }));
      setValue("unit", "");
    } else {
      setValue(
        "unit",
        categoryStructure[selectedCategory]?.subcategories[selectedItem]?.units[
          value
        ] || ""
      );
    }
  };

  // Add new category
  const handleAddCategory = () => {
    if (customInput.category) {
      onAddCategory(customInput.category, []);
      setSelectedCategory(customInput.category);
      setValue("category", customInput.category);
      setShowCustomInput((prev) => ({ ...prev, category: false }));
      setCustomInput((prev) => ({ ...prev, category: "" }));
    }
  };

  // Add new item
  const handleAddItemToCategory = () => {
    if (addingMode === "subcategory") {
      if (subcategoryCreationStep === 1) {
        // Step 1: Create the subcategory group
        if (customInput.item && selectedCategory) {
          onAddSubcategory(selectedCategory, customInput.item, []);
          setValue("name", customInput.item);
          setSelectedItem(customInput.item);
          setSubcategoryCreationStep(2);
          setCustomInput((prev) => ({ ...prev, item: "" }));
          setShowSubcategory(true);

        }
      } else {
        // Step 2: Add items to the subcategory group
        if (customInput.subcategoryItem && customInput.unit && selectedItem) {
          const newSubcategoryItem = {
            name: customInput.subcategoryItem,
            unit: customInput.unit,
          };
        
          // Get existing subcategories
          const existingItems =
            categoryStructure[selectedCategory]?.subcategories?.[selectedItem]
              ?.items || [];

          // Add new subcategory item
          onAddSubcategory(selectedCategory, selectedItem, [
            ...existingItems,
            newSubcategoryItem,
          ]);

          // Update form values
          setValue("subcategory", customInput.subcategoryItem);
          setValue("unit", customInput.unit);

          // Reset for next item and show the subcategory dropdown
          setCustomInput((prev) => ({
            ...prev,
            subcategoryItem: "",
            unit: "",
          }));
          setShowSubcategory(true);
          setShowCustomInput((prev) => ({ ...prev, item: false }));
          setAddingMode("item");
          setSubcategoryCreationStep(1);
        }
      }
    } else {
      // Regular item addition
      if (customInput.item && customInput.unit && selectedCategory) {
        onAddItem(selectedCategory, null, customInput.item, customInput.unit);
        setValue("name", customInput.item);
        setValue("unit", customInput.unit);
        setShowCustomInput((prev) => ({ ...prev, item: false }));
        setCustomInput((prev) => ({ ...prev, item: "", unit: "" }));
      }
    }
  };

  // Add new subcategory (from the subcategory custom input)
  const handleAddSubcategory = () => {
    if (customInput.subcategory && customInput.unit && selectedItem) {
      const newSubcategory = {
        name: customInput.subcategory,
        unit: customInput.unit,
      };

      const existingSubcategories =
        categoryStructure[selectedCategory]?.subcategories?.[selectedItem]
          ?.items || [];

      onAddSubcategory(selectedCategory, selectedItem, [
        ...existingSubcategories,
        newSubcategory,
      ]);

      setValue("subcategory", customInput.subcategory);
      setValue("unit", customInput.unit);
      setShowCustomInput((prev) => ({ ...prev, subcategory: false }));
      setCustomInput((prev) => ({ ...prev, subcategory: "", unit: "" }));
      setShowSubcategory(true);
    }
  };

  // Submit stock item
  const onSubmit = async (data) => {
    if (parseInt(data.quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    setIsSubmitting(true);
    try {
      await handleAddItem({
        id: Date.now(),
        material: data.subcategory || data.name,
        category: data.category,
        quantity: parseInt(data.quantity),
        unit: data.unit,
        expiryDate: data.expiryDate || null,
        status: "normal",
        time: new Date().toISOString().split("T")[0],
      });

      reset();
      setShowSubcategory(false);
      setShowCustomInput({
        category: false,
        item: false,
        subcategory: false,
      });
      setCustomInput({
        category: "",
        item: "",
        subcategory: "",
        subcategoryItem: "",
        unit: "",
      });
      setAddingMode("item");
      setSubcategoryCreationStep(1);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Add Stock</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Selection */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <button
              type="button"
              onClick={() => toggleCustomInput("category")}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showCustomInput.category ? "Select existing" : "Add new"}
            </button>
          </div>

          {showCustomInput.category ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput.category}
                onChange={(e) =>
                  setCustomInput((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                placeholder="New category name"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
          ) : (
            <select
              size={6}
              id="category"
              {...register("category", { required: "Category is required" })}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {Object.keys(categoryStructure).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Item Selection */}
        {selectedCategory && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Item
              </label>
              <button
                type="button"
                onClick={() => toggleCustomInput("item")}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showCustomInput.item ? "Select existing" : "Add new"}
              </button>
            </div>

            {showCustomInput.item ? (
              <div className="space-y-2">
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddingMode("item");
                      setShowSubcategory(false);
                      setSubcategoryCreationStep(1);
                    }}
                    className={`flex-1 py-1 px-2 rounded-md text-sm ${
                      addingMode === "item"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAddingMode("subcategory");
                      setSubcategoryCreationStep(1);
                    }}
                    className={`flex-1 py-1 px-2 rounded-md text-sm ${
                      addingMode === "subcategory"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Add Subcategory Group
                  </button>
                </div>

                {addingMode === "subcategory" &&
                subcategoryCreationStep === 1 ? (
                  <>
                    <input
                      type="text"
                      value={customInput.item}
                      onChange={(e) =>
                        setCustomInput((prev) => ({
                          ...prev,
                          item: e.target.value,
                        }))
                      }
                      placeholder="New subcategory group name"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAddItemToCategory}
                      className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Next: Add Items
                    </button>
                  </>
                ) : addingMode === "subcategory" &&
                  subcategoryCreationStep === 2 ? (
                  <>
                    <p className="text-sm text-gray-600">
                      Adding to: {watch("name")}
                    </p>
                    <input
                      type="text"
                      value={customInput.subcategoryItem}
                      onChange={(e) =>
                        setCustomInput((prev) => ({
                          ...prev,
                          subcategoryItem: e.target.value,
                        }))
                      }
                      placeholder="Add item to subcategory group"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customInput.unit}
                        onChange={(e) =>
                          setCustomInput((prev) => ({
                            ...prev,
                            unit: e.target.value,
                          }))
                        }
                        placeholder="Unit (e.g., bottles, kg)"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleAddItemToCategory}
                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Add Item
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={customInput.item}
                      onChange={(e) =>
                        setCustomInput((prev) => ({
                          ...prev,
                          item: e.target.value,
                        }))
                      }
                      placeholder="New item name"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customInput.unit}
                        onChange={(e) =>
                          setCustomInput((prev) => ({
                            ...prev,
                            unit: e.target.value,
                          }))
                        }
                        placeholder="Unit (e.g., kg, liters)"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleAddItemToCategory}
                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <select
                id="name"
                size={6}
                {...register("name", { required: "Item is required" })}
                onChange={handleItemChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <option value="__custom__">➕ Custom Item</option>
              </select>
            )}
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}

        {/* Subcategory Selection - Only show when a subcategory item is selected */}
        {showSubcategory && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium text-gray-700"
              >
                Type/Variation
              </label>
              <button
                type="button"
                onClick={() => toggleCustomInput("subcategory")}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showCustomInput.subcategory ? "Select existing" : "Add new"}
              </button>
            </div>

            {showCustomInput.subcategory ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={customInput.subcategory}
                  onChange={(e) =>
                    setCustomInput((prev) => ({
                      ...prev,
                      subcategory: e.target.value,
                    }))
                  }
                  placeholder="New type/variation"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInput.unit}
                    onChange={(e) =>
                      setCustomInput((prev) => ({
                        ...prev,
                        unit: e.target.value,
                      }))
                    }
                    placeholder="Unit (e.g., bottles, kg)"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <select
                size={6}
                id="subcategory"
                {...register("subcategory", { required: "Type is required" })}
                onChange={handleSubcategoryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                {categoryStructure[selectedCategory]?.subcategories?.[
                  selectedItem
                ]?.items
                  ?.filter((item) => item) // This filters out any empty/null items
                  .map((subItem) => (
                    <option key={subItem} value={subItem}>
                      {subItem}
                    </option>
                  ))}
                <option value="__custom__">➕ Custom Type</option>
              </select>
            )}
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
            placeholder="Enter quantity"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        {/* Expiry Date Input */}
        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expiry Date (Optional)
          </label>
          <input
            id="expiryDate"
            type="date"
            {...register("expiryDate")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
        >
          {isSubmitting ? "Adding..." : "➕ Add Item"}
        </button>
      </form>
    </div>
  );
}
