import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Homepage/Homepage";
import { Route, Routes } from "react-router-dom";
import Search from "./UnauthorisedControls/Search";
import Login from "./UnauthorisedControls/Login";
import Register from "./UnauthorisedControls/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route index element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
