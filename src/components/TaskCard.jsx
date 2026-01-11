import React from 'react';
import { getStatusClass, formatDate } from "../utils/util";

const TaskCard = ({ task, onEdit, onDelete }) => {
  //TODO: we can work on accessibility 
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
     {/*title and Description */}
      <div className="mb-4">
        <h3 className="text-gray-900 text-xl font-bold truncate" title={task.title}>
          {task.title}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Status and Date */}
      <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
        <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold">Deadline</p>
          <p className="text-sm text-gray-600 font-medium">
            {formatDate(task.dueDate)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm bg-slate-100 text-slate-700 px-4 py-2 rounded-md font-semibold hover:bg-slate-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;