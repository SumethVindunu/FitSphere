import React, { useEffect, useState } from 'react';
// ...existing imports...
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const followingKey = `followingStatus_${userId}`;
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [followingStatus, setFollowingStatus] = useState({});
    // New state for search term
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/user/${userId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch user details');
                    }
                    return res.json();
                })
                .then((data) => setUserDetails(data))
                .catch((err) => {
                    setError(err.message);
                });
            fetch(`http://localhost:8080/user/all?excludeId=${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setAllUsers(data);
                    const storedStatus = localStorage.getItem(followingKey);
                    let initStatus = {};
                    if (storedStatus) {
                        initStatus = JSON.parse(storedStatus);
                    } else {
                        data.forEach(user => {
                            initStatus[user.id] = false;
                        });
                    }
                    setFollowingStatus(initStatus);
                })
                .catch((err) => console.error(err));
        }
    }, [userId, followingKey]);

    const handleFollow = async (targetId) => {
        try {
            const response = await fetch(`http://localhost:8080/user/follow/${targetId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ followerId: userId })
            });
            if (!response.ok) {
                throw new Error('Follow request failed');
            }
            setFollowingStatus(prev => {
                const updated = { ...prev, [targetId]: true };
                localStorage.setItem(followingKey, JSON.stringify(updated));
                return updated;
            });
            alert('Follow successful');
        } catch (error) {
            console.error(error);
            alert('Error following user');
        }
    };

    const handleUnfollow = async (targetId) => {
        try {
            const response = await fetch(`http://localhost:8080/user/unfollow/${targetId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ followerId: userId })
            });
            if (!response.ok) {
                throw new Error('Unfollow request failed');
            }
            setFollowingStatus(prev => {
                const updated = { ...prev, [targetId]: false };
                localStorage.setItem(followingKey, JSON.stringify(updated));
                return updated;
            });
            alert('Unfollow successful');
        } catch (error) {
            console.error(error);
            alert('Error unfollowing user');
        }
    };

    const generatePDF = () => {
        if (!userDetails) return;
        const doc = new jsPDF();
        doc.text("User Details Report", 14, 15);
        const details = [
            ['User ID:', userDetails.id],
            ['Email:', userDetails.email],
            ['Full Name:', userDetails.fullname],
            ['Phone:', userDetails.phone],
            ['Followers:', userDetails.followers],
            ['Following:', userDetails.following]
        ];
        autoTable(doc, {
            body: details,
            startY: 20,
            theme: 'grid'
        });
        doc.save("Profile_Report.pdf");
    };

    // Filter users based on search term
    const filteredUsers = allUsers.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Page</h1>
            {error && <p className="text-red-600 font-semibold mb-4">Error: {error}</p>}
            {userDetails ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8">
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold">User ID:</span> {userDetails.id}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Email:</span> {userDetails.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Full Name:</span> {userDetails.fullname}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Phone:</span> {userDetails.phone}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Followers:</span> {userDetails.followers}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Following:</span> {userDetails.following}
                    </p>
                    <Link 
                        to="/updateprofile" 
                        className="block mt-4 text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md"
                    >
                        Update Profile
                    </Link>
                    <button
                        onClick={generatePDF}
                        className="mt-4 block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
                    >
                        Generate Report
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">Loading user details...</p>
            )}
            {/* List of other users with follow/unfollow buttons */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Other Users</h2>
                {/* Search field added to filter users */}
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border rounded w-full"
                />
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between border-b py-2">
                            <div>
                                <p className="font-semibold">{user.fullname}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    if (followingStatus[user.id]) {
                                        handleUnfollow(user.id);
                                    } else {
                                        handleFollow(user.id);
                                    }
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                            >
                                {followingStatus[user.id] ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;