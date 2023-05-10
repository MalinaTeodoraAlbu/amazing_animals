import './index.css';
import axios from 'axios';
import Logo from './media/logo_AA.png'
import { useLocation, useParams } from 'react-router-dom';
import store from "./store/store";
import { useState, useEffect } from 'react';

function Header() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  console.log(userId)
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';

  const handleLogout = () => {
    localStorage.removeItem("token");
    store.dispatch({ type: "logOut" });
    window.location.href = '/';
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
          <span>{user.name}</span>
          <img src={picture} alt="Profile Picture" />
          <button onClick={handleLogout} >Logout</button>
        </div>
      )}
    </div>
  );
}

export default Header;

