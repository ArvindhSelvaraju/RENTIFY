import { useEffect, useContext } from "react";
import { HouseDetails } from "../components/HouseDetails";
import { HouseContext } from "../context/HouseContext";
import { AuthContext } from "../context/AuthContext";
import {Link} from 'react-router-dom'

export const Home = () => {
  // const [houses, setHouses] = useState(null)
  const { houses, dispatch } = useContext(HouseContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("https://rentify-gr27.onrender.com/api/houses", {
        headers: {
          "Content-Type": "application/json",
          userid: user._id,
          usertype: user.userType,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_HOUSES", payload: json });
        // setHouses(json)
      }
    };

    if (user) {
      fetchHouses();
      // console.log(houses);
    }
  }, [dispatch]);

  if (user.userType === "Seller") {
    return (
      <div className="home">
        {(!houses || houses.length === 0) && (
          <div className="houses">
            <h1>You haven't added any houses yet.</h1>
          </div>
        )}
        {houses !== null && (
          <>
            <div style={{display:'flex', alignItems:"center", gap:'20px'}}>
              <h2>Your properties:</h2>
              <Link to="/create" className="add-housebtn">Add House</Link>
            </div>
            <div className="houses">
              {houses &&
                houses.map((house) => (
                  <HouseDetails key={house._id} house={house} />
                ))}
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="home">
        {(!houses || houses.length === 0) && (
          <div className="houses">
            <h1>No houses available for rent.</h1>
          </div>
        )}
        {(houses !== null) && (
          <>
            <h2>Available houses for Rent:</h2>
            <div className="houses">
              {houses &&
                houses.map((house) => (
                  <HouseDetails key={house._id} house={house} />
                ))}
            </div>
          </>
        )}
      </div>
    );
  }
};
