
import axios from 'axios';
import follow from './media/pet.png'
import message from './media/send.png'
import friends from './media/rating.png'
import next from './media/right.png'
import prev from './media/left.png'
import pic from './media/e7f4f592f2f2f1d212ca1e225ef46360.jpg'
import { useState, useEffect } from 'react';
import './index.css';

function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:7070/api/users/64011bd1a9af7342517cc6c7`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="profile">
      <div className="user_details"> 
        <div className="user_details_container">
         <div className='usDC'>
          <div className='circle'>
        
          </div>
          <div className='circle2'>
             <img src={pic} alt="Profile Picture"/>
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
        <div className="user_details_container_animals">
        <img src={prev} />
          <div className='container_det_animals'>
         
          <div className='container_det_animals_b'>
            </div>  
            <div className='container_det_animals_c'>
              <AnimalsList></AnimalsList>
            </div>  
          </div>
          <img src={next}/>
        </div>
      </div>
      <div className="user_posts"></div>
    </div>  
  );
}



function AnimalsList() {
  const [animals, setAnimals] = useState([]);
  const userID = "64011bd1a9af7342517cc6c7"; 

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userID}/animals`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
  }, [userID]);

  return (
    <div>
      {animals.map(animal => (
        <div key={animal.id}>
          <h3>{animal.name}</h3>
        </div>
      ))}
    </div>
  );
}
export default MyProfile;
