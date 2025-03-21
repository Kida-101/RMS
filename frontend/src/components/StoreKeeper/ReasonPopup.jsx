import { useActionState, useEffect, useState } from "react";

const ReasonPopup = ({ message, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState("");

  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const reason = formData.get("reason");
      if (reason.trim().length < 6) {
        return {
          error:
            "Please provide a understandable reason (at least 6 characters).",
          value: reason,
        };
      }
      await onConfirm(reason);
      return { success: true };
    },
    { error: null, success: false, value: "" }
  );

  useEffect(() => {
    if (state.value) {
      setInputValue(state.value);
    }
  }, [state.value]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Set Reason</h2>

        {/* Reason Input Field */}
        <form action={submitAction}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <input
              type="text"
              name="reason"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the reason..."
              required
            />
          </div>

          {/* Display error message if any */}
          {state.error && (
            <p className="text-red-500 text-sm mb-4">{state.error}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-[#3447AA] text-white rounded-lg hover:bg-[#414a76] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              {isPending ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReasonPopup;
