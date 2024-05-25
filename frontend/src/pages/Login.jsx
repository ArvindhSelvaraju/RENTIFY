import { useState,useContext } from "react";
import {AuthContext} from '../context/AuthContext'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const {dispatch} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('http://localhost:4000/api/user/login',{
        method:'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email,password}),
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }

    if(response.ok){
        localStorage.setItem('user', JSON.stringify(json))
        setError(null)
        dispatch({type:'LOGIN',payload:json})
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>
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

      <button>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
