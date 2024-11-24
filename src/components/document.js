import {useState} from 'react'
import '../css/centre.css';

// states
// 1. doc uploaded ?

function Document(props) {
  const [exists, setExists] = useState(null)
  // !!! INTERGRATION WITH DB
  const checkExists = () => {
    // check if the DB has the props.selected doc
    // if true, setExists = true / else false
  }

  const handleUpload = () => {

  };

  return (
    <div>
    <div className="centre">
      <h1 style={{fontSize:"3em"}}>{props.selected}</h1>

      <button
        onClick={handleUpload}
        style={{
          padding: '1em 2em',
          backgroundColor: '#3d7faf',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Teachers',
          fontSize: '1.2em'
        }}
        >
        Upload
      </button>

      
    </div>
    </div>
  );
}

export default Document;