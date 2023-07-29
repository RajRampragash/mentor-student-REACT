import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
//import { getAllMentors } from "../../Services/APIservices";
import { getAllmentor, updateStudent, updateMentor, removeMentee } from "../../Apiservices/services";
const AssignMentor = () => {

    const [mentorsList, setMentorsList] = useState([]);
    const [wait, setWait] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const data = location.state;
    const student = (JSON.parse(data));
    //console.log("data", data, student);
    const navigateP = useNavigate();

    const getMentorsList = async () => {
        const response = await getAllmentor();
        setMentorsList(response.data.MentorsList);
        //console.log(mentorsList);
        //console.log(response.data);
    };

    const updateStudentDB = async (id, payload) => {
        console.log("update student");

        try {
            const response = await updateStudent(id, payload);
            return response;
        }
        catch (err) {
            console.log("error assigning mentor to student", err);
        }

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

    const updateMenteeDB = async (id, payload) => {
        console.log("update mentee");
        try {
            const response = await removeMentee(id, payload);
            return response;
        }
        catch (err) {
            console.log("error updating mentor to remove student", err);
        }
    };

    useEffect(() => {
        getMentorsList();
    }, [id])

    const assignMentor = (e) => {
        e.preventDefault();
        setWait(true);
        //console.log(e.target);
        let select = document.getElementById("mentorlist")
        let value = select.value;
        let text = select.options[select.selectedIndex].text;
        text = text.split("-");
        text = text[1];
        // console.log("value", value);
        // console.log(text);  
        // console.log(student.hasMentor, student.previous_Mentor, student.assigned_Mentor); 
        //   if(student.assigned_Mentor.mentorID !== undefined && student.assigned_Mentor.mentorID === value){

        //   } 
        let payload = { assigned_Mentor: { "mentorID": value, "mentor": text } };
        let resp = updateStudentDB(id, payload);
        resp
            .then((res) => {
                if (res.status === 200) {
                    console.log("stud update resp", res.status);
                    if (res.status === 200) {
                        let respB = updateMentorDB(value, [{ "studentID": student.studentID, "name": student.name }]);
                        respB
                            .then((resb) => {
                                if (resb.status === 200) {
                                    console.log("mentor update resp", resb.status);
                                    if (resb.status === 200) {
                                        if (student.assigned_Mentor === "" || student.assigned_Mentor === null || student.assigned_Mentor.mentorID === undefined) {
                                            console.log("no mentee update");
                                            navigateP(`/students`);
                                        }
                                        else {
                                            let respC = updateMenteeDB(student.assigned_Mentor.mentorID, { "studentID": student.studentID });
                                            respC
                                                .then((respc) => {
                                                    if (respc.status === 200) {
                                                        console.log("mentee update resp", respc.status);
                                                        if (respc.status === 200) {
                                                            console.log("updated mentee");
                                                            navigateP(`/students`);
                                                        }
                                                    }
                                                })
                                        }
                                    }
                                }
                            })
                            .catch((err) => console.log(err))
                    }
                }
            })
            .catch((err) => console.log(err))

    }

    return (
        <>
            <h5 className="mt-5">Assign Mentor for : {student.name} </h5>
            <h5 className="font-monospace">Student ID: {student.studentID}  </h5>
            <h5 className="font-monospace">Current Mentor: {student.assigned_Mentor.mentorID !== undefined ? student.assigned_Mentor.mentor : "not assigned"}  </h5>
            {mentorsList.length === 0 && <p className="my-3">No mentors found</p>}
            <form className="my-3" onSubmit={assignMentor}>
                <select id="mentorlist">
                    {mentorsList.map((el) => <option key={el.mentorID} value={el.mentorID}>{`${el.mentorID}-${el.mentor}`}</option>)}
                </select>
                <button type="submit" className='btn btn-sm btn-primary m-2 text-break'>Assign Mentor</button>
            </form>
            {wait && <p className='text-danger m-2 fw-bold fs-6'>Please wait while we process..</p>}

        </>
    )
}
export default AssignMentor;