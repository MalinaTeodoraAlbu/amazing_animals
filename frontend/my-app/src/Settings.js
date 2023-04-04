import Navbar from "./Navbar";
import './index.css';

function Settings() {
  return (
    <div className="settings">
    <div className="setttings_container">
      <div className="settings_button"> <p>Account</p></div>
      <div className="settings_button"><p>Password & Security</p></div>
      <div className="settings_button"><p>Privacy</p></div>
      <div className="settings_button"><p>Notifications</p></div>

      <div className="settings_button_logout"></div>
    </div>
    <div className="setttings_container_details"></div>
  </div>
  
  );
}

export default Settings;