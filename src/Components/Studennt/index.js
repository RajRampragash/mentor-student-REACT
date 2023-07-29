import './student.css'
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Student = () => {
    const { id } = useParams();
    const location = useLocation();
    const data = location.state;
    const student = JSON.parse(data)
    //console.log("data", data, student);
    const navigateP = useNavigate();

    const handleBack = (e) => {
        navigateP(`/students`);
    }

    const handleAssign = (e) => {
        let data = JSON.stringify(student);
        navigateP(`/assign-mentor/${id}`, { state: data });
    }
    return (
        <>
            {student === null && <h4 className="my-3">Student Not found</h4>}
            {student != null &&
                <>
                    <h5 className="mt-5">Student Details : {student.name}</h5>
                    <div className="layout p-3">
                        <div className="sCard border rounded m-3 p-4">
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold'>Student ID: {student.studentID}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold'>Name: {student.name}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold '>Batch: {student.batch.toUpperCase()}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold'>Gender: {student.gender}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold' >Assigned Mentor: {(student.assigned_Mentor !== null && student.assigned_Mentor.mentorID !== undefined && student.assigned_Mentor.mentorID !== "") ? student.assigned_Mentor.mentorID + "-" + student.assigned_Mentor.mentor : "not assigned"}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold' >Previous Mentor: {(student.previous_Mentor !== null && student.previous_Mentor.mentorID !== undefined && student.previous_Mentor.mentorID !== "") ? student.previous_Mentor.mentorID + "-" + student.previous_Mentor.mentor : "not assigned"}</h5>
                        </div>
                    </div>
                </>}
            <button className='btn btn-sm btn-danger m-1 text-break' onClick={handleAssign}>Assign Mentor</button>
            <button className='btn btn-sm btn-primary m-1 text-break' onClick={handleBack}>View all Students</button>
            {/* {studentList.map((el) => <div key={el.studentID} className="tCard border m-3 p-3">
    
    </div> )} */}
        </>)
}
export default Student;