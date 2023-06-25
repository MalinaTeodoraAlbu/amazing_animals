import '../style/index.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const userId = localStorage.getItem('userId');

function AddNewAnimal() {

  const [pictureSrc, setPictureSrc] = useState('');
  const [name,setName] = useState('');
  const [species,setSpecies] = useState('');
  const [color,setColor] = useState('');
  const [sex,setSex] = useState('');
  const [weight,setWeight] = useState('');
  const [picture,setPicture] = useState('');
  const [birthday, setBirthday] = useState("");
  const [sterilizer, setSterilizer] = useState("");

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setPictureSrc(event.target.files[0])
    
    reader.onloadend = () => {
      setPicture(reader.result);
      
    };
    if (file) {
      reader.readAsDataURL(file);
      console.log(file)
    }
  };


  const handleSave = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userid', userId);
    formData.append('name', name);
    formData.append('species', species);
    formData.append('sex', sex);
    formData.append('color', color);
    formData.append('weight', weight);
    formData.append('birthday', birthday);
    formData.append('sterilizer', sterilizer);
    formData.append('imagePaths', pictureSrc);

    try {
      const animalRes = await axios.post(`http://localhost:7070/api/animal`, formData);
      console.log(animalRes);

      if (animalRes.status === 200) {
        window.location.href = '/myAnimals';
      }
    } catch (error) {
      console.error(error);
      
    }
  };


          const handleCancel = async (event) => {
            event.preventDefault();
            window.location.href = '/myAnimals' ;
          }

          
  return (
    <div className="add-new-animal">
        <ToastContainer />
    <div className="container_add_new_animal">
    <div className="Animals_details_container_border">
      <h3>Add New Animal</h3>
      <button className="save_button" onClick={handleCancel}>Cancel</button>
      <button className="save_button" onClick={handleSave}>Save</button>
      </div>
      <div className="container_add_new_animal_">
        <div className="container_add_new_animal_a">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <label htmlFor="species">Species:</label>
          <input type="text" id="species" name="species" value={species} onChange={(e) => setSpecies(e.target.value)}/>
          <label htmlFor="color">Color:</label>
          <input type="text" id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)}/>
          <label htmlFor="sex">Sex:</label>
          <select id="sex" name="sex" required value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="">-</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            </select>
          <label htmlFor="weight">Weight:</label>
          <input type="text" id="weight" name="weight" value={weight} onChange={(e) => setWeight
            (e.target.value)}/>
        </div>
        <div className="container_add_new_animal_b">
          <label htmlFor="picture">Picture:</label>
          <div className="circle-image">
            <img src={picture} alt="animal picture" />
          </div>
          <input type="file" id="picture" name="picture" onChange={handlePictureChange} />
          <label htmlFor="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          <div className="checkboxes_a">
            <label htmlFor="sterilizer">Sterile:</label>
            <input type="checkbox" id="sterilizer" name="sterilizer" value={sterilizer}
                    onChange={(e) => {
                    setSterilizer(e.target.checked);
                    const notificationCheckbox = document.getElementById("notification");
                    notificationCheckbox.disabled = e.target.checked;
                    if (e.target.checked) {
                        notificationCheckbox.checked = false;
                    }
                    }}/>
            </div>
            <div className="checkboxes">
            <label htmlFor="notification">Receive notification about sterilization campaign:</label>
            <input type="checkbox" id="notification" name="notification" value="true"/>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
}
  
export default AddNewAnimal;