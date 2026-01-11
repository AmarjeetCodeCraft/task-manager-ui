import { useEffect, useState } from "react";

const TaskModal = ({ task, onSave, onClose }) => {
  // Use 'draft' as a name to signal this is a temporary state before saving
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    status: "To-Do",
    dueDate: "",
  });

  // Load existing data if we're editing
  useEffect(() => {
    if (task) {
      setDraft({ ...task });
    }
  }, [task]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting task data:", draft);  for dev purpose only to verify draft before submitting
    onSave(draft);
  };

  //TODO: need to work on Accessibility 
  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            {task ? "Update Task Details" : "Create New Task"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={onFormSubmit} className="p-6">
          <div className="space-y-4">
            {/* Task Name */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={draft.title}
                onChange={updateField}
                placeholder="What needs to be done?"
                className="w-full border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={draft.description}
                onChange={updateField}
                rows="3"
                className="w-full border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                placeholder="Add some details..."
                required
              />
            </div>

            {/* Row for - Status & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Status
                </label>
                <select
                  name="status"
                  value={draft.status}
                  onChange={updateField}
                  className="w-full border border-gray-200 rounded px-3 py-2 bg-white outline-none"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={draft.dueDate}
                  onChange={updateField}
                  className="w-full border border-gray-200 rounded px-3 py-2 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold shadow-md transition-all active:scale-95"
            >
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;