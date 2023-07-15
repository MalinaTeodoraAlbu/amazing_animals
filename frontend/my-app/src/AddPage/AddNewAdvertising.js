import '../style/index.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

function AddAdvertising() {
  const userId = localStorage.getItem('userId');
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [pictureSrc, setPictureSrc] = useState('');
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userid', userId);
    formData.append('content', content);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('datePosted', new Date().toISOString());
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    if (pictureSrc) {
      formData.append('imagePaths', pictureSrc);  
    }

    try {
      const res = await axios.post(`http://localhost:7070/api/advertising`, formData, {
      });
      if(res.status === 200){
        window.location.href = `/feed`;}
    } catch (error) {
      console.error(error);
    toast.error('Internal server error', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      style: {
        marginTop: '5rem'
      }
    });
    }


  }  

  return (
    <div className="add-new-post">
       <div className="add-new-post-picture-side">
       <label htmlFor="picture">Picture:</label>
          <div className="rect-image-add">
            <img src={picture} alt="animal picture" />
          </div>
          <input type="file" id="picture" name="picture" onChange={handlePictureChange} />
    </div>
    <div className="add-new-post-picture-side">
          
          <div className="form-control">
          <label>Content:</label>
          <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ></textarea>
          </div>
          <div className="form-control">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Pet Adoption">Pet Adoption</option>
            <option value="Veterinary Services">Veterinary Services</option>
            <option value="Pet Food and Accessories">Pet Food and Accessories</option>
            <option value="Pet Care Services">Pet Care Services</option>
            <option value="Animal Protection and Charity">Animal Protection and Charity</option>
            <option value="Events and Gatherings">Events and Gatherings</option>
          </select>
          </div>
          <div className="form-control">
          <label>Location:</label>
          <input type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="form-control">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="form-control">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        
        <div className='r_wrap__'>
          <div className="s_round" onClick={handleSubmit}>
            <div className="s_submit"></div>
          </div>
        </div>
        
        <div className="spatiu_Add">
      
        </div>
        
    
          </div>
  </div>
  );
}
  
export default AddAdvertising;