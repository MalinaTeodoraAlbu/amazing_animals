
import axios from 'axios';
import message from './media/send.png'
import friends from './media/rating.png'
import next from './media/right.png'
import prev from './media/left.png'
import follow from './media/pet.png'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useState, useEffect } from 'react';
import { amber } from '@mui/material/colors';
import './style/index.css';
import { useParams } from 'react-router-dom';
const userID_LOCAL = localStorage.getItem('userId');
function UserProfile(props) {
  const [user, setUser] = useState(null);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const {userID} = useParams();
  const [postID, setPostID] = useState(null);
  const [areFriends, setAreFriends] = useState(false);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';
  

  useEffect(() => {

    axios.get(`http://localhost:7070/api/conversation/${userID_LOCAL}`)
      .then(res => {
        setConversations(res.data);
      })
      .catch(err => 
        console.error(err));

}, [userID_LOCAL]);


  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users/${userID}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  
      if(userID){
        axios
        .get(`http://localhost:7070/api/users/${userID}/animals`)
        .then((res) => setAnimals(res.data))
        .catch((err) => console.error(err));
    
      axios
        .get(`http://localhost:7070/api/users/${userID}/posts`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error(err));
      }
  
  }, [userID]);
  


  useEffect (() => {
    axios 
    .get(`http://localhost:7070/api/friends/${userID_LOCAL}`)
    .then((res) => setUserFriends(res.data))
    .catch((err) => console.error(err));

    
    if (userFriends && userID) {
      const hasFriend = userFriends.some((friend) => friend._id === userID);
      setAreFriends(hasFriend);
    }
  })


  const handleAdd = () => {
    axios
    .put(`http://localhost:7070/api/${userID}/follow`, { _id: userID_LOCAL })
  }

  const handleRemove = () => {
    axios
    .put(`http://localhost:7070/api/unfollow/${userID}`, { _id: userID_LOCAL })
  }

  const handleMessage = () => {
    console.log('Conversations:', conversations);
    console.log('userID_LOCAL:', userID_LOCAL);
    console.log('userID:', userID);
  
    const existingConversation = conversations.find((conversation) => {
      const members = conversation.members;
      return (
        (members[0] === userID_LOCAL && members[1] === userID) ||
        (members[0] === userID && members[1] === userID_LOCAL)
      );
    });
  
    console.log('Existing Conversation:', existingConversation);
  
    if (existingConversation) {
      window.location.href = `/messanger`;
    } else {
      axios
        .post(`http://localhost:7070/api/conversation`, { senderId: userID_LOCAL, receiverId: userID })
        .then((res) => {
        window.location.href = `/messanger`;
        })
        .catch((err) => console.error(err));
    }
  };
  

  const handleListFriends = () => {
    props.setisFriendPopupOpen(true);
  }


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
         
         {user && user._id === userID_LOCAL ?(
          <div className='circle'>
            
          <IconButton aria-label="edit" color="secondary" >
              <EditIcon fontSize="small"  />
            </IconButton>
          </div>
         ):(
          <div className='circle'>

          </div>
         ) } 
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
             {user && user._id === userID_LOCAL ?
             (<>
             <div className='under'>
            <img src={follow} alt="Follow" onClick={handleListFriends} />
        
            </div>
             </> ):(
              <div className='under'>
                        
              {areFriends === false ? (
                  <IconButton aria-label="edit" color="secondary" sx={{ color: amber[50] }} onClick={handleAdd}> 
                  <PersonAddIcon fontSize="large"  />
                </IconButton>
              ) : (
                <IconButton aria-label="edit" color="secondary" sx={{ color: amber[50] }} onClick={handleRemove}>
                  <PersonRemoveIcon fontSize="large"  />
                </IconButton>
              )}
              <IconButton aria-label="edit" color="secondary" sx={{ color: amber[50] }} onClick={handleMessage}>
                <MessageIcon fontSize="large"  />
              </IconButton>
              
              </div>
             )}

           
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
            <img src={`http://localhost:7070/${animals[currentAnimalIndex].imagePaths}`} alt={animals[currentAnimalIndex].name} />
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
       
      <img src={ post ? `http://localhost:7070/${post.imagePaths}` : ''} alt={post.title} onClick={() => { window.location.href = `/viewPost/${post._id}` }}/>

    </div>
  ))}
</div>
</div> 
    </div>  

    </div>  
  );
}



export default UserProfile;
