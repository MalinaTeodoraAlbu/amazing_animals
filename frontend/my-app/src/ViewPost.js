import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/index.css';
import './index.scss';
import { useParams } from 'react-router-dom';
import ListComments from './function/ListComments.js';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const userId = localStorage.getItem('userId');

function ViewPost() {
  const { postID } = useParams();
  const [post, setPost] = useState([]);
  const [currentSection, setCurrentSection] = useState('section-1');
  const [selectedPostId, setSelectedPostId] = useState(null); 
  const [selectedPosts, setSelectedPosts] = useState(new Map());

  const toggleSection = (postId) => {
    const newSelectedPosts = new Map(selectedPosts); 
    newSelectedPosts.set(postId, !selectedPosts.get(postId)); 
    setSelectedPosts(newSelectedPosts); 
    
  };
  console.log('id',postID)

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/posts/${postID}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  return (
    <div className='post_view_container'>
        <div className='post_view'>
        <div className="Feed_container_">
    <div className="post_FEED">
        <div className="post_container_feed" key={post._id}>
          <div className="card">
            {post.userid ? (
              <div className="_border_">
                <User userid={post.userid} postID={post._id}/>
              </div>
            ) : (
              <p></p>
            )}
            {post.userid ? (
              <div className='post_content'>
                <div className='photo_a'>
                  <img src={`http://localhost:7070/${post.imagePaths}`}></img>
                  
                </div>
                <div className='post_content_details_'>
                  <div className='category_'>
                    <p>{post.category}</p>
                  </div>
                </div>
              
                <section id="section-1" style={{ display: !selectedPosts.get(post._id) ? 'block' : 'none' }} >
                  <div className='post_content_details'>
                    <div className="form-control">
                      <label className='descriere_post'>{post.content}</label>
                    </div>
                    <div className="form-control">
                      <label>{post.tag}</label>
                  
                    </div>
                    <div className="form-control">
                      <label>{new Date(post.datePosted).toLocaleDateString()}</label>
                      <label>{post.location}</label>
                    </div>
                    {post.category !== 'Lovely' && post.category !== '' && (
                    <div className='r_wrap_post'>
                    <div
                      className="s_round_post"
                      onClick={() => {
                        setSelectedPostId(post._id);
                        toggleSection(post._id);
                      }}
                    >
                      <div className="s_arrow_post"></div>
                    </div>
                    
                  </div>
                  
                    )}
                  </div>
                </section>
                
                <section id="section-2" style={{ display: selectedPosts.get(post._id) ? 'block' : 'none' }} >
                    <div className='post_content_details'>
                      <div className="form-control">
                        <label>Name</label>
                        <label>{post.name}</label>
                      </div>
                      <div className="form-control">
                      <label>Species</label>
                        <label>{post.species}</label>
                      </div>
                      <div className="form-control">
                      <label>Sex</label>
                        <label>{post.sex}</label>
                      </div>
                      <div className="form-control">
                      <label className="label-color" >Color</label>
                        <label>{post.color}</label>
                      </div>
                      <div className="form-control">
                      <label>Birthday</label>
                        <label>{new Date(post.birthday).toLocaleDateString()}</label>
                      </div>
                      <div className="form-control">
                      <label>Sterilizer</label>
                        <label>{post.sterilizer}</label>
                      </div>
                    </div>

                    
                  </section>
            
            
              </div>
              
            ) : null}
             
            <div>
            <ListComments postId={post._id} />
              </div>
          </div>
         
        </div>


      
    </div>
    </div>
        </div>
        <div className="end">

        </div>
    </div>
  );
}

function User({ userid, postID }) {
  const [user, setUser] = useState(null);
  const [post, setPosts] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedPostId, setSavedPostId] = useState(null);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';

 

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users/${userid}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/posts/${postID}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [postID]);

  useEffect(() => { 
    const fetchSavedPosts = async () => {
      const res = await fetch(`http://localhost:7070/api/users/${userid}/savedPosts`);
      const savedPosts = await res.json();
      const savedPost = savedPosts.find((post) => post.postID === postID);
      if (savedPost) {
        setSavedPostId(savedPost._id);
        setIsSaved(true);
      }
    };
    fetchSavedPosts();
  }, [postID, userid]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:7070/api/posts/${postID}`)
      .then((res) => {
        setIsSaved(true)
        console.log("Post deleted successfully", res);
      })
      .catch((err) => {
        console.error("Error deleting post", err);
      });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    window.location.href = `/editPost/${postID}`;
    setShowContextMenu(false); 
  };

  const handleSavedPost = async (event) => {
    if (isSaved) {
      const res = await fetch(`http://localhost:7070/api/savedPost/${savedPostId}`, {
        method: "delete"
      });
      setIsSaved(false);
    } else {
      const savedPost = {
        userID: userid,
        postID: postID
      };
      const res = await fetch(`http://localhost:7070/api/savedPost`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedPost),
      });
      setIsSaved(true);
    }
  };

  const handleLooKProfile = () => {
    window.location.href = `/user/${user._id}`;
  } 
  
  return (
    <div>
      <div className="user-info_b">
        <img src={picture} alt="Profile Picture" onClick={handleLooKProfile}/>
        <p className="user-name">{user.name}</p>
                {userid !== userId ? (
            <div className='fav_iconIhe'>
           <label className="like">
           <input type="checkbox" checked={isSaved} onClick={handleSavedPost}/>
           <div className="hearth"/>
         </label>
        </div>
         ): (
         <div>
         
       </div>
        )}
         
        
      </div>
     
    </div>
  );
}



export default ViewPost;
