import '../style/index.css';
import '../style/header.scss';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios from 'axios';
import UserProfile from '../UserProfile ';

const userID_LOCAL = localStorage.getItem('userId');

function FriendsList(props) {
const [isFollowersActive, setIsFollowersActive] = useState(true);
const [isFollowingsActive, setIsFollowingsActive] = useState(false);
const [followers, setFollowers] = useState([]);
const [followings, setFollowings] = useState([]);


const [conversations, setConversations] = useState([]);
const [areFriends, setAreFriends] = useState(false);

useEffect(() => {

    axios.get(`http://localhost:7070/api/conversation/${userID_LOCAL}`)
      .then(res => {
        setConversations(res.data);
      })
      .catch(err => 
        console.error(err));

}, [userID_LOCAL]);



  const handleCloseFriendPopup = () => {
    props.handleCloseFriendPopup();
  };

  const handleFollowers = () => {
    setIsFollowersActive(true);
    setIsFollowingsActive(false);
  }
  
  const handleFollowings = () => {
    setIsFollowersActive(false);
    setIsFollowingsActive(true);
  }
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userID_LOCAL) {
          const response = await axios.get(`http://localhost:7070/api/users/${userID_LOCAL}`);
          const userData = response.data;
          setFollowers(userData.followers);
          setFollowings(userData.followings);
          console.log(userData);
          
          // Obține informațiile despre fiecare utilizator în listele followers și followings
          const fetchFollowersData = async () => {
            const followersData = await Promise.all(
              userData.followers.map(async (followerId) => {
                const response = await axios.get(`http://localhost:7070/api/users/${followerId}`);
                return response.data;
              })
            );
            setFollowers(followersData);
          };
  
          const fetchFollowingsData = async () => {
            const followingsData = await Promise.all(
              userData.followings.map(async (followingId) => {
                const response = await axios.get(`http://localhost:7070/api/users/${followingId}`);
                return response.data;
              })
            );
            setFollowings(followingsData);
          };
  
          fetchFollowersData();
          fetchFollowingsData();
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUser();
  }, []);
  

  const handleLooKProfile = (event, userId) => {
    event.preventDefault();
    window.location.href = `/user/${userId}`;
  };

  const handleMessages = (event, userId) => {
    event.preventDefault();
    window.location.href = `/messanger`;
  };

    return (
      <div className={`popup_container ${props.isFriendPopupOpen ? 'open' : ''}`}>
        <div className="dialog">
        <div className="header-content_pop_friends">
            <div className='hader_pop_fol_buttons'>
            <IconButton aria-label="notif" color="secondary" onClick={handleCloseFriendPopup}>
              <ClearIcon />
            </IconButton>
            </div>
            <div className='content_fall'>
            <div className='buttons_friends'>
            <button onClick={handleFollowers} className={isFollowersActive ? 'active-button' : ''}>Followers</button>
            <button onClick={handleFollowings} className={isFollowingsActive ? 'active-button' : ''}>Followings</button>
            </div>
            

           
            </div>
      
          </div>
          <hr className="line" />

          <div className='ListOfFriends'>
  {isFollowingsActive ? (
    <div>
      {followings.map((following) => (
        <div className="follower" key={following._id}>
            <img src={`http://localhost:7070/${following.imagePaths}`}></img>
            <p>{following.name}</p>
            <IconButton aria-label="notif" color="secondary" onClick={(event) => handleLooKProfile(event, following._id)} disableRipple>
            <AccountBoxIcon />
      
            </IconButton>
            <IconButton aria-label="notif" color="secondary" onClick={handleMessages} disableRipple>
            <MessageIcon />
            </IconButton>
  
        </div>
      ))}
    </div>
  ) : (
    <div>
      {followers.map((follower) => (
        <div className="follower" key={follower._id}>
             <img src={`http://localhost:7070/${follower.imagePaths}`}></img>
            <p>{follower.name}</p>
            <IconButton aria-label="notif" color="secondary" onClick={(event) => handleLooKProfile(event, follower._id)} disableRipple>
            <AccountBoxIcon />
      
            </IconButton>
            <IconButton aria-label="notif" color="secondary" onClick={handleMessages} disableRipple>
            <MessageIcon />
            </IconButton>
        </div>
        
      ))}
    </div>
  )}
</div>
        </div>
      </div>
    );
  }

  
  export default FriendsList;
  