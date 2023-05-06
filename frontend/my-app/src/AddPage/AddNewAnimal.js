import '../index.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function AddNewAnimal() {
  const userId = localStorage.getItem('userId');
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
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPictureSrc(reader.result);
        setPicture(file);
      }
    }
  };


    const handleSave = async (event) => {
        event.preventDefault();
        if (!picture) {
          toast.error('Please select an image', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
              marginTop: '5rem',
            },
          });
          return;
        }
        if (!['image/jpeg', 'image/png'].includes(picture.type)) {
          toast.error('Unsupported file type', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            style: {
              marginTop: '5rem',
            },
          });
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onloadend = async () => {
          const animal = {
            name,
            species,
            color,
            sex,
            weight,
            picture: reader.result,
            birthday,
            sterilizer
          };

        if(name === ''){
            toast.error("Empty  name", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
            return;
          }
          if(species === ''){
            toast.error("Empty species", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
            return;
          }
          if(sex === '-'){
            toast.error("Empty sex", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
            return;
          }
          if(weight === ''){
            toast.error("Empty weight", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
            return;
          }
          const res = await fetch(`http://localhost:7070/api/animals/${userId}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(animal),
          });
          
          if(res.status === 200){ 
            toast.success("Succesfully!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
              style: {
                marginTop: "5rem"
              }
            });
            window.location.href = '/myAnimals' ;
          }else {
            toast.error("Internal server error", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              style: {
                marginTop: "5rem"
              }
            });
          }}}

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
            <img src={pictureSrc} alt="animal picture" />
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