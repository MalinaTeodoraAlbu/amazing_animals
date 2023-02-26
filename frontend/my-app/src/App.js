import Navbar from "./Navbar";
import { Routes, Route } from 'react-router-dom';
import Feed  from'./Feed'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
     <Routes>
        <Route path="/" />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
