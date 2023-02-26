import './index.css';

function Navbar() {
  function handleToggleClick() {
    const toggleClick = document.querySelector(".toggleBox");
    const container = document.querySelector(".container");
    toggleClick.classList.toggle("active");
    container.classList.toggle("active");
  }

  return (
    <div className="container">
      <a href="#" className="toggleBox" onClick={handleToggleClick}>
        <span className="icon"></span>
      </a>
      <ul className="navItems">
        <li>
          <a href="/feed">
            <i className="fas fa-home" style={{'--i':1}}></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-heart" style={{'--i':2}}></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-search" style={{'--i':3}}></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-user" style={{'--i':4}}></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-cog" style={{'--i':5}}></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
