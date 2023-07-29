import { useNavigate } from 'react-router-dom';
import { addMentor } from '../../Apiservices/services';
import './addMentor.css';
import { useState } from 'react';

const AddMentor = () => {

    const [mentor, setMentor] = useState({ mentor: "", course: "", batch: "" })
    const [wait, setWait] = useState(false);

    const navigateP = useNavigate();
    const addMentorDB = async (payload) => {
        const response = await addMentor(payload);
        return response;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWait(true);

        const course = mentor.course;
        const batch = mentor.batch;
        const mentorname = mentor.mentor;
        const payload = { "mentor": mentorname.trim(), "batch": batch.toUpperCase(), "course": course.toUpperCase(), "mentee": [] };
        const response = addMentorDB(payload);
        response
            .then((res) => {
                if (res.data.added.acknowledged || res.status === 200 || res.status === 201)
                    navigateP(`/mentors`);
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <h5 className='my-3'>ADD MENTOR</h5>
            <div className='formdiv layout'>
                <form className='formCard' onSubmit={handleSubmit}>
                    <div className='container my-5 mx-auto'>
                        <div className='row justify-content-center'>
                            <div className=" col-sm-10 col-md-8 col-lg-8 col-xl-6">

                                <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                    <span className="input-group-text   fw-bold fst-italic" >Name : *</span>
                                    <input type="text" name="mentor" className="form-control  " id="ment-mentor" onChange={(e) => setMentor({ ...mentor, [e.target.name]: e.target.value })} aria-label="Name" aria-describedby="addon-wrapping" required />
                                </div>
                                <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                    <span className="input-group-text   fw-bold fst-italic" >Course : *</span>
                                    <input type="text" name="course" className="form-control  " id="ment-course" onChange={(e) => setMentor({ ...mentor, [e.target.name]: e.target.value })} aria-label="Name" aria-describedby="addon-wrapping" required />
                                </div>
                                <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                    <span className="input-group-text   fw-bold fst-italic" >Batch : *</span>
                                    <input type="text" name="batch" className="form-control  " id="ment-batch" onChange={(e) => setMentor({ ...mentor, [e.target.name]: e.target.value })} aria-label="Name" aria-describedby="addon-wrapping" required />
                                </div>
                                {/* <div className="input-group flex-nowrap input-wrapper shadow mb-2 bg-body rounded">
                                <span className="input-group-text   fw-bold fst-italic" >Mentor : </span>
                                <input type="text" className="form-control " id="ment-mentor"  aria-label="Name" aria-describedby="addon-wrapping"  />
                        </div>  */}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn btn-sm btn-primary mx-2 mb-3 text-break'>Add Mentor</button>
                </form>
            </div>
            {wait && <p className='text-danger m-2 fw-bold fs-6'>Please wait while we process..</p>}
        </>
    )
}
export default AddMentor;