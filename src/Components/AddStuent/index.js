import { useNavigate } from 'react-router-dom';
import { addStudent } from '../../Apiservices/services';
import './addStudent.css';
import { useState } from 'react';

const AddStudent = () => {
    const navigateP = useNavigate();
    const [student, setStudent] = useState({ name: "", gender: "", batch: "" })
    const [wait, setWait] = useState(false);

    const addStudentDB = async (payload) => {
        const response = await addStudent(payload);
        return response;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWait(true);

        const name = student.name;
        const gender = student.gender;
        const batch = student.batch;
        //const mentor = document.getElementById('stud-mentor').value; 
        //let hasMentor = (mentor.trim() === "") ? "false" : "true";
        const payload = {
            "name": name.trim(), "batch": batch.toUpperCase(), "gender": gender, "hasMentor": "false",
            assigned_Mentor: {}, previous_Mentor: {}
        };
        const response = addStudentDB(payload);
        response
            .then((res) => {
                if (res.data.added.acknowledged || res.status === 200 || res.status === 201)
                    navigateP(`/students`);
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <h4 className='my-3'>Add Student</h4>
            <div className='formdiv layout'>
                <form className='formCard' onSubmit={handleSubmit}>
                    <div className='container my-5 mx-auto'>
                        <div className='row justify-content-center'>
                            <div className=" col-sm-10 col-md-8 col-lg-8 col-xl-6">

                                <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                    <span className="input-group-text   fw-bold fst-italic" >Name : *</span>
                                    <input type="text" name="name" className="form-control  " id="stud-name" onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} aria-label="Name" aria-describedby="addon-wrapping" required />
                                </div>
                                <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                    <span className="input-group-text   fw-bold fst-italic" >Gender : *</span>
                                    <input type="text" name="gender" className="form-control " id="stud-gender" onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} aria-label="Name" aria-describedby="addon-wrapping" required />
                                </div>
                                <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                    <span className="input-group-text   fw-bold fst-italic" >Batch : *</span>
                                    <input type="text" name="batch" className="form-control  " id="stud-batch" onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} aria-label="Name" aria-describedby="addon-wrapping" required />
                                </div>
                                {/* <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                <span className="input-group-text   fw-bold fst-italic" >Mentor : </span>
                                <input type="text" className="form-control " id="stud-mentor"  aria-label="Name" aria-describedby="addon-wrapping"  />
                        </div>  */}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn btn-sm btn-primary mx-2 mb-3 text-break'>Add Student</button>
                </form>
            </div>
            {wait && <p className='text-danger m-2 fw-bold fs-6'>Please wait while we process..</p>}
        </>)
}
export default AddStudent;