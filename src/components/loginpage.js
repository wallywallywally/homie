import homielogo from "../brand/homie_logo.png";

function Loginpage(props) {

  const handleChangeCaseno = (event) => {
    props.setCaseno(event.target.value);
  };

  const handleChangeUsertype = (event) => {
    props.setUsertype(event.target.value);
  };

  const handleLogin = () => {
    // !!! CHECK THAT CASE NUMBER IS VAID
    props.setLogin(true);
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
