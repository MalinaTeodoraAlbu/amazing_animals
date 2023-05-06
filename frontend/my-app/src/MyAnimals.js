import Navbar from "./Navbar";
import './index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AnimalProfile from "./function/AnimalProfile";
import MedicalRecordsList from "./function/MedicalRecordsList";


function MyAnimals() {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/users/${userId}/animals`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
      
  }, []);

  const handleAnimalClick = (animalID) => {
    axios.get(`http://localhost:7070/api/animals/${animalID}`)
      .then(res => setSelectedAnimal(res.data))
      .catch(err => console.error(err));
  
    axios.get(`http://localhost:7070/api/animals/${animalID}/medicalR`)
      .then(res => setMedicalRecords(res.data))
      .catch(err => console.error(err));
  };
  
  const addAnimal = async (event) => {
    event.preventDefault();
    window.location.href = '/addNewAnimal' ;
  }

  const addNewMedicalRecord = async (event) => {
    event.preventDefault();
    
    window.location.href = `/addNewMedicalRecord/${selectedAnimal._id}`;
  }

  

  return (
    <div className="Animals_container">

    <div className="list_of_animals">
    <div className="Animals_details_container_border">
      <h3>My animals</h3>
      <div className="button_container">
        <button className="add_new_animal" onClick={addAnimal}>Add New Animal</button>
        
      </div>
    </div>
    <div className="list_of_animals_">
            {animals.map(animal => (
          <img key={animal._id} src={animal.picture} alt={animal.name} className="animal_photo" onClick={() => handleAnimalClick(animal._id)} />
          ))}</div>
      
      </div>

              <AnimalProfile selectedAnimal = {selectedAnimal}></AnimalProfile>
      {selectedAnimal ? (
         <div className="medical_details"> 
         <div className="medical_details_container"> 
         <div className="Animals_details_container_border">
      <h3>Medical Records</h3>
      <div className="button_container">
        <button className="add_new_animal" onClick={addNewMedicalRecord}>Add New Medical Record</button>
        
      </div>
    </div> 

            <div className="records_container">
            <MedicalRecordsList medicalRecords={medicalRecords} />
            </div>
            </div>
         <div className="medical_details_container_remind"> 
         <div className="Animals_details_container_border">
              <h3>Remind</h3>
            </div>
              <div className="records_container" >
              <MedicalRecordsList medicalRecords={medicalRecords.filter(record => record.repeat)} />

             </div>
         </div>
       </div>

      ):(
        <div className="medical_details"> 
         <div className="medical_details_container"> 
         <div className="Animals_details_container_border">
      <h3>Medical Records</h3>
      <div className="button_container">
        
      </div>
    </div> 

            <div className="records_container">
            <h3>0 medical records</h3>
            </div>
            </div>
         <div className="medical_details_container_remind"> 
         <div className="Animals_details_container_border">
              <h3>Remind</h3>
            </div>
              <div className="records_container" >
             </div>
         </div>
       </div>

 
      )}

         </div>
 
  );
}

export default MyAnimals;