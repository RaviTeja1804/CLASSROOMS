import React, { useState, useEffect } from 'react'
import './CSS/HomepageAdmin.css'
import {useNavigate} from 'react-router-dom'
import classroomImg from './images/classroomimgnew.png'
import teacherImg from './images/teacherimg.png'
import feedbackImg from './images/feed.jpg'
import personImg from './images/personimg.png'
import logoutImg from './images/logoutimg.png'

function HomepageAdmin() {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };

    const [whatToDo, setWhatToDo] = useState('addclassroom')
    let content
    const [atTop, setAtTop] = useState('Enter the details')

    const [formDataForDeleteTeacher, setFormDataForDeleteTeacher] = useState({
        email:"",
        fullName:""
    })

    const [formDataForAddClassroom, setFormDataForAddClassroom] = useState({
        name:"",
        location:"",
        capacity:"",
        equipment:""
    })

    const [formDataForRemoveClassroom, setFormDataForRemoveClassroom] = useState({
        name:"",
        location:"",
        reason:""
    })

    const changeHandler1 = (e) => {
        e.preventDefault();
        setFormDataForDeleteTeacher({...formDataForDeleteTeacher, [e.target.name]: e.target.value})
    }

    const changeHandler2 = (e) => {
        e.preventDefault();
        setFormDataForAddClassroom({...formDataForAddClassroom, [e.target.name]: e.target.value})
    }

    const changeHandler3 = (e) => {
        e.preventDefault();
        setFormDataForRemoveClassroom({...formDataForRemoveClassroom, [e.target.name]: e.target.value})
    }

    const [stylist, setStylist] = useState('oneoffour1')

    const removeteacher = async () => {
        const res = await fetch('http://localhost:4000/teacher/removeteacher', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formDataForDeleteTeacher)
        })
        alert(res.message)
    }

    const removeClassroom = async () => {
        const res = await fetch('http://localhost:4000/removeclassroom', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formDataForRemoveClassroom)
        })
        console.log(res.message)
        alert(res.message)
    }

    const addclassroom = async () => {
        formDataForAddClassroom.equipment = formDataForAddClassroom.equipment.split(',') 
        const res = await fetch('http://localhost:4000/addclassroom', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formDataForAddClassroom)
        })
        const data = await res.json(); 
        alert(data.message);
    }

    const [allTeachersData, setAllTeachersData] = useState([]);
    useEffect(() => {
        if (whatToDo === 'allteachers') {
            getTeachers();
        }
    }, [whatToDo]);

    const [allFeedbacks, setAllFeedbacks] = useState([]);
    useEffect(() => {
        if (whatToDo === 'allfeedbacks') {
            getFeedbacks();
        }
    }, [whatToDo]);

    const getTeachers = () => {
        fetch('http://localhost:4000/teacher/getTeachers', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
              }
        })
        .then((response) => response.json())
        .then((data) => {
            setAllTeachersData(data)
        })
    }

    const getFeedbacks = () => {
        fetch('http://localhost:4000/allFeedbacks', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
              }
        })
        .then((response) => response.json())
        .then((data) => {
            setAllFeedbacks(data)
        })
    }

    if(whatToDo === 'addclassroom')
    {
        content = (
            <form className='booknow-content'>
            <div className="addclassroom">
                <div className="eachdetail">
                    <label htmlFor="endTime">Classroom Name : </label>
                    <input type="text" id="endTime" name="name" value={formDataForAddClassroom.name} onChange={changeHandler2} required />
                </div>

                <div className="eachdetail">
                    <label htmlFor="classroom">Location : </label>
                    <input type="text" id="classroom" name="location" value={formDataForAddClassroom.location} onChange={changeHandler2} required />
                </div>

                <div className="eachdetail">
                    <label htmlFor="purpose">Capacity :</label>
                    <input type="text" id="purpose" name="capacity" value={formDataForAddClassroom.capacity} onChange={changeHandler2} required />
                </div>

                <div className="eachdetail">
                    <label htmlFor="name">Equipment :</label>
                    <input type="text" id="name" name="equipment" value={formDataForAddClassroom.equipment} onChange={changeHandler2} required />
                </div>
            </div>
            <button type="submit" onClick={() => addclassroom()} className='bookclass'>Submit</button>
            </form>
        )
    }
    else if(whatToDo === "removeclassroom")
    {
        content = (
            <form className='booknow-content'>
            <div className="addclassroom">
                <div className="eachdetail">
                    <label htmlFor="endTime">Classroom Name : </label>
                    <input type="text" id="endTime" name="name" value={formDataForRemoveClassroom.name} onChange={changeHandler3} required />
                </div>

                <div className="eachdetail">
                    <label htmlFor="classroom">Location : </label>
                    <input type="text" id="classroom" name="location" value={formDataForRemoveClassroom.location} onChange={changeHandler3} required />
                </div>

                <div className="eachdetail">
                    <label htmlFor="purpose">Reason :</label>
                    <textarea id="purpose" name="reason" value={formDataForRemoveClassroom.reason} onChange={changeHandler3}></textarea>
                </div>
            </div>
            <button type="submit" className='bookclass'  onClick={() => removeClassroom()}>Submit</button>
            </form>
        )
    }
    else if(whatToDo === 'removeteacher')
    {
        content = (
            <form className='booknow-content'>
            <div className="addclassroom">
                <div className="eachdetail">
                    <label htmlFor="endTime">Teacher Email Id : </label>
                    <input type="text" id="endTime" name="email" value={formDataForDeleteTeacher.email} onChange={changeHandler1} required />
                </div>

                <div className="eachdetail">
                    <label htmlFor="classroom">Teacher Fullname : </label>
                    <input type="text" id="classroom" name="fullName" value={formDataForDeleteTeacher.fullName} onChange={changeHandler1} required />
                </div>
            </div>
            <button type="submit" className='bookclass' onClick={() => removeteacher()}>Submit</button>
            </form>
        )
    }
    else if(whatToDo === 'allteachers')
    {
        if(allTeachersData.length>0)
        {
            content = (
                <div className="home-content">
                  {allTeachersData.map((teacher, index) => {
                    return <div key={index} className="classroom-card">
                              <p><strong>Name: </strong> {teacher.fullName}</p>
                              <p><strong>Gender: </strong> {teacher.gender}</p>
                              <p><strong>Contact: </strong> {teacher.contact}</p>
                              <p><strong>Email: </strong> {teacher.email}</p>
                            </div>
                  })}
               </div>
            )
        }
        else
        {
            content = (<h3>Loading</h3>)
        }
    }
    else if(whatToDo === "allfeedbacks")
    {
        if(allFeedbacks.length>0)
        {
            content = (
                <div className="home-content">
                  {allFeedbacks.map((feedback, index) => {
                    return <div key={index} className="classroom-card">
                              <p><strong>Rating: </strong> {feedback.rating}</p>
                              <p><strong>Feedback: </strong> {feedback.message}</p>
                              <p><strong>Email: </strong> {feedback.email}</p>
                            </div>
                  })}
               </div>
            )
        }
        else
        {
            content = (<h3>Loading</h3>)
        }
    }
    

  return (
    <div className='homepageadmin'>
        <div className='navbar-home'>
            <p className='name'>Classroom Booking System</p>
            <div className='helloimg'>
                <img src={personImg} className='personimg'/>
                <div className='hello'>Hello, Admin</div>
            </div>

            <div className='logoutimg'>
                <img src={logoutImg} alt="" className='logout' onClick={handleLogout}/>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
        </div>

      <div className="listing">
        <div className='listingitemimg'>
            <img src={classroomImg} className='classroomimg' onClick={() => {setWhatToDo('addclassroom');setAtTop('Enter the details');setStylist('oneoffour1')}}/>
            <button className="addclassroom" onClick={() => {setWhatToDo('addclassroom');setAtTop('Enter the details');setStylist('oneoffour1')}}>Add Classroom</button>
        </div>
        
        <div className='listingitemimg'>
            <img src={classroomImg} className='classroomimg' onClick={() => {setWhatToDo('removeclassroom');setAtTop('Enter the details');setStylist('oneoffour2')}}/>
            <button className="removeclassroom" onClick={() => {setWhatToDo('removeclassroom');setAtTop('Enter the details');setStylist('oneoffour2')}}>Remove Classroom</button>
        </div>
        
        <div className='listingitemimg'>
            <img src={teacherImg} className='classroomimg' onClick={() => {setWhatToDo('removeteacher');setAtTop('Enter the details');setStylist('oneoffour3')}}/>
            <button className="removeteacher" onClick={() => {setWhatToDo('removeteacher');setAtTop('Enter the details');setStylist('oneoffour3')}}>Remove teacher</button>
        </div>
        
        <div className='listingitemimg'>
            <img src={teacherImg} className='classroomimg' onClick={() => {setWhatToDo('allteachers');getTeachers();setAtTop('All teachers');setStylist('oneoffour4')}}/>
            <button className="allteachers" onClick={() => {setWhatToDo('allteachers');getTeachers();setAtTop('All teachers');setStylist('oneoffour4')}}>All teachers</button>
        </div>
        
        <div className='listingitemimg'>
            <img src={feedbackImg} className='classroomimg'  onClick={() => {setWhatToDo('allfeedbacks');getTeachers();setAtTop('All Feedbacks');setStylist('oneoffour5')}}/>
            <button className="allfeedbacks" onClick={() => {setWhatToDo('allfeedbacks');getTeachers();setAtTop('All Feedbacks');setStylist('oneoffour5')}}>All Feedbacks</button>  
        </div>
      </div>

      <div className={stylist}>
        <div className='allrooms'>{atTop}</div>
        {content}
      </div>
    </div>
  )
}

export default HomepageAdmin