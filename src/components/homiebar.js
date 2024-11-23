import homielogo from "../brand/homie_logo.png";

function Homiebar() {
    return (
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <img
              src={homielogo}
              alt="Homie logo"
              style={{ width:"10em", marginLeft:"1em", marginTop:"1em", marginBottom:"1em" }}
            />
          </div>
        </div>
      </div>
    );
  }
  
export default Homiebar;