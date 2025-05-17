import React, { useState, useEffect } from 'react';

function Test() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ id: '', name: '', email: '', phone: '', salary: '' ,age:''});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        fetch('https://localhost:7084/api/Employees')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setEmployees(data))
            .catch(error => setError(error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update existing employee
            fetch(`https://localhost:7084/api/Employees/${formData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    age: formData.age,
                    salary: parseFloat(formData.salary)
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update employee');
                }
                fetchEmployees();
                resetForm();
            })
            .catch(error => setError(error));
        } else {
            // Create new employee
            fetch('https://localhost:7084/api/Employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    age: formData.age,
                    salary: parseFloat(formData.salary)
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create employee');
                }
                return response.json();
            })
            .then(() => {
                fetchEmployees();
                resetForm();
            })
            .catch(error => setError(error));
        }
    };

    const handleEdit = (employee) => {
        setIsEditing(true);
        setFormData({
            id: employee.id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            salary: employee.salary,
            age: employee.age
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) {
            return;
        }
        fetch(`https://localhost:7084/api/Employees/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            fetchEmployees();
        })
        .catch(error => setError(error));
    };

    const resetForm = () => {
        setFormData({ id: '', name: '', email: '', phone: '', salary: '', age: '' });
        setIsEditing(false);
    };

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                        required
                    />
                    <input 
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                        required
                    />
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                        required
                    />
                    <input 
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                        required
                    />
                    <input 
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 mr-2">
                    {isEditing ? 'Update Employee' : 'Add Employee'}
                </button>
                {isEditing && (
                    <button 
                        type="button" 
                        onClick={resetForm} 
                        className="bg-gray-500 text-white p-2"
                    >
                        Cancel
                    </button>
                )}
            </form>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border border-gray-300">Name</th>
                            <th className="py-2 px-4 border border-gray-300">Age</th>
                            <th className="py-2 px-4 border border-gray-300">Email</th>
                            <th className="py-2 px-4 border border-gray-300">Phone</th>
                            <th className="py-2 px-4 border border-gray-300">Salary</th>
                            <th className="py-2 px-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id} className="text-center">
                                <td className="py-2 px-4 border border-gray-300">{employee.name}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.age}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.email}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.phone}</td>
                                <td className="py-2 px-4 border border-gray-300">${employee.salary}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <button 
                                        onClick={() => handleEdit(employee)} 
                                        className="bg-yellow-500 text-white p-1 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(employee.id)} 
                                        className="bg-red-500 text-white p-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Test;