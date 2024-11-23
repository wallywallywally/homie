import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './brand/homie_logo.png';
import Loginpage from './components/loginpage';
import Homepage from './components/homepage';
import Document from './components/filetypes/document';
import Image from './components/filetypes/image';
import SellerHomePage from './components/TodoStacks/yilin';
import Yilin from './TodoStacks/yilin';
import { db } from "./config/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';


import {useState} from 'react'

function App() {
  // Info that needs to be passed is placed here and passed down
  const [caseno, setCaseno] = useState("");
  const [usertype, setUsertype] = useState("buyer")
  const [inputForFinancial, setInputForFinancial] = useState([]);
  const [inputForOfferLetters, setInputForOfferLetters] = useState([]);
  const [tasks, setTasks] = useState([]);

  //references to collections
  const financialCollectionRef = collection(db, "input_for_financial");
  const offerLettersCollectionRef = collection(db, "input_for_offer_letters");
  const tasksCollectionRef = collection(db, "tasks");

  // READ: Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const financialData = await getDocs(financialCollectionRef);
        const offerLettersData = await getDocs(offerLettersCollectionRef);
        const tasksData = await getDocs(tasksCollectionRef);

        setInputForFinancial(financialData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setInputForOfferLetters(offerLettersData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setTasks(tasksData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // CREATE: Add a new document
  const createDocument = async (collectionRef, newData) => {
    try {
      await addDoc(collectionRef, newData);
      alert("Document added successfully!");
    } catch (err) {
      console.error("Error adding document:", err);
    }
  };

  // UPDATE: Update an existing document
  const updateDocument = async (collectionName, id, updatedData) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updatedData);
      alert("Document updated successfully!");
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  // DELETE: Delete a document
  const deleteDocument = async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      alert("Document deleted successfully!");
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

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
