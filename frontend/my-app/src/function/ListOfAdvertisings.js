import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/index.css';
import next from '../media/right.png';
import prev from '../media/left.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton } from '@mui/material';
import { amber } from '@mui/material/colors';

const userID_LOCAL = localStorage.getItem('userId');

function ListOfAdvertisings({ notificationId }) {
  const [user, setUser] = useState([]);
  const [advertising, setAdvertisings] = useState([]);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [idSelectedAv, setIDSelectedAdv] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userID_LOCAL}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/advertising`)
      .then(res => setAdvertisings(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const handleEdit = (event) => {
    event.preventDefault();
    window.location.href = `/editAdvertising/${currentAdvertising._id}`;
  }

  const handleNext = () => {
    if (currentIndex === filteredAdvertising.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + filteredAdvertising.length) % filteredAdvertising.length);
  };

  const filteredAdvertising = advertising.filter(ad => {
    const postDate = new Date(ad.datePosted);
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));

    return postDate >= thirtyDaysAgo;
  });

  const currentAdvertising = filteredAdvertising[currentIndex];

  return (
    <div className='ListOFAdv'>
      <img src={prev} alt="Prev" onClick={handlePrev} className="buttons" />

      <div className='editButtonContainer'>
        {currentAdvertising && (
          <div className="flip-card ">
            <div className="flip-card-inner">
              <div className='container_adv'>
                <img className='flip-card-front' src={`http://localhost:7070/${currentAdvertising.imagePaths}`} alt={currentAdvertising.content}></img>
              </div>
              <div className="flip-card-back">
                <p>Details: {currentAdvertising.content}</p>
                <p>Category: {currentAdvertising.category}</p>
                {currentAdvertising.startDate && (
                  <p>{new Date(currentAdvertising.startDate).toLocaleDateString("en-GB")}</p>
                )}
                {currentAdvertising.endDate && (
                  <p>{new Date(currentAdvertising.endDate).toLocaleDateString("en-GB")}</p>
                )}
                <p>{currentAdvertising.location}</p>
                <p>{new Date(currentAdvertising.datePosted).toLocaleDateString("en-GB")}</p>
              </div>
              {currentAdvertising.userid === userID_LOCAL ?
               ( <div className="editButton">
               <IconButton size="small" onClick={(event) => handleEdit(event)} style={{ borderRadius: '50%' }} disableRipple>
                 <ModeEditIcon fontSize="small"  sx={{ color: amber[50] }}/>
               </IconButton>
             </div>) 
               : (
                <div className="editButton">

              </div>
               )}
             
            </div>
          </div>
        )}
      </div>

      <img src={next} alt="Next" onClick={handleNext} className="buttons" />
    </div>
  );
}

export default ListOfAdvertisings;
