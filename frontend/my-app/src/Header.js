import './style/index.css';
import Popup from './Popup';
import axios from 'axios';
import Logo from './media/logo_AA.png'
import { useLocation, useParams } from 'react-router-dom';
import store from "./store/store";
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import { amber, purple, red } from '@mui/material/colors';


const userID_LOCAL = localStorage.getItem('userId');

function Header(props) {
  const [user, setUser] = useState(null);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  console.log(hasUnreadNotifications)
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';

  const handleLogout = () => {
    localStorage.removeItem("token");
    store.dispatch({ type: "logOut" });
    window.location.href = '/';
}

useEffect(() => {
  axios.get(`http://localhost:7070/api/notifications/${userId}`)
    .then(res => {
      const sortedNotifications = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sortedNotifications);
        console.log(sortedNotifications)
        const hasUnread = sortedNotifications.some(notification => notification.isview === false);
      console.log(hasUnread)
      
      setHasUnreadNotifications(hasUnread);
    })
    .catch(err => console.error(err));
}, [userId]);




const handleMessages = (event) => {
  window.location.href = '/messanger';
}

const handleNotification = () => {
  props.setIsPopupOpen(true);
  setHasUnreadNotifications(false);
};

const handleSearch = () => {
  props.setIsSearchPopupOpen(true);
}

const handleListFriends = () => {
  props.setisFriendPopupOpen(true);
}

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  

  return (
    <div className="container_head">
      <div className='Logo'>
        <img src={Logo} alt="Logo" />
      </div>

      {location.pathname !== '/' && user && (
        <div className="user_info">
           <IconButton aria-label="chat" color="secondary" onClick={handleListFriends} >
            <PeopleIcon sx={{ color: amber[50] }}/>
            </IconButton>
          <IconButton aria-label="notif" color="secondary" onClick={handleSearch}>
            <SearchIcon sx={{ color: amber[50] }} ></SearchIcon>
            </IconButton>
           {hasUnreadNotifications === true ? 
           ( <IconButton 
            sx={{ color: red[500] }}
              aria-label="notif"
              onClick={handleNotification}
            >
              <NotificationsIcon />
            </IconButton>) : (
               <IconButton 
               sx={{ color: amber[50] }}
                 aria-label="notif"
                 onClick={handleNotification}
               >
                 <NotificationsIcon />
               </IconButton>
            )}
          
            <IconButton aria-label="chat" sx={{ color: amber[50] }} onClick={handleMessages} >
            <ChatIcon></ChatIcon>
            </IconButton>
          <span>{user.name}</span>
          <img src={picture} alt="Profile Picture" />
          <button className="button_logout" onClick={handleLogout} >Logout</button>
        </div>
      )}
  
    </div>
  );
}

export default Header;

