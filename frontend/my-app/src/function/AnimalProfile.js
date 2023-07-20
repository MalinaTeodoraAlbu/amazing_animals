import React from 'react';
import pic from '../media/e7f4f592f2f2f1d212ca1e225ef46360.jpg'
import { jsPDF } from "jspdf";
import '../style/index.css';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { amber } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Delete from '@mui/icons-material/Delete';

function AnimalProfile(props) {
  const { selectedAnimal } = props;

  const handleEdit = (event) => {
    event.preventDefault();
    window.location.href = `/editAnimal/${selectedAnimal._id}`;
  };
  
 const handleDelete =  async (animalID) =>
  {
    axios.delete(`http://localhost:7070/api/animals/${animalID}`)

    window.location.href = `/myAnimals`;
  }
  return (
    <div className="Animals_profile_container">
      {selectedAnimal ? (
        <>
          <div className="Animals_photo_container">
            <img src={`http://localhost:7070/${selectedAnimal.imagePaths}`} alt={selectedAnimal.name} className="selected_animal_photo" />
          </div>

          <div className="Animals_details_container_">
            <div className="Animals_details_container_border">
              <h3>Specifications</h3>
              <IconButton  onClick={ () => {handleDelete(selectedAnimal._id)}} disableRipple>
            <Delete fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
              <IconButton  onClick={handleEdit} disableRipple>
            <ModeEditIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
            </div>
            <div className="Animals_details_container">
              <p>Name: {selectedAnimal.name}</p>
              <p>Species: {selectedAnimal.species}</p>
              <p>Birthday: {new Date(selectedAnimal.birthday).toLocaleDateString("en-GB")}</p>
              <p>Sex: {selectedAnimal.sex}</p>
              <p>Color: {selectedAnimal.color}</p>
              <p>Weight: {selectedAnimal.weight}</p>
              {selectedAnimal.sterilizer === 'true'? 
              ( <p>Sterilizer : Yes </p>) : (
                <p>Sterilizer : No </p>
              )

              }
             
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="Animals_photo_container">
            <img src={pic} alt="Profile Picture" />
          </div>

          <div className="Animals_details_container_">
            <div className="Animals_details_container_border">
              <h3>Specifications</h3>
    
            </div>
            <div className="Animals_details_container">
              <h2> Select an animal!</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnimalProfile;