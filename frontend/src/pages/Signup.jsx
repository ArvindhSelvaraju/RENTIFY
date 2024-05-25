import { useState, useContext } from "react";
import {AuthContext} from '../context/AuthContext'

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const {dispatch} = useContext(AuthContext)

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch(`${apiUrl}/api/user/signup`,{
        method:'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({firstName,lastName,phone,userType,email,password})
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }

    if(response.ok){
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type:'LOGIN',payload:json})
        setError(null)
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        required
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        required
      />

      <label>Phone number:</label>
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        required
      />

      <label>Usage:</label>
        <div className="radio">
          <input
            type="radio"
            value="Buyer"
            checked={userType === 'Buyer'}
            onChange={(e) => setUserType(e.target.value)}
            required
          />
          <label>Buyer</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            value="Seller"
            checked={userType === 'Seller'}
            onChange={(e) => setUserType(e.target.value)}
            required
          />
          <label>Seller</label>
        </div>
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <button>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
