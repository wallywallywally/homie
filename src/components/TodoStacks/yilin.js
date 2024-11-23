import SellerCardStack from './SellerCardStack';
import Homiebar from '../homiebar';

function SellerHomePage() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  };

  const cardContainerStyle = {
    marginLeft: '-1300px',
  }

  const barContainerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10, 
    backgroundColor: 'white', 
  };

  return (
    <div style={containerStyle}>
      <div style={barContainerStyle}>
        <Homiebar />
      </div>
      <div style={cardContainerStyle}>
        <SellerCardStack />
      </div>
    </div>
  );
}

export default SellerHomePage;
