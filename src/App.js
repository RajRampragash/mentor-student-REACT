//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/index';
import Home from './Components/Home/index';
import Student from './Components/Studennt/index';
import Students from './Components/Students/inndex';
import Mentor from './Components/Mentor/index';
import Mentors from './Components/Mentors/index';
import AssignMentor from './Components/AssignMentor/inndex';
import AssignStudents from './Components/AssignStudent/index';
import AddStudent from './Components/AddStuent/index';
import AddMentor from './Components/AddMentor/index';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/students" element={<Students />} ></Route>
        <Route path="/add-student" element={<AddStudent />} ></Route>
        <Route path="/mentors" element={<Mentors />} ></Route>
        <Route path="/add-mentor" element={<AddMentor />} ></Route>
        <Route path="/assign-mentor/:id" element={<AssignMentor />} ></Route>
        <Route path="/assign-students/:id" element={<AssignStudents />} ></Route>
        <Route path="/student/:id" element={<Student />} ></Route>
        <Route path="/mentor/:id" element={<Mentor />} ></Route>
      </Routes>
    </div>
  );
}

export default App;