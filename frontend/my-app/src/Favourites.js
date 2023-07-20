import Navbar from "./Navbar";
import './style/index.css';
import './index.scss';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import {useState, useEffect} from 'react';
const userID_LOCAL = localStorage.getItem('userId');
console.log("AICI BA",userID_LOCAL)

function Favourites() {
  return (
    <div className="ListOfFavourites" >
     <div className="ListOfFavourites_container">
   
      <div className="ListOfFavourites_">
        <ListOfFav></ListOfFav>
         </div>
    </div>
    </div>
  );
}

export default Favourites;


function ListOfFav(props) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const userid = userID_LOCAL;
  const [isSaved, setIsSaved] = useState(true);
  const [postID, setpostID] = useState(null);
  const [savedPostId, setSavedPostId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7070/api/users/${userid}/savedPosts`)
      .then((response) => response.json())
      .then((data) => setSavedPosts(data));
  }, []);


  useEffect(() => {
    const postIDs = savedPosts.map(post => post.postID);
    Promise.all(postIDs.map(postID => {
      return fetch(`http://localhost:7070/api/posts/${postID}`)
        .then(response => response.json());
    }))
      .then(postsData => {
        setPosts(postsData);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [savedPosts]);

  
  const handleDelete = async (postID) => {
    const savedPost = savedPosts.find(post => post.postID === postID);
    if (savedPost) {
      const res = await fetch(`http://localhost:7070/api/savedPost/${savedPost._id}`, {
        method: "delete"
      });
      setSavedPosts((prevSavedPosts) => prevSavedPosts.filter((sp) => sp._id !== savedPost._id));
    }
  };
  
  const handleView = (event, postID) => {
    event.preventDefault();
    window.location.href = `/viewPost/${postID}`;
  };

  return (
    <div>

    {posts.map((post) => (
      <div className="savedPost_post" key={post._id}>
        <div className="border_fav_white">
        <div className='fav_iconIhe'>
        <label className="like">
        <input type="checkbox" checked={isSaved} onClick={() => handleDelete(post._id)}/>
        <div className="hearth"/>
      </label>
        </div>
        <div className='fav_iconIhe'>
        <IconButton aria-label="edit" color="primary" onClick={(event) => handleView(event, post._id)} >
              <NavigateNextIcon fontSize="large" variant="text" />
            </IconButton>
        </div>
         </div>
         
       
        {post.category === "Looking for Animal" ? 
        (
          <div className="img_fav_purple" style={{ position: 'relative' }}>
          <img src={`http://localhost:7070/${post.imagePaths}`} />
          <div className="fav_content__" style={{ position: 'absolute', top: '1px', left: '0', zIndex: '1' }}>
            <p>{post.content}</p>
          </div>
        </div>
        

         ):
        (

          <div className="img_fav_purple"> 
          <img src={`http://localhost:7070/${post.imagePaths}`}></img>
          </div>
        )}
        
        
      </div>
    ))}
  </div>
  );
}