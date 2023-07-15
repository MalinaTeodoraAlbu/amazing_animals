import './style/index.css';
import './style/header.scss';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ListOfNotifications from "./function/ListOfNotifications"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { amber } from '@mui/material/colors';
const userID_LOCAL = localStorage.getItem('userId');

function Popup(props) {

  console.log("ACUM",props.isPopupOpen)
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/notifications/${userID_LOCAL}`)
      .then((res) => {
        const sortedNotifications = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClosePopup = () => {
    notifications.forEach(notification => {
      axios.put(`http://localhost:7070/api/notifications/${notification._id}`, { isview: true })
        .then(response => {
          console.log(`Notification ${notification._id} updated successfully`);
        })
        .catch(error => {
          console.error(error);
        });
    });
  
    props.setHasUnreadNotifications(false);
    props.handleClosePopup();
  };
  
  

  

    return (
      <div className={`popup_container ${props.isPopupOpen ? 'open' : ''}`}>
        <div className="dialog">
        <div className="header-content_pop">
            <h2>Notifications</h2>
            <IconButton aria-label="notif" color="secondary" onClick={handleClosePopup}>
              <ClearIcon />
            </IconButton>
          </div>
          <hr className="line" />

          <div className='ListOfNotifications'>
          {notifications.map(notification => (
          <ListOfNotifications key={notification._id} notificationId={notification._id} />
                
          ))}
          </div>
        </div>
      </div>
    );
  }

  
  export default Popup;
  