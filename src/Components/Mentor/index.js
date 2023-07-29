import './mentor.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Mentor = () => {
    const { id } = useParams();
    const location = useLocation();
    const data = location.state;
    const mentor = JSON.parse(data)
    // console.log("data", data, student);
    const navigateP = useNavigate();

    const handleBack = (e) => {
        navigateP(`/mentors`);
    }
    const handleAssign = (e) => {
        let data = JSON.stringify(mentor);
        navigateP(`/assign-students/${id}`, { state: data });
    }
    return (
        <>
            {mentor === null && <h4 className="my-3">Mentor Not found</h4>}
            {mentor != null &&
                <>
                    <h5 className="mt-5">Mentor Details : {mentor.mentor}</h5>
                    <div className="layout p-3">
                        <div className="sCard border rounded m-3 p-4">
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold'>Mentor ID: {mentor.mentorID}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold'>Mentor: {mentor.mentor}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold '>Batch: {mentor.batch.toUpperCase()}</h5>
                            <h5 className='border border-secondary p-2 text-break fs-6 fw-bold'>Course: {mentor.course.toUpperCase()}</h5>
                            {mentor.mentee.length === 0 ? <h5 className='border border-secondary p-2 text-break fs-6 fw-bold' > Mentee : Not assigned </h5> :
                                <h5 className=' p-2 text-break fs-6 fw-bold' > Mentee List : </h5>}
                            {mentor.mentee.map((el, i) =>
                                <h5 key={i} className='border border-secondary p-2 text-break fs-6 fw-bold' >ID : {el.studentID} {el.name} </h5>
                            )}
                        </div>
                    </div>
                </>}
            <button className='btn btn-sm btn-danger m-1 text-break ' onClick={handleAssign}>Assign Mentee</button>
            <button className='btn btn-sm btn-primary m-1 text-break ' onClick={handleBack}>View all Mentors</button>
        </>)
}
export default Mentor;