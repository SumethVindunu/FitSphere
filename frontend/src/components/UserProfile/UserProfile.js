import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react'

function UserProfile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }
        axios.get(`http://localhost:8080/user/${userId}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching user data');
                setLoading(false);
            });

    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    const UpdateNavigate = (id) => {
        window.location.href = `/updateprofile/${id}`;
    };


  return (
    <div>
        <h2>User Profile</h2>
        {user ? (
            <div>
                <p>Full Name: {user.fullname}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
                <p>Phone: {user.phone}</p>
                <button onClick={() => UpdateNavigate(user.userId)}>Update Profile</button>

            </div>
        ):(
             <p>No user data available</p>
        )}

    </div>
  )
}

export default UserProfile