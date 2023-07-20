import React, { useState, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const userID_LOCAL = localStorage.getItem('userId');

function SearchPopup(props) {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [selectedCriterial, setSelectedCriterial] = useState('')

  useEffect(() => {
    axios
      .get(`http://localhost:7070/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:7070/api/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCloseSearchPopup = () => {
    props.handleCloseSearchPopup();
  };

  console.log(searchType)


  const handleChange =(type) =>{
    setSearchType(type);
    console.log(searchType);
  }

  const handleRefresh = () => {
    setSearchType("")
    setSelectedCategory("")
    setSelectedCriterial("")
  }

  const handleClickUser = (id) => {
    window.location.href = `/user/${id}`;
  }

  const handleClickPost = (id) => {
    window.location.href = `/viewPost/${id}`;
  }

  return (
    <div className={`popup_container ${props.isSearchPopupOpen ? 'open' : ''}`}>
      <div className="dialog">
        <div className='top_s'>
                    <IconButton aria-label="notif" color="secondary"  onClick={handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                    <IconButton aria-label="notif" color="secondary"  onClick={handleCloseSearchPopup}>
                      <ClearIcon />
                    </IconButton>
        </div>
     
        <div className="TOP_border">
          <div className="SearchBar">
            <form className="search-form" >
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-button">
                <IconButton aria-label="notif" color="secondary" >
                  <SearchIcon />
                </IconButton>
              </button>
              <div className="search-option">
                <div>
                  <input
                    name="type"
                    type="radio"
                    value="type-users"
                    id="type-users"
                    checked={searchType === 'type-users'}
      
                  />
                  <label htmlFor="type-users">
                    <IconButton aria-label="notif" color="secondary"   onClick={() => handleChange('type-users')}>
                      <PersonIcon />
                    </IconButton>
                    <span>Users</span>
                  </label>
                </div>

                <div>
                  <input
                    name="type"
                    type="radio"
                    value="type-posts"
                    id="type-posts"
                    checked={searchType === 'type-posts'}
                
                  />
                  <label htmlFor="type-posts">
                    <IconButton aria-label="notif" color="secondary"     onClick={() => handleChange('type-posts')}>
                      <DynamicFeedIcon />
                    </IconButton>
                    <span>Posts</span>
                  </label>
                </div>
                <div>
                  <input
                    name="type"
                    type="radio"
                    value="type-images"
                    id="type-images"
                    checked={searchType === 'type-images'}
                 
                  />
                  <label htmlFor="type-images">
                    <IconButton aria-label="notif" color="secondary"  onClick={() => handleChange('type-images')}>
                      <PetsIcon />
                    </IconButton>
                    <span>Animal</span>
                  </label>
                </div>
                <div>
                  <input
                    name="type"
                    type="radio"
                    value="type-location"
                    id="type-location"
                    checked={searchType === 'type-location'}
      
                  />
                  <label htmlFor="type-users">
                    <IconButton aria-label="notif" color="secondary"   onClick={() => handleChange('type-location')}>
                      <LocationOnIcon />
                    </IconButton>
                    <span>Location</span>
                  </label>
                </div>

                <div>
                  <input
                    name="type"
                    type="radio"
                    value="type-special"
                    id="type-special"
                    checked={searchType === 'type-special'}
                   
                  />
                  <label htmlFor="type-special">
                    <IconButton aria-label="notif" color="secondary"  onClick={() => handleChange('type-special')}>
                      <CategoryIcon />
                    </IconButton>
                    <span>Category</span>
                  </label>

                 
                 
                </div>
              </div>
            </form>
            
          </div>
        </div>
        <div className="BOT_border">
        {searchType === 'type-users' && (
      <ul>
        {users
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <div className='div_elem_user_search' onClick={ () => handleClickUser(user._id)}>
              <img src={`http://localhost:7070/${user.imagePaths}`}></img>
              <p key={user.id}>{user.name}</p>    
            </div>
            
          ))}
      </ul>
    )}
    {searchType === 'type-location' && (
      <ul>
        {posts
          .filter((post) =>
          post.location && post.location.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((post) => (
            <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
              <img src={`http://localhost:7070/${post.imagePaths}`}></img>
              <p key={post.id}>{post.location}</p>    
            </div>
            
          ))}
      </ul>
    )}
    {searchType === 'type-posts' && (
      <ul>
        {posts
          .filter((post) =>
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((post) => (
            <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
              <img src={`http://localhost:7070/${post.imagePaths}`}></img>
              <p key={post.id}>{post.content}</p>    
            </div>
            
          ))}
      </ul>
    )}
      {searchType === 'type-images' && (
         <>
         {selectedCriterial === "" && (
   <select value={selectedCriterial} onChange={(e) => {setSelectedCriterial(e.target.value)}}>
   <option value="">Select criterial</option>
   <option value="color">color</option>
   <option value="species">species</option>
   <option value="sex">sex</option>
 </select>
         )}
     {selectedCriterial === "color" &&  (
       <ul>
       {posts
         .filter((post) =>
         post.color && post.color.toLowerCase().includes(searchTerm.toLowerCase())
     )
         .map((post) => (
           <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
             <img src={`http://localhost:7070/${post.imagePaths}`}></img>
             <p key={post.id}>{post.color}</p>    
           </div>
           
         ))}
     </ul>
     )}
     {selectedCriterial === "species" && (
       <ul>
       {posts
         .filter((post) =>
         post.species && post.species.toLowerCase().includes(searchTerm.toLowerCase())
         )
         .map((post) => (
           <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
             <img src={`http://localhost:7070/${post.imagePaths}`}></img>
             <p key={post.id}>{post.species}</p>    
           </div>
           
         ))}
     </ul>
     )}
      {selectedCriterial === "sex" && (
       <ul>
       {posts
         .filter((post) =>
         post.sex && post.sex.toLowerCase().includes(searchTerm.toLowerCase())
         )
         .map((post) => (
           <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
             <img src={`http://localhost:7070/${post.imagePaths}`}></img>
             <p key={post.id}>{post.sex}</p>    
           </div>
           
         ))}
     </ul>
     )}
      </>
    )}
     {searchType === 'type-special' && (
      <>
        {selectedCategory === "" && (
  <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value)}}>
  <option value="">Select Category</option>
  <option value="For Adoption">For Adoption</option>
  <option value="Looking for Animal">Looking for Animal</option>
  <option value="Lost Animal">Lost Animal</option>
  <option value="Lovely">Lovely</option>
</select>
        )}
      {selectedCategory === "For Adoption" && (
        <ul>
        {posts
          .filter((post) => post.category === "For Adoption")
          .map((post) => (
            <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
              <img src={`http://localhost:7070/${post.imagePaths}`}></img>
              <p key={post.id}>{post.category}</p>    
            </div>
            
          ))}
      </ul>
      )}
       {selectedCategory === "Looking for Animal" && (
        <ul>
        {posts
          .filter((post) => post.category === "Looking for Animal")
          .map((post) => (
            <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
              <img src={`http://localhost:7070/${post.imagePaths}`}></img>
              <p key={post.id}>{post.category}</p>    
            </div>
            
          ))}
      </ul>
      )}
       {selectedCategory === "Lost Animal" && (
        <ul>
        {posts
          .filter((post) => post.category === "Lost Animal")
          .map((post) => (
            <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
              <img src={`http://localhost:7070/${post.imagePaths}`}></img>
              <p key={post.id}>{post.category}</p>    
            </div>
            
          ))}
      </ul>
      )}
       {selectedCategory === "Lovely" && (
        <ul>
        {posts
          .filter((post) => post.category === "Lovely")
          .map((post) => (
            <div className='div_elem_user_search' onClick={ () => handleClickPost(post._id)}>
              <img src={`http://localhost:7070/${post.imagePaths}`}></img>
              <p key={post.id}>{post.category}</p>    
            </div>
            
          ))}
      </ul>
      )}
      </>
    )}
    
        </div>
        
      </div>
    </div>
  );
}

export default SearchPopup;
