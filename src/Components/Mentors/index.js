import { useEffect, useState } from "react";
import './mentors.css';
//import { getAllMentors } from "../../Services/APIservices";
import { getAllmentor } from "../../Apiservices/services";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
    const [mentorsList, setMentorsList] = useState([]);
    const navigateP = useNavigate();

    const getMentorsList = async () => {
        const response = await getAllmentor();
        setMentorsList(response.data.MentorsList);
        // console.log(mentorsList);
        // console.log(response.data);
    };

    useEffect(() => {
        getMentorsList();

    }, [])

    const handleView = (e) => {
        let id = e.target.id;
        id = id.split('-');
        id = id[1];
        let data = e.target.getAttribute("data");
        //console.log(e, data);
        navigateP(`/mentor/${id}`, { state: data });
    }

    const handleEdit = (e) => {
        let id = e.target.id;
        id = id.split('-');
        id = id[1];
        let data = e.target.getAttribute("data");
        navigateP(`/assign-students/${id}`, { state: data });

    }
    return (
        <>
            <h5 className="mt-5">Mentors List:</h5>
            <div className="layout px-5 py-2">

                {mentorsList.map((el) => <div key={el.mentorID} className="tCard border m-3 p-3">
                    <p className='fs-5  fw-bold border border-dark rounded text-break '>{el.mentor}</p>
                    <p className='font-monospace text-break ' >ID: {el.mentorID}</p>
                    <p className='fst-italic text-break'> Batch: {el.batch.toUpperCase()}</p>

                    <div className='d-flex flex-wrap flex-column'>
                        <button id={`sView-${el.mentorID}`} data={JSON.stringify(el)} className='btn btn-sm btn-info m-1 text-break' onClick={handleView}>View</button>
                        <button id={`sEdit-${el.mentorID}`} data={JSON.stringify(el)} className='btn btn-sm  btn-danger m-1 text-break' onClick={handleEdit}>Assign Mentee</button>
                    </div>
                </div>)}
            </div>
        </>
    )
}
export default Mentors;