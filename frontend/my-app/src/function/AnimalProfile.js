import React from 'react';
import pic from '../media/e7f4f592f2f2f1d212ca1e225ef46360.jpg'
import { jsPDF } from "jspdf";
import '../style/index.css';

function AnimalProfile(props) {
  const { selectedAnimal } = props;

  const handleEdit = (event) => {
    event.preventDefault();
    window.location.href = `/editAnimal/${selectedAnimal._id}`;
  };
  
  

  return (
    <div className="Animals_profile_container">
      {selectedAnimal ? (
        <>
          <div className="Animals_photo_container">
            <img src={selectedAnimal.picture} alt={selectedAnimal.name} className="selected_animal_photo" />
          </div>

          <div className="Animals_details_container_">
            <div className="Animals_details_container_border">
              <h3>Specifications</h3>
              <button className="add_new_animal edit" onClick={handleEdit} >Edit</button>
              
            </div>
            <div className="Animals_details_container">
              <p>Name: {selectedAnimal.name}</p>
              <p>Species: {selectedAnimal.species}</p>
              <p>Birthday: {selectedAnimal.birthday}</p>
              <p>Sex: {selectedAnimal.sex}</p>
              <p>Color: {selectedAnimal.color}</p>
              <p>Weight: {selectedAnimal.weight}</p>
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
              <button className="add_new_animal">Edit</button>
            </div>
            <div className="Animals_details_container">
              Select an animal!
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnimalProfile;