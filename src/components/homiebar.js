import homielogo from "../brand/homie_logo.png";

function Homiebar() {
  const navBarStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    width: "100vw",
    height: "6em",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    gap: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    width: "8em", // Adjust logo size
    marginLeft: "2.5em"
  };

  return (
    <div style={navBarStyle}>
      <div style={logoContainerStyle}>
        <img
          src={homielogo}
          alt="Homie logo"
          style={logoStyle}
        />
      </div>
    </div>
  );
}

export default Homiebar;
