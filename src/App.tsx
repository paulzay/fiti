import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Navbar from "./common/Navbar";
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
