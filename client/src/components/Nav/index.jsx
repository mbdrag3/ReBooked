import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-2.png"

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/">
              Home
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/about">
              About Us
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/login" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/about">
              About Us
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              Register
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
        <img src={logo} alt="reBooked Logo" style={{ height: '50px', width: 'auto' }} />
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
