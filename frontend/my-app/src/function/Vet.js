import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../style/index.css';
import MedicalRecordsList from "../function/MedicalRecordsList";
import next from '../media/right.png';
import prev from '../media/left.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Delete from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { amber } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

const userID_LOCAL = localStorage.getItem('userId');

function Vet({ notificationId }) {
  const [user, setUser] = useState([]);
  const picture = user ? `http://localhost:7070/${user.imagePaths}` : '';
  const [clients, setClients] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [isRecordDeleted, setIsRecordDeleted] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isAddNew, setIsAddNew] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userIDADD, setuserIDADD] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:7070/api/pacients/${userID_LOCAL}`)
      .then(res => setClients(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/users`)
      .then(res => setAllUsers(res.data))
      .catch(err => console.error(err));

  }, []);

  const addNewMedicalRecord = async (event) => {
    event.preventDefault();
    
    window.location.href = `/addNewMedicalRecord/${selectedAnimal._id}`;
  }
  
  useEffect(() => {
    if (selectedClient) {
      axios.get(`http://localhost:7070/api/users/${selectedClient._id}/animals`)
        .then(res => setAnimals(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedClient]);

  useEffect(() => {
    if (clients.length > 0) {
      const clientRequests = clients.map(client =>
        axios.get(`http://localhost:7070/api/users/${client.pacientID}`)
      );

      Promise.all(clientRequests)
        .then(responses => {
          const completeClients = responses.map(response => response.data);
          setClients(completeClients);
        })
        .catch(err => console.error(err));
    }
  }, [clients]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setSelectedAnimal(null);

    axios.get(`http://localhost:7070/api/users/${client._id}/animals`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
  };


  const handleAnimalClick = (animalID) => {
    axios.get(`http://localhost:7070/api/animals/${animalID}`)
      .then(res => setSelectedAnimal(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:7070/api/animals/${animalID}/medicalR`)
      .then(res => setMedicalRecords(res.data))
      .catch(err => console.error(err));
  };

  const addNewClient = () => {
    setIsAddNew(true);
  } 

  const handleBack = () => {
    setIsAddNew(false);
  } 

  const addNewClientSelectedClient = async (id) => {
    const pacient = {
        medicID : userID_LOCAL,
        pacientID : id
    }
    console.log(pacient)
    try {
        const response = await axios.post(
          "http://localhost:7070/api/pacient",
          pacient
        );
        axios.get(`http://localhost:7070/api/pacients/${userID_LOCAL}`)
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      
  } 

  useEffect(() => {
    if (isRecordDeleted) {
      axios
        .get(`http://localhost:7070/api/animals/${selectedAnimal._id}/medicalR`)
        .then((res) => setMedicalRecords(res.data))
        .catch((err) => console.error(err));
      
      setIsRecordDeleted(false); // Resetează starea
    }
  }, [selectedAnimal, isRecordDeleted]);


  useEffect(() => {
    setFilteredUsers(
      AllUsers.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase()) && user.userType !== 'Vet' && !clients.some(client => client._id === user._id)
      )
    );
  }, [searchEmail, AllUsers, clients]);

  return (
    <div className="Vet_container">
      <div className="Vet_container_clients">
        <div className="border_vet">
          <h3>Clients</h3>
          <IconButton onClick={addNewClient} disableRipple>
            <AddIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
        </div>
        <div className="list_of_clients">
          {clients.map(client => (
            <div
              key={client._id}
              className="Client_VET"
              onClick={() => handleClientClick(client)}
            >
              <img src={`http://localhost:7070/${client.imagePaths}`} alt={client.name} />
              <p>{client.name}</p>
            </div>
          ))}
        </div>
      </div>

      {isAddNew === true ? (
        <div className='addNewClint'>
          <div className="border_vet">
            <h3>Add New Client</h3>
            <IconButton onClick={handleBack} disableRipple>
            <ArrowBackIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
          </div>
          <input
              type="text"
              placeholder="Search by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
          <div className='ListOfAllUser'>
           
         
              {filteredUsers.map(user => (
                <div className="adduserprofile" key={user._id}>
                  <img src={`http://localhost:7070/${user.imagePaths}`} alt={user.name} />
                  <div className='div_client_add_p'> 
                    <p>{user.name}</p>
                  <p>{user.email}</p>
                  </div>
                  
                  <IconButton disableRipple  onClick={() => addNewClientSelectedClient(user._id)}>
            <  AddIcon fontSize="small" />
          </IconButton>
                </div>
              ))}

          </div>
        </div>
      ) : (
        <>
          <div className="Vet_container_clients_animals">
            <div className="listofanimalsofclient">
              <div className="border_vet">
                <h3>Animal's client</h3>
              </div>
              <div className="list_of_clients_animals">
                {animals.map(animal => (
                  <img
                    key={animal._id}
                    src={`http://localhost:7070/${animal.imagePaths}`}
                    alt={animal.name}
                    className="animal_photo"
                    onClick={() => handleAnimalClick(animal._id)}
                  />
                ))}
              </div>
            </div>

            <div className="listofanimalsofclient_side">
              <div className="animal_client_specification">
                <div className="border_vet">
                  <h3>Specifications</h3>
                </div>
                {selectedAnimal ? (
                  <div className="list_of_clients_specifications">
                    <p>Name: {selectedAnimal.name}</p>
                    <p>Species: {selectedAnimal.species}</p>
                    <p>Birthday: {new Date(selectedAnimal.birthday).toLocaleDateString("en-GB")}</p>
                    <p>Sex: {selectedAnimal.sex}</p>
                    <p>Color: {selectedAnimal.color}</p>
                    <p>Weight: {selectedAnimal.weight}</p>
                    {selectedAnimal.sterilizer === 'true' ?
                      (<p>Sterilizer : Yes</p>) : (
                        <p>Sterilizer : No</p>
                      )}
                  </div>
                ) : (
                  <div className="list_of_clients_specifications">
                    <p>Select an animal</p>
                  </div>
                )}
              </div>
              {selectedAnimal ? (
                <div className="animal_client_medical_record">
                  <div className="border_vet">
                    <h3>Medical Records</h3>
                    <IconButton onClick={addNewMedicalRecord} disableRipple>
            <AddIcon fontSize="small" sx={{ color: amber[50] }} />
          </IconButton>
                    
                  </div>
                  <div className="list_of_clients_animals_medical_rec">
                  <MedicalRecordsList medicalRecords={medicalRecords} setIsRecordDeleted={setIsRecordDeleted} />
                  </div>
                </div>
              ) : (
                
                <div className="animal_client_medical_record">
                    <div className="border_vet">
                    <h3>Medical Records</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Vet;
