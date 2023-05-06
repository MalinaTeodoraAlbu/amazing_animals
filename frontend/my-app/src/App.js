import Navbar from "./Navbar";
import { Routes, Route , useLocation } from 'react-router-dom';
import Feed  from'./Feed'
import Favourites  from'./Favourites'
import MyAnimals  from'./MyAnimals'
import MyProfile  from'./MyProfile'
import Settings  from'./Settings'
import Header from "./Header";

import './index.css';
import Login from "./Login";
import AddNewAnimal from "./AddPage/AddNewAnimal"
import AddNewMedicalRecord from "./AddPage/AddNewMedicalRecord"
import EditAnimal from "./EditPages/EditAnimal"
import EditPost from "./EditPages/EditPost"
import AddNewPost from "./AddPage/AddNewPost"
import ViewPost from "./ViewPost";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="App">
    {}
    { <Header />}
    <div className="content">
      {}
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/myAnimals" element={<MyAnimals />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/AddNewPost" element={<AddNewPost />} />
        <Route path="/addNewAnimal" element={<AddNewAnimal />} />
        <Route path="/addNewMedicalRecord/:animalId" element={<AddNewMedicalRecord />} />
        <Route path="/editAnimal/:animalId" element={<EditAnimal />} />
        <Route path="/editPost/:postID" element={<EditPost />} />
        <Route path="/viewPost/:postID" element={<ViewPost />} />

      </Routes>
    </div>
  </div>
  );
}


export default App;
