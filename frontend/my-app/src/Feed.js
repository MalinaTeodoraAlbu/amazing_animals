import './style/index.css';
import PostsList from "./function/PostsLIst";

import ListOfAdvertisings from './function/ListOfAdvertisings';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { amber } from '@mui/material/colors';

function Feed() {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState([]);
  const [advertising, setAdvertisings] = useState([]);

  const addNewPost = async (event) => {
    event.preventDefault();
    window.location.href = '/addNewPost' ;
  }

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));


  }, []);



  const addNewAdv = async (event) => {
    event.preventDefault();
    window.location.href = '/addAdvertising' ;
  }

  return (
    <div className="containerFeed">
    <div className="Feed">
    <div className="Feed_add_post">
  <div className="Animals_details_container_border">
    <h3>Add new post</h3>
  </div>
  <div className="input_container">
    <input type="text" className="post_input" placeholder="Say something"/>
  </div>
  <div className="buttons_feed">
    <button className="add-animal-btn" onClick={addNewPost}>Add a post</button>
  </div>
</div>

      <div className="Feed_container">
        <PostsList></PostsList>
        <div className="end">

        </div>
      </div>
    </div>

    <div className="Feed_side_bar" >
      <div className="Feed_ADv">
    {user && (user.userType === 'Premium' ||  user.userType === 'Vet') ? ( 
      <div className="_border_adv">  
       <h3 >Advertising</h3>
                <IconButton onClick={addNewAdv}  disableRipple>
              <AddIcon fontSize="small"  sx={{ color: amber[50] }} />
            </IconButton>
            </div>
            ):(
              <div className="_border_adv">  
              <h3 >Advertising</h3>
                   </div>
              )}
      <ListOfAdvertisings></ListOfAdvertisings>
           
      </div>

    </div>
    
    </div>
  );
}

export default Feed;