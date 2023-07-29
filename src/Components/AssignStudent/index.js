//import {getUnassignedStudents, updateMentor, updateStudentMany} from '../../Services/APIservices.js';
import { getUnassignedStudents, updateMentor, updateStudentMany } from '../../Apiservices/services';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

const AssignStudents = () => {

    const [unassignedList, setUnassignedList] = useState([]);
    const [wait, setWait] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const data = location.state;
    const mentor = (JSON.parse(data));
    //console.log("data", data, mentor);
    const navigateP = useNavigate();

    const getUnassignedList = async () => {
        const response = await getUnassignedStudents();
        setUnassignedList(response.data.StudentsList);
        //console.log(unassignedList);
        //console.log(response.data);
    };

    const updateMentorDB = async (id, payload) => {
        console.log("update mentor");

        try {
            const response = await updateMentor(id, payload);
            return response;
        }
        catch (err) {
            console.log("error assigning mentor to student", err);
        }

    };

    const updateStudentManyDB = async (id, payload) => {
        console.log("update student");

        try {
            const response = await updateStudentMany(id, payload);
            return response;
        }
        catch (err) {
            console.log("error updating many students", err);
        }

    };

    useEffect(() => {
        getUnassignedList();
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        setWait(true);
        let arr = document.querySelectorAll('[type=checkbox]:checked');
        // console.log(arr, typeof(arr));
        if (arr.length) {
            let target = [];
            arr.forEach((el) => {
                let str = el.value.split('-');
                target.push(str[0]);
            });
            //console.log(target); 
            let assign = { "mentorID": id, "mentor": mentor.mentor }
            //console.log(assign);
            // list of mentees to assign to mentor db
            let payload = [];
            arr.forEach((el) => {
                let str = el.value.split('-');
                payload.push({ "studentID": str[0], "name": str[1] })
            })
            //console.log(payload); 
            const response = updateMentorDB(id, payload);
            response
                .then((res) => {
                    console.log("mentor db", res.status)
                    if (res.status === 200) {
                        let payload = { "target": target, "assign": assign }
                        console.log("update multiple students");
                        let resNext = updateStudentManyDB(id, payload);
                        resNext
                            .then((resFinal) => {
                                console.log("student db", resFinal.status);
                                if (resFinal.status === 200) {
                                    navigateP(`/mentors`);
                                }
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        }
        else {
            console.log("no students selected");
        }
    }

    return (<>
        <h6 className='mt-5' id="headg">ASSIGN STUDENTS : {id} - {mentor.mentor} </h6>
        <div className='d-flex p-2 flex-column flex-wrap'>
            {unassignedList.length === 0 && <p className='text-info'>No students without mentors</p>}
            <form onSubmit={handleSubmit}>
                {unassignedList.map((el) =>
                    <div key={el.studentID}>
                        <input type="checkbox" value={`${el.studentID}-${el.name}`}></input>
                        <label className='mx-2 my-1'>{el.name} - {el.studentID}</label>
                    </div>
                )}
                <button type="submit" className='btn btn-sm btn-primary mx-2 mb-3 text-break'>Assign Students to Mentor</button>
            </form>
            {wait && <p className='text-danger m-2 fw-bold fs-6'>Please wait while we process..</p>}

        </div>
    </>
    )
}
export default AssignStudents;