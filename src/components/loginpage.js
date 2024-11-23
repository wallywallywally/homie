import { useNavigate } from "react-router-dom";
import homielogo from "../brand/homie_logo.png";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions

function Loginpage(props) {
  const navigate = useNavigate()
  const db = getFirestore();

  const handleChangeCaseno = (event) => {
    props.setCaseno(event.target.value);
  };

  const handleChangeUsertype = (event) => {
    props.setUsertype(event.target.value);
  };

  const handleLogin = () => {
    try {
      const caseno = props.caseno; // Case number entered by the user
      if (!caseno) {
        alert("Please enter a case number!");
        return;
      }
  
      // Reference to the Firestore collection where case numbers are stored
      const caseCollection = collection(db, "caseNumbers");
  
      // Query to check if the case number exists
      const q = query(caseCollection, where("caseno", "==", caseno));
      const querySnapshot = getDocs(q);
  
      if (!querySnapshot.empty) {
        // Case number exists
        navigate("/main");
      } else {
        // Case number does not exist
        alert("Invalid case number! Please try again.");
      }
    } catch (error) {
      console.error("Error checking case number:", error);
      alert("An error occurred while checking the case number.");
    }
  };
  

  return (
<div style={{ padding: '200px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <img src={homielogo} alt="Homie logo" style={{ width:"300px" }}/>
      <div style={{ marginBottom: '20px', marginTop: '50px' }}>
        <label htmlFor="inputField" style={{ display: 'block', marginBottom: '10px', fontSize: '1.2em' }}>
          Enter the case number:
        </label>
        <input
          id="inputField"
          type="text"
          value={props.caseno}
          onChange={handleChangeCaseno}
          style={{
            padding: '8px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '35px' }}>
        <label htmlFor="dropdown" style={{ display: 'block', marginBottom: '10px', fontSize: '1.2em' }}>
          I am a:
        </label>
        <select
          id="dropdown"
          value={props.usertype}
          onChange={handleChangeUsertype}
          style={{
            padding: '8px',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'Teachers'
          }}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3d7faf',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Teachers'
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Loginpage;
