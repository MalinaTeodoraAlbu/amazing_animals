
import axios from 'axios';
import follow from './media/pet.png'
import message from './media/send.png'
import friends from './media/rating.png'
import next from './media/right.png'
import prev from './media/left.png'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import './index.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem('userId');
  const [postID, setPostID] = useState(null);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/users/${userId}/animals`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/users/${userId}/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNext = () => {
    setCurrentAnimalIndex((currentAnimalIndex + 1) % animals.length);
  };

  const handlePrev = () => {
    setCurrentAnimalIndex((currentAnimalIndex - 1 + animals.length) % animals.length);
  };

  const handleView = (event) => {

    window.location.href = `/viewPost/${postID}`;
  };

  return (
    <div className="profile">
      <div className="user_details"> 
        <div className="user_details_container">
         <div className='usDC'>
          <div className='circle'>
          <IconButton aria-label="edit" color="secondary" >
              <EditIcon fontSize="small"  />
            </IconButton>
          </div>
          <div className='circle2'>
          {user &&
             <img src={picture} alt="Profile Picture"/>
          }
          </div>
          <div className="User_spef">
            {user &&
              <>
                <h2>{user.name}</h2>
                <h5>{user.bio}</h5>

              </>
            }
            <div className='under'>
            <img src={follow} alt="Follow" />
            <img src={message} alt="Follow"/>
            <img src={friends} alt="Follow" />
            </div>
          </div>
         </div>
        </div>
        <div className='div_cards'>
  <div className="user_details_container_animals">    </div>
  
 
  <div className="user_details_container_animals_a">
  <img src={prev} alt="Prev" onClick={handlePrev} className="buttons" /> 
    <div className='container_det_animals'>
      {animals.length > 0 && (
        <div className='container_det_animals_b'>
          {animals.length > 0 && (
            <img src={animals[currentAnimalIndex].picture} alt={animals[currentAnimalIndex].name} />
          )}
        </div>
      )}
      <div className='container_det_animals_c'>
        {animals.length > 0 ? (
          <div>
            <h3>{animals[currentAnimalIndex].name}</h3>
          </div>
        ) : (
          <p>No animals found.</p>
        )}
      </div>  
    </div>
    <img src={next} alt="Next" onClick={handleNext} className="buttons" />
  </div>

</div>
     
      </div>
      <div className="user_posts">
        <div className="user_posts_a">
        <div className="posts_container">
  {posts.map(post => (
    <div className="post_container" key={post._id} >
      <img src={post.picture} alt={post.title} />
      <button onClick={() => { window.location.href = `/viewPost/${post._id}` }}>View post</button>
    </div>
  ))}
</div>
</div> 
    </div>  

    </div>  
  );
}



export default MyProfile;
