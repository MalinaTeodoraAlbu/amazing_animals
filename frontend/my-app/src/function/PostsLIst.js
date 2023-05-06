import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import '../index.scss';
import ListComments from './ListComments.js';

const userId = localStorage.getItem('userId');

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [currentSection, setCurrentSection] = useState('section-1');
  const [selectedPostId, setSelectedPostId] = useState(null); 
  const [selectedPosts, setSelectedPosts] = useState(new Map());
  console.log(selectedPostId)
  
  
  const toggleSection = (postId) => {
    const newSelectedPosts = new Map(selectedPosts); 
    newSelectedPosts.set(postId, !selectedPosts.get(postId)); 
    setSelectedPosts(newSelectedPosts); 
  };
  

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="post_FEED">
      {posts.map((post) => (

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
                  <img src={post.picture}></img>
                  
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

    
          
      ))}
      
    </div>
  );
}

function User({ userid, postID }) {
  const [user, setUser] = useState(null);
  const [post, setPosts] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedPostId, setSavedPostId] = useState(null);
  
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

  
  return (
    <div>
      <div className="user-info_b">
        <img src={user.picture} alt="Profile Picture" />
        <p className="user-name">{user.name}</p>
        <div className='fav_iconIhe'>
        <label className="like">
        <input type="checkbox" checked={isSaved} onClick={handleSavedPost}/>
        <div className="hearth"/>
      </label>
     
        </div>
        {userid === userId && (
         <div>
         <div
           className="context-menu"
           onClick={() => setShowContextMenu(!showContextMenu)}
         >
          ...
         </div>
         {showContextMenu && (
           <div className="context-menu-options">
             <div className='context-menu-opt' onClick={handleDelete}>
             <img src="https://img.icons8.com/material-outlined/24/null/filled-trash.png"/>
             </div>
             <div  className='context-menu-opt' onClick={handleEdit}>
             <img src="https://img.icons8.com/ios/50/null/edit--v1.png"/>
             </div>
           </div>
         )}
       </div>
        )}
        
      </div>
     
    </div>
  );
}



export default PostsList;
