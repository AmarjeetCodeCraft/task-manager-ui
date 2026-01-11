import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // state to handle model
  const [currentTask, setCurrentTask] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ show: false, id: null });

  // Initial data loading
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    console.log("Fetching tasks from:", `${BASE_URL}/tasks`); //Adding dev log to check 
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Couldn't load tasks. Is the backend server running?");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

 // Delete the task
  const triggerDelete = (id) => {
    setDeleteDialog({ show: true, id });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${deleteDialog.id}`);
      // Filter out the deleted task locally so we don't have to re-fetch everything
      setTasks(prev => prev.filter(t => t.id !== deleteDialog.id));
      setDeleteDialog({ show: false, id: null });
    } catch (err) {
      alert("Something went wrong while deleting...");
    }
  };

  const handleSave = async (data) => {
    try {
      if (currentTask) {
        // Update existing
        const res = await axios.put(`${BASE_URL}/tasks/${currentTask.id}`, data);
        setTasks(tasks.map(t => t.id === currentTask.id ? res.data : t));
      } else {
        // Create new
        const res = await axios.post(`${BASE_URL}/tasks`, data);
        setTasks([...tasks, res.data]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving task details.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md mb-10">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Task Tracker</h1>
          <p className="text-sm text-slate-500">Manage your daily workflow</p>
        </div>
        <button
          onClick={onLogout}
          className="px-5 py-2.5 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-all text-slate-700"
        >
          Sign Out
        </button>
      </header>

      {/* Main List */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-700">All Tasks</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-blue-200 transition-all"
          >
            <span>+</span> New Task
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-100 text-center">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">Your task list is empty. Add something!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onEdit={openEditModal}
                onDelete={triggerDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      {showModal && (
        <TaskModal
          task={currentTask}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      <ConfirmModal
        isOpen={deleteDialog.show}
        onClose={() => setDeleteDialog({ show: false, id: null })}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure, you want to delete the task?"
      />
    </div>
  );
};

export default Dashboard;