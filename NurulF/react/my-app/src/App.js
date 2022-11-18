import React  from 'react';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import ProfilLayout from './Layout/Components/ProfilLayout'
import DokSharedLayout from './Layout/Components/P_Layout_Dok ';


 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProfilLayout/>}/>
      <Route path="/dokter-shared-layout" element={<DokSharedLayout/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
