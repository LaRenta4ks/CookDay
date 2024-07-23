import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav-container">
      <NavLink to={"/"}>
        <img src="./CookDay.jpg" alt="CookDay" className="nav-logo" />
      </NavLink>
    </nav>
  );
};

export default Header;
