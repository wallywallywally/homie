import {useState} from 'react'

function Homepage() {
  const handleUpload = () => {
    // !!! INTERGRATION WITH DB
    props.setLogin(true);
  };

  return (
    <div>
      <button
        onClick={handleUpload}
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
        Upload
      </button>
    </div>
  );
}

export default Homepage;