import Services from './pages/Services'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import About from './pages/About';
import RecordKeeper from './pages/RecordKeeper'
import Patient from './pages/Patient'



function App() {
  return (
    <BrowserRouter>
      <Routes>          
        <Route path="/" element={<Home/>}/>
        <Route path="/Services" element={<Services/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/RecordKeeper" element={<RecordKeeper/>}/>
        <Route path="/Patient" element={<Patient/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
