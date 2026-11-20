import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    //   <Routes>
    //     <Route path={"http://localhost:3001/api/users/Login"} element={<Login/>} />
    //     <Route path={"http://localhost:3001/api/users/register"} element={<Register/>} />
    //   </Routes>

    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
    </Routes>

  )

}

export default App;
