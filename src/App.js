//import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EditStudent from './pages/EditStudent';
import Error404 from './pages/Error404';
import GetStudent from './pages/GetStudent';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/> }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/get_students" element={<GetStudent/>}/>
        <Route path="/edit_student/:stu_id" element={<EditStudent/>}/>
        
        <Route path="/*" element={<Error404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
