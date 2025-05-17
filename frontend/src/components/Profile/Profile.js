import React from 'react';

const Profile = () => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    // Function to handle logout
  

    return (
        <div>
            <h1>Profile Page</h1>
            <p>User ID: {userId}</p>
            
            
        </div>
    );
};

export default Profile;