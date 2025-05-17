import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import autoTable from 'jspdf-autotable'; 
import jsPDF from 'jspdf';

const ViewStates = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchStatuses(storedUserId);
    } else {
      setLoading(false);
      setError('User not logged in');
    }
  }, []);

  const fetchStatuses = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/status/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch statuses');
      }
      const data = await response.json();
      setStatuses(data);
    } catch (err) {
      console.error('Error fetching statuses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this status?")) return;

    try {
      const response = await fetch(`http://localhost:8080/status/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete status');
      }
      toast.success("Status deleted successfully!");
      setStatuses(statuses.filter((status) => status.id !== id));
    } catch (err) {
      console.error('Error deleting status:', err);
      toast.error('Failed to delete status');
    }
  };

   // Generate PDF report function
   const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Statuses Report", 14, 15);
    const tableColumn = ["Title", "Content", "User", "Progress", "Date"];
    const tableRows = [];

    // Loop through filtered statuses to generate rows
    filteredStatuses.forEach(status => {
      const row = [
        status.title,
        status.content,
        status.userId,
        status.progressTemplate,
        new Date(status.date).toLocaleDateString()
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Statuses_Report.pdf");
  };

  // Filter statuses based on search term
  const filteredStatuses = statuses.filter(status =>
    [status.title, status.content, status.userId, status.progressTemplate].some(field =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
        <div className="text-2xl text-gray-600 animate-pulse">Loading statuses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
        <div className="text-2xl text-red-500">{`Error: ${error}`}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">View Statuses</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search statuses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={generatePDF}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-150 ease-in-out"
            >
              Generate Report
            </button>
            <button
              onClick={() => navigate('/addstatus')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-150 ease-in-out"
            >
              Add Status
            </button>
          </div>
        </div>

        {filteredStatuses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStatuses.map((status) => (
              <div
                key={status.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-150 ease-in-out flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{status.title}</h2>
                  <p className="text-gray-600 mb-4">{status.content}</p>
                  <p className="text-gray-600 mb-4">User: {status.userId}</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Progress: {status.progressTemplate}</p>
                  <p>Date: {new Date(status.date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/updatestatus/${status.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-lg text-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Edit Status"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(status.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg text-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    aria-label="Delete Status"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            No statuses found. Add one!
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStates;