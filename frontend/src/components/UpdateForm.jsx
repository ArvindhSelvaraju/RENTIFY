import { useState,useContext } from "react";
import {HouseContext} from '../context/HouseContext'
import {useNavigate,useLocation} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const UpdateForm = () => {
  const location = useLocation()
  const {house} = location.state || {}

  const [place, setPlace] = useState(house.place);
  const [area, setArea] = useState(house.area);
  const [bdrooms, setBdrooms] = useState(house.noOfBedrooms);
  const [btrooms, setBtrooms] = useState(house.noOfBathrooms);
  const [nearby, setNearby] = useState(house.nearby);
  const [error, setError] = useState(null)

  const {dispatch} = useContext(HouseContext)
  const {user} = useContext(AuthContext)

  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user_id = user._id 
    const updatedHouse = {place,area,noOfBedrooms:bdrooms,noOfBathrooms:btrooms,nearby,user_id};

    const response = await fetch(`${apiUrl}/api/houses/`+house._id,{
        method: 'PATCH',
        body: JSON.stringify(updatedHouse),
        headers: {
            "Content-Type":"application/json"
        }
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }

    if(response.ok){
        console.log('house updated')
        dispatch({type:'SET_HOUSE', payload:json})
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
      <button>Update House</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
