import Navbar from "./Navbar";
import './index.css';

function Favourites() {
  const userId = localStorage.getItem('userId');
  return (
    <div >
     <div className="ListOfFavourites_container">
     <div className="ListOfFavourites_search">
         </div>
      <div className="ListOfFavourites">
         </div>
    </div>
    </div>
  );
}

export default Favourites;