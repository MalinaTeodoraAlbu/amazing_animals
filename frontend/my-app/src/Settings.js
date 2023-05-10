
import './index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Settings() {
  const [toggleState, setToggleState] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [city, setCity] = useState(null);
  const [birthday, setbirthday] = useState(null)
  const [phoneNumber, setphoneNumber] = useState(null);
  const userId = localStorage.getItem('userId');
  const [name, setName] = useState("");
  const [picture, setPicture] = useState('');
  const [pictureA, setPictureA] = useState('');
  const [bio, setBio] = useState("");
  const[ userType, setuserType] = useState("");

  
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setPictureA(event.target.files[0])
    
    reader.onloadend = () => {
      setPicture(reader.result);
      
    };
    if (file) {
      reader.readAsDataURL(file);
      console.log(file)
    }
  };


  console.log("here is ",pictureA)

  useEffect(() => {
    if(userId){
      fetch(`http://localhost:7070/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUser(data)
          setName(data.name)
          setBio(data.bio)
          setCity(data.city)
          setEmail(data.email)
          setPicture(`http://localhost:7070/${data.imagePaths}`)
          setPassword(data.password)
          setphoneNumber(data.phoneNumber)
          setbirthday(data.birthday)
                  
        });
    }
    }, []);

    const handleEdit = () => {
      setIsEditing(true);

    };
  
    const handleSave = async () => {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('city', city);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('bio', bio);
      formData.append('birthday', birthday);
      formData.append('userType',userType)
      formData.append('imagePaths', pictureA);
      console.log(pictureA)
      
      try {
        const response = await axios.put(`http://localhost:7070/api/users/${userId}`, formData);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleCancel = () => {
      
      setIsEditing(false);
    };

  return (
    <div className="settings">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Account
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Password & Security
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
         Privacy
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Notifications
        </button>
      </div>

      <div className="content-tabs">
      <div className={toggleState === 1 ? "content-set active-content" : "content-set"}>
  {user && (
    <div className="user-settings-container">
      <div className="settings_user">
        <label>Name: </label>
        {isEditing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <h2>{user.name}</h2>
        )}
        <label>Email: </label>
        {isEditing ? (
          <input value={email}  onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <h2>{user.email}</h2>
        )}
        <label>Bio: </label>
        {isEditing ? (
          <input value={bio}  onChange={(e) => setBio(e.target.value)} />
        ) : (
          <h2>{user.bio}</h2>
        )}
        <label>Phone number: </label>
        {isEditing ? (
          <input value={phoneNumber}  onChange={(e) => setphoneNumber(e.target.value)} />
        ) : (
          <h2>{user.phoneNumber}</h2>
        )}
        <label>Birthday: </label>
        {isEditing ? (
          <input
            value={new Date(user.birthday).toLocaleDateString("en-GB")}
            onChange={(e) => setbirthday(e.target.value)}
          />
        ) : (
          <h2>{new Date(user.birthday).toLocaleDateString("en-GB")}</h2>
        )}
        <label>City: </label>
        {isEditing ? (
          <input value={city}  onChange={(e) => setCity(e.target.value)} />
        ) : (
          <h2>{user.city}</h2>
        )}
        
    </div>
    <div className="sett_user_right"> 
        <div className="sett_img-user">
        {isEditing ? (
                    <div className="image-add_set">
                    <img src={picture} alt="Profile Picture" />
                    <input type="file" id="imput_photo_set" accept="image/png, image/gif, image/jpeg" onChange={handlePictureChange} /></div>
        ) : (
          <img src={picture} alt="Profile Picture" />
        )}
      </div>
        {isEditing ? (
          <div className="user_edit_buttons">
                  <button onClick={handleSave}>Save</button>
                   <button onClick={handleCancel}>Cancel</button>
                   </div>
        ) : (
          <div className="user_edit_buttons">
          <button onClick={handleEdit}>edit</button>
          <button>Change password</button>
            </div>
        )}

        </div>

      
        </div>

  )}
</div>

        <div
          className={toggleState === 2 ? "content-set  active-content" : "content-set"}
        >
 
          <p></p>
        </div>

        <div
          className={toggleState === 3 ? "content-set  active-content" : "content-set"}
        >
          <p>This is the content for tab 3.</p>
        </div>
        <div
          className={toggleState === 4 ? "content-set  active-content" : "content-set"}
        >
          <p>This is the content for tab 4.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
