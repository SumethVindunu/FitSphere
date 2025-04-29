import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    title: '',
    content: '',
    progressTemplate: '',
    date: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/status/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }
        const data = await response.json();
        setStatus({
          title: data.title,
          content: data.content,
          progressTemplate: data.progressTemplate,
          date: data.date.split('T')[0],
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to load status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [id]);

  const handleChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      toast.success('Status updated successfully!');
      navigate('/viewstates');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-gray-600">Loading status...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Update Status</h2>

        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={status.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            name="content"
            value={status.content}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Progress Template</label>
          <input
            type="text"
            name="progressTemplate"
            value={status.progressTemplate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={status.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStatus;
