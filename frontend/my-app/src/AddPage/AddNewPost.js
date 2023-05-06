import '../index.css';
import { useState, useEffect,useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

function AddNewPost() {
  const userId = localStorage.getItem("userId");
  const [animals, setAnimals] = useState([]);
  const [animalId, setAnimalId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [pictureSrc, setPictureSrc] = useState('');
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");
  const [birthday, setBirthday] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [saveAnimal, setSaveAnimal] = useState("");
  const [sterilizer, setSterilizer] = useState(false);
  const [currentSection, setCurrentSection] = useState('section-1');
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const toggleSection = () => {
    setCurrentSection(currentSection === 'section-1' ? 'section-2' : 'section-1');
    setIsArrowRotated(!isArrowRotated);
  };

  useEffect(() => {
    if (animalId != null) {
      axios
        .get(`http://localhost:7070/api/animals/${animalId}`)
        .then((res) => {
          const animalData = res.data;
          setName(animalData.name);
          setSpecies(animalData.species);
          setSex(animalData.sex);
          setColor(animalData.color);
          setWeight(animalData.weight);
          setPictureSrc(animalData.picture);
          setBirthday(animalData.birthday);
          setSterilizer(animalData.sterilizer);
          setLocation(animalData.location);
        })
        .catch((err) => console.error(err));
    }
  }, [animalId, userId]);

  useEffect(() => {
    axios.get(`http://localhost:7070/api/users/${userId}/animals`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error(err));
      
  }, []);


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

  const handleSubmit = async (event) => {
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
      const post = {
        userid : userId,
        content,
        location,
        category,
        tag,
        picture: reader.result,
        name,
        species,
        color,
        sex,
        location,
        weight,
        picture: reader.result,
        birthday,
        sterilizer
      }
      if(location === ''){
        toast.error("Empty  location", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
        return;
      }
      if(content === ''){
        toast.error("Empty  description", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
        return;
      }
      if(category === ''){
        toast.error("Empty  category", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
        return;
      }
      if(tag === ''){
        toast.error("Empty  tag", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
        return;
      }
    if(category === 'Lovely') {
      const res = await fetch(`http://localhost:7070/api/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      
      if(res.status === 200){ 
        toast.success("Succesfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          style: {
            marginTop: "5rem"
          }
        });
        window.location.href = '/feed' ;
      }else {
        toast.error("Internal server error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
    }
    }
    else  {
      const animal = {
        name,
        species,
        color,
        sex,
        location,
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
      if(saveAnimal===true){
        const res = await fetch(`http://localhost:7070/api/animals/${userId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animal),
      });
      
      const res_post = await fetch(`http://localhost:7070/api/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      
      if(res.status === 200 && res_post.status === 200){ 
        toast.success("Succesfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          style: {
            marginTop: "5rem"
          }
        });
        window.location.href = '/feed' ;
      }else {
        toast.error("Internal server error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });}
      
      }
      
      const res = await fetch(`http://localhost:7070/api/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      
      if(res.status === 200){ 
        toast.success("Succesfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          style: {
            marginTop: "5rem"
          }
        });
        window.location.href = '/feed' ;
      }else {
        toast.error("Internal server error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          style: {
            marginTop: "5rem"
          }
        });
    }
    }
  }
  };


  
    return (
   
      <div className="add-new-post">
       <ToastContainer />

       <div className="add-new-post-picture-side">
       <label htmlFor="picture">Picture:</label>
          <div className="rect-image-add">
            <img src={pictureSrc} alt="animal picture" />
          </div>
          <input type="file" id="picture" name="picture" onChange={handlePictureChange} />
    </div>
    <section id="section-1" style={{ display: currentSection === 'section-1' ? 'block' : 'none' }}>
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
          <option value="For Adoption">For Adoption</option>
          <option value="Looking for Animal">Looking for Animal</option>
          <option value="Lost Animal">Lost Animal</option>
          <option value="Lovely">Lovely</option>
          </select>
          </div>
          <div className="form-control">
          <label>Tag:</label>
          <input
          type="text"
          placeholder="Enter tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          />
 
</div>
<div className="form-control">
          <label>Location:</label>
          <input type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

    </div>
    {category === 'Lovely' && (
  <div className='r_wrap_'>
    <div className="s_round" onClick={handleSubmit}>
      <div className="s_submit"></div>
    </div>
  </div>
)}

{category !== 'Lovely' && category !== '' && (
  <div className='r_wrap'>
    <div className="s_round" onClick={toggleSection}>
      <div className="s_arrow"></div>
    </div>
  </div>
)}
    </section>
    {category !== 'Lovely' && (
    <section id="section-2" style={{ display: currentSection === 'section-2' ? 'block' : 'none' }}>
    <div className="add-new-post-picture-side">
            <h3>Animal Details</h3>
            <label>Do you want to take the details for an existing animal?:</label>
          <select value={animalId} onChange={(e) => setAnimalId(e.target.value)}>
          <option value="-">-</option>
          {animals.map(animal => (
            <option key={animal._id} value={animal._id}>{animal.name}</option>
          ))}
          </select>
            <div className="form-control">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Species</label>
              <input
                type="text"
                placeholder="Enter species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Sex</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
            <div className="form-control">
              <label>Color</label>
              <input
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Birthday</label>
              <input
                type="date"
                placeholder="Enter birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Weight</label>
              <input
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Sterilizer</label>
              <input
                type="checkbox"
                id='checkbox_form'
                checked={sterilizer}
                onChange={(e) => setSterilizer(e.target.checked)}
              />
            </div>
            <div className="form-control">
            <label>Do you want to add this animal to your list?</label>
            <input
              type="checkbox"
              id='checkbox_form'
              checked={saveAnimal}
              onChange={(e) => setSaveAnimal(e.target.checked)}
            />
          </div>
          </div>

          <div className='r_wrap'>
    <div className="s_round" onClick={toggleSection} >
  <div className="s_back"></div>
</div>

  </div>
  <div className='r_wrap_'>
    <div className="s_round" onClick={handleSubmit} >
  <div className="s_submit"></div>
</div>
  </div>
    </section>
    
   )}
   
    </div>

  );
}

export default AddNewPost;
