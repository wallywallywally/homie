import logo from './brand/homie_logo.png';
import Loginpage from './components/loginpage';
import Homepage from './components/homepage';

import {useReducer, useState} from 'react'

function App() {
  const [login, setLogin] = useState(false)
  const [caseno, setCaseno] = useState("");
  const [usertype, setUsertype] = useState("buyer")

  return (
    <div className="App">
       {login ?
        <Homepage
        caseno={caseno}
        usertype={usertype}
        /> 
        : 
        <Loginpage
        caseno={caseno}
        setCaseno={setCaseno}
        usertype={usertype}
        setUsertype={setUsertype}
        setLogin={setLogin}
        />
       }
    </div>
  );
}

export default App;
