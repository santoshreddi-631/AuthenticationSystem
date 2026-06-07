import { Button } from "react-bootstrap";
import Login from "./Auth/Signin/Login"
import Register from "./Auth/Signup/Register"
import {BrowserRouter , Routes , Route} from "react-router-dom";
function App() {
      return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      );  
}

export default App
