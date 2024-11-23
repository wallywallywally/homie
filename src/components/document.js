import {useState} from 'react'
import '../css/centre.css';

// either document or image -> fields

// states
// 1. doc type - document or image
// 2. doc uploaded ?

function Document(props) {
  // !!! INTERGRATION WITH DB
  const handleUploadDocument = () => {

  };

  const handleUploadImage = () => {
    
  };

  return (
    <div>
    <div className="centre">
      <h1 style={{fontSize:"3em"}}>{props.title} help</h1>

      <button
        onClick={props.type == "document" ? handleUploadDocument : handleUploadImage}
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