import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import pic from '../media/e7f4f592f2f2f1d212ca1e225ef46360.jpg'

function PostsList() {
  const [posts, setPosts] = useState([]);

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
                <User userid={post.userid} />
              </div>
              
            ) : (
              <p></p>
            )}
        {post.userid ? (
            <div className='post_content'>
              <div className='photo_a'>
                  <img src={post.picture}></img>
                </div>
                <div className='post_content_details'>
                  <div className='post_content_details_'>
                    <div className='category_'>
                    <p>{post.category}</p>  
                    </div>
                    <div className='div_content_post_title'>
                    <h6>{post.title}</h6>
                    </div>
                    <div className='div_content_post'>
                      <p>{post.content}</p>
                    </div>
                    <div className='bot_post'>
                      <p>{post.tag}</p>  
                      <p>{new Date(post.datePosted).toLocaleDateString()}</p>
                   </div>
                  </div>
                <div className='buttons_post'>
                  <button>More Info</button>
                  <button>Save</button>
                </div>
              </div>
            </div>
          ) : null}
            </div>
          </div>
          
      ))}
    </div>
  );
}

function User({ userid }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users/${userid}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userid]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <div className="user-info_b">
      <img src={pic} alt="Profile Picture" />
      <p className="user-name">{user.name}</p>
    </div>
    </div>
  );
}



export default PostsList;
