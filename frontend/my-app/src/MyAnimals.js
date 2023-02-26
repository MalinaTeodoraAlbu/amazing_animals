import Navbar from "./Navbar";
import './index.css';

function MyAnimals() {
  return (
    <div className="Animals_container">
      <div className="list_of_animals"></div>

      <div className="Animals_profile_container"> 
          <div className="Animals_photo_container"></div>
          <div className="Animals_details_container"></div>
      </div>


      <div className="medical_details"> 
        <div className="medical_details_container"></div>
        <div className="medical_details_container_remind"></div>
      </div>

    </div>
  );
}

export default MyAnimals;