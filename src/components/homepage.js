import CardStack from './TodoStacks/CardStack';
import Homiebar from './homiebar';
import Document from './document';

function Homepage(props) {
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
          <CardStack />
        </div>
        <div style={{flex:'1'}}>
          <Document caseno={props.caseno}/>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Homepage;
