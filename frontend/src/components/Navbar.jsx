import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HouseContext } from "../context/HouseContext";
import { useContext } from "react";

export const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  const {dispatch: HouseDispatch} = useContext(HouseContext)

  const handleClick = () => {
    localStorage.removeItem('user')
    dispatch({type:'LOGOUT'})
    HouseDispatch({type:'SET_HOUSES',payload:null})
  }

  return (
    <header>
      <div className="navbar">
        <Link to="/">
          <h1>RENTIFY</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.firstName} {user.lastName}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
