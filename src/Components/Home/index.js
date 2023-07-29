// const Home = () => {
//     return (
//         <div>
//             iam Home
//         </div>
//     )
// }

// export default Home

import { useState } from "react";
import { viewMentor, viewStudent } from "../../Apiservices/services";
//import { viewMentor, viewStudent } from "../../Services/APIservices";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigateP = useNavigate();
    const [flag, setFlag] = useState(false);
    const [sid, setSID] = useState("");
    const [mid, setMID] = useState("");

    const findStudent = (e) => {
        e.preventDefault();
        const getStudent = async (id) => {
            //console.log("fetch call", id);
            try {
                const response = await viewStudent(id);
                //console.log(response.data, response.data.Mentor);
                let student = { ...response.data.Student }
                let data = JSON.stringify(student)
                navigateP(`/student/${id}`, { state: data });
            }
            catch (err) {
                console.log("Student not found", err);
                setFlag(true)
            }

        };
        const id = sid;
        if (id) {
            try {
                getStudent(id.toUpperCase());
            }
            catch (err) {
                navigateP("/")
            }
        }
    }

    const findMentor = (e) => {
        e.preventDefault();
        const getMentor = async (id) => {
            //console.log("fetch call", id);
            try {

                const response = await viewMentor(id);
                //console.log(response.data, response.data.Mentor);
                let mentor = { ...response.data.Mentor }
                let data = JSON.stringify(mentor)
                navigateP(`/mentor/${id}`, { state: data });
            }
            catch (err) {
                console.log("Mentor not found", err);
                setFlag(true);
            }

        };
        const id = mid;
        if (id) {
            getMentor(id.toUpperCase());
        }
    }
    return (
        <div>
            <h4 className="my-5">Welcome to the Homepage</h4>
            <form onSubmit={findStudent}>
                <label>Enter Student ID:</label>
                <input type="text" id="stud-id" onChange={(e) => setSID(e.target.value)} defaultValue={""}></input>
                <button type="submit">Find Student</button>
            </form>
            <br></br>
            <form onSubmit={findMentor}>
                <label>Enter Mentor ID:</label>
                <input type="text" id="ment-id" onChange={(e) => setMID(e.target.value)} defaultValue={""}></input>
                <button type="submit">Find Mentor</button>
            </form>
            {flag && <p className="text-danger">Record not found</p>}
        </div>
    )
}
export default Home;