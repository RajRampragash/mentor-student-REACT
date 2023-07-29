import { useEffect, useState } from "react";
import './student.css'
//import { getAllStudents } from "../../Services/APIservices";
import { getAllStudents } from "../../Apiservices/services";
import { useNavigate } from "react-router-dom";

const Students = () => {
    const [studentList, setStudentsList] = useState([]);
    const navigateP = useNavigate();

    const getStudentList = async () => {
        const response = await getAllStudents();
        setStudentsList(response.data.StudentsList);
        // console.log(studentList);
        // console.log(response.data);
    };

    useEffect(() => {
        getStudentList();

    }, [])

    const handleView = (e) => {
        let id = e.target.id;
        id = id.split('-');
        id = id[1];
        let data = e.target.getAttribute("data");
        // console.log(e, data);
        navigateP(`/student/${id}`, { state: data });
    }

    const handleEdit = (e) => {
        let id = e.target.id;
        id = id.split('-');
        id = id[1];
        let data = e.target.getAttribute("data");
        navigateP(`/assign-mentor/${id}`, { state: data });
    }
    return (
        <>
            <h5 className="mt-5">Students List:</h5>
            <div className="layout px-5 py-2">

                {studentList.map((el) => <div key={el.studentID} className="tCard border m-3 p-3">
                    <p className='fs-5  fw-bold border border-dark rounded text-break '>{el.name}</p>
                    <p className='font-monospace text-break ' >ID: {el.studentID}</p>
                    <p className='fst-italic text-break'> Batch: {el.batch.toUpperCase()}</p>
                    <div className='d-flex flex-wrap flex-column'>
                        <button id={`sView-${el.studentID}`} data={JSON.stringify(el)} className='btn btn-sm btn-info m-1 text-break' onClick={handleView}>View</button>
                        <button id={`sEdit-${el.studentID}`} data={JSON.stringify(el)} className='btn btn-sm  btn-danger m-1 text-break' onClick={handleEdit}>Assign Mentor</button>
                    </div>
                </div>)}
            </div>
        </>
    )
}
export default Students;