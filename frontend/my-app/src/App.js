import Navbar from "./Navbar";
import { Routes, Route } from 'react-router-dom';
import Feed  from'./Feed'
import Favourites  from'./Favourites'
import MyAnimals  from'./MyAnimals'
import MyProfile  from'./MyProfile'
import Settings  from'./Settings'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
     <Routes>
        <Route path="/" />
        <Route path="/feed" element={<Feed />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/myAnimals" element={<MyAnimals />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
