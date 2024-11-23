import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './brand/homie_logo.png';
import Loginpage from './components/loginpage';
import Homepage from './components/homepage';
import Document from './components/filetypes/document';
import Image from './components/filetypes/image';
import { db } from "./config/firebase";
import { useEffect } from "react";

import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

import SellerHomePage from './components/TodoStacks/yilin';

import {useState} from 'react'

function App() {
  // Info that needs to be passed is placed here and passed down
  const [caseno, setCaseno] = useState("");
  const [usertype, setUsertype] = useState("buyer")

  return (
    <Router>
      <Routes>
        <Route
        path="/" 
        element={        
          <Loginpage
          caseno={caseno}
          setCaseno={setCaseno}
          usertype={usertype}
          setUsertype={setUsertype}
          />} 
        />

        <Route
        path="/main" 
        element={        
          <Homepage
          caseno={caseno}
          usertype={usertype}
          />} 
        />

        <Route
        path="/document" 
        element={        
          <Document
          caseno={caseno}
          usertype={usertype}
          />} 
        />

        <Route
        path="/image" 
        element={        
          <Image
          caseno={caseno}
          usertype={usertype}
          />} 
        />

        <Route
        path="/yilin" 
        element={        
          <SellerHomePage />
        } 
        />
      </Routes>
    </Router>
  );
}

export default App;
