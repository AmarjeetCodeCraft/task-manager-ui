 export const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-800";
      case "In Progress":
        return "bg-yellow-200 text-yellow-800";
      case "To-Do":
        return "bg-red-200 text-red-800";
      default:
        return "bg-red-200 text-red-800";
    }
  };

  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };