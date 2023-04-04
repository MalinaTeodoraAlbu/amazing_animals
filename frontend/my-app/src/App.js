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
        <Route path="/addNewAnimal" element={<AddNewAnimal />} />
      </Routes>
    </div>
  </div>
  );
}


export default App;
