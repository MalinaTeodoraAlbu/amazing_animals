import Navbar from "./Navbar";
import './index.css';

function MyProfile() {
  return (
    <div className="profile">
      <div className="user_details"> 
        <div className="user_details_container"></div>
        <div className="user_details_container_animals"></div>
      </div>
      <div className="user_posts"></div>
    </div>
  );
}

export default MyProfile;