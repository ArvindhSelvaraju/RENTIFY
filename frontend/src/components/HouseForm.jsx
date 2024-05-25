import { useState,useContext } from "react";
import {HouseContext} from '../context/HouseContext'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const HouseForm = () => {
  const [place, setPlace] = useState("");
  const [area, setArea] = useState("");
  const [bdrooms, setBdrooms] = useState("");
  const [btrooms, setBtrooms] = useState("");
  const [nearby, setNearby] = useState("");
  const [error, setError] = useState(null)

  const {dispatch} = useContext(HouseContext)
  const {user} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user_id = user._id 
    const house = {place,area,noOfBedrooms:bdrooms,noOfBathrooms:btrooms,nearby,user_id};

    const response = await fetch('https://rentify-gr27.onrender.com/api/houses',{
        method: 'POST',
        body: JSON.stringify(house),
        headers: {
            "Content-Type":"application/json"
        }
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }

    if(response.ok){
        console.log('new house added',json)
        dispatch({type:'CREATE_HOUSE', payload:json})
        navigate('/')
    }
  }

  return (
    <form className="house-form" onSubmit={handleSubmit}>
      <h3>Add a New House</h3>

      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => {
          setPlace(e.target.value);
        }}
        value={place}
      ></input>
      
      <label>Area(in sq.ft):</label>
      <input
        type="number"
        onChange={(e) => {
          setArea(e.target.value);
        }}
        value={area}
      ></input>

      <label>Bedrooms no:</label>
      <input
        type="number"
        onChange={(e) => {
          setBdrooms(e.target.value);
        }}
        value={bdrooms}
      ></input>

      <label>Bathrooms no:</label>
      <input
        type="number"
        onChange={(e) => {
          setBtrooms(e.target.value);
        }}
        value={btrooms}
      ></input>

      <label>Nearby facilties:</label>
      <textarea
        type="TextArea"
        onChange={(e) => {
          setNearby(e.target.value);
        }}
        value={nearby}
      ></textarea>
      <button>Add House</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
