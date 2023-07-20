import '../style/index.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
    const userId = localStorage.getItem("userId");
    const [animals, setAnimals] = useState([]);
    const [animalId, setAnimalId] = useState(null);
    const { postID } = useParams();
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");
    const [pictureSrc, setPictureSrc] = useState('');
    const [pictureSrcAnimal, setPictureSrcAnimal] = useState('');
    const [picture, setPicture] = useState("");
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("");
    const [color, setColor] = useState("");
    const [location, setLocation] = useState("");
    const [birthday, setBirthday] = useState("");
    const [weight, setWeight] = useState("");
    const [saveAnimal, setSaveAnimal] = useState("");
    const [sterilizer, setSterilizer] = useState(false);
    const [currentSection, setCurrentSection] = useState('section-1');
    const [isArrowRotated, setIsArrowRotated] = useState(false);



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
            setBirthday(animalData.birthday);
            setSterilizer(animalData.sterilizer);
          })
          .catch((err) => console.error(err));
      }
    }, [animalId, userId]);

    useEffect(() => {
      axios.get(`http://localhost:7070/api/users/${userId}/animals`)
        .then(res => setAnimals(res.data))
        .catch(err => console.error(err));
        
    }, []);
    
    useEffect(() => {
        if(postID){
            fetch(`http://localhost:7070/api/posts/${postID}`)
            .then(response => response.json())
            .then(data => {
              setContent(data.content)
              setCategory(data.category)
              setTag(data.tag)
              setName(data.name)
              setSpecies(data.species)
              setSex(data.sex)
              setColor(data.color)
              setPicture(`http://localhost:7070/${data.imagePaths}`);
              setPictureSrcAnimal(data.imagePaths)
              setWeight(data.weight)
              setBirthday(new Date(data.birthday).toISOString().split("T")[0])
              setSterilizer(data.sterilizer)      
              setLocation(data.location)   
              console.log(picture)    
            });
        }
    }, [postID])

    
    
    const toggleSection = () => {
      setCurrentSection(currentSection === 'section-1' ? 'section-2' : 'section-1');
      setIsArrowRotated(!isArrowRotated);
    };
  
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
      formData.append('tag', tag);
      if (pictureSrc) {
        formData.append('imagePaths', pictureSrc);
      }
      if(category=== 'Lovely'){
        try {
          const res = await axios.put(`http://localhost:7070/api/posts/${postID}`, formData, {});
          if(res.status === 200){
            window.location.href = `/feed`;
          }
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
      else {
    
        
      formData.append('name', name);
      formData.append('species', species);
      formData.append('color', color);
      formData.append('sex', sex);
      formData.append('weight',  parseFloat(weight));
      formData.append('birthday', new Date(birthday));
      formData.append('sterilizer', sterilizer);
      try {
          console.log('in try catch',[...formData]); 
          const res = await axios.put(`http://localhost:7070/api/posts/${postID}`, formData, {});
    
            const formDataAnimal = new FormData();
            formDataAnimal.append('userid', userId);
            formDataAnimal.append('name', name);
            formDataAnimal.append('species', species);
            formDataAnimal.append('sex', sex);
            formDataAnimal.append('color', color);
            formDataAnimal.append('weight', weight);
            formDataAnimal.append('birthday', birthday);
            formDataAnimal.append('sterilizer', sterilizer);
            console.log('before Animals',[...formDataAnimal]); 
            console.log("before picture",pictureSrc)
            console.log("before picture",pictureSrcAnimal)
            if (pictureSrcAnimal) {
              formDataAnimal.append('imagePaths', pictureSrcAnimal);
              console.log(pictureSrc)
            }
            console.log(pictureSrc)
            console.log('after Animals',[...formDataAnimal]); 

         
            if(res.status === 200){
              window.location.href = `/feed`;
            }
          
    
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
    
    
    };

      return (
     
        <div className="add-new-post">
         <ToastContainer />
  
         <div className="add-new-post-picture-side">
         <label htmlFor="picture">Picture:</label>
            <div className="rect-image-add">
              <img src={picture} alt="animal picture" />
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
  
export default EditPost;
