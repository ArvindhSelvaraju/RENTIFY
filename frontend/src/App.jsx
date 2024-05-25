import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import {Home} from './pages/Home'
import { Navbar } from './components/Navbar'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {HouseForm} from './components/HouseForm'
import {UpdateForm} from './components/UpdateForm'
import {AuthContext} from './context/AuthContext'
import { useContext } from 'react'

function App() {
  const {user} = useContext(AuthContext)

  return (
    <div className="app">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />}/>
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}/>
            <Route path='/create' element={user ? <HouseForm /> : <Navigate to='/login' />} />
            <Route path='/update' element={user ? <UpdateForm /> : <Navigate to='/login' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App