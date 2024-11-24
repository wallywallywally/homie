import CardStack from './TodoStacks/CardStack';
import Homiebar from './homiebar';
import Document from './document';
import { useState } from 'react';

function Homepage(props) {
  const [selected, setSelected] = useState(null)

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  };

  const barContainerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10, 
    backgroundColor: 'white', 
  };

  return (
    <div>

    <div style={barContainerStyle}>
      <Homiebar />
    </div>

    <div style={containerStyle}>
      <div style={{display:"flex"}}>
        <div>
          <CardStack 
          setSelected={setSelected}
          />
        </div>
        <div style={{flex:'1', position:'sticky',top:'0'}}>
          {selected &&
          <Document 
          caseno={props.caseno}
          selected={selected}
          />
          }
        </div>
      </div>
    </div>

    </div>
  );
}

export default Homepage;
