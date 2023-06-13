
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8900");

    socket.on("getMessage", (data) => {
      const { senderId, text } = data;

      const notification = {
        senderId,
        text,
        id: Math.random().toString(),
      };

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);

      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notification.id
          )
        );
      }, 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="notificationsContainer">
      <div className="notification">
        
        </div>
    </div>
  );
};

export default NotificationsContainer;
