import React, { useState, useEffect } from 'react';
import axios from 'axios';

const userID_LOCAL = localStorage.getItem('userId');

function ListOfNotifications({ notificationId }) {
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState([]);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`http://localhost:7070/api/notifications/${notificationId}/not`);
        setNotification(response.data);
      } catch (error) {
        console.error('Eroare la obținerea notificărilor:', error);
      }
    };

    fetchNotification();
  }, []);

  const fetchUser = async () => {
    try {
      if (notification && notification.idUSER) {
        const response = await axios.get(`http://localhost:7070/api/users/${notification.idUSER}`);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Eroare la obținerea userului:', error);
    }
  };

  useEffect(() => {
    if (notification && notification.idUSER) {
        fetchUser();
    }
  }, [notification]);

  return (
    <div className="notification_box">
    {notification.type === 'comment' && user.name && (
      <div className="header-content_pop">
        <img src={picture} alt="User Profile" />
        <p>{user.name} added a comment to your post.</p>
      </div>
    )}
    {notification.type === 'post' && user.name && (
      <div className="header-content_pop">
        <p>{user.name} liked your post.</p>
      </div>
    )}
  </div>
  

  );
}

export default ListOfNotifications;
