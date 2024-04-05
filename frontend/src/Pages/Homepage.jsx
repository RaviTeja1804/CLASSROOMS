import React, { useState, useEffect } from 'react'
import './CSS/Homepage.css'
import personImg from './images/personimg.png'
import logoutImg from './images/logoutimg.png'
import homeImg from './images/homeimg.png'
import classroomImg from './images/classroomimgnew.png'
import upcomingImg from './images/upcomingnewimg.png'
import pastImg from './images/pastimg.png'
import holidayImg from './images/holidaynewimg.png'

function Homepage() {

  const [display, setDisplay] = useState('home')
  const [formDataForBooking, setFormDataForBooking] = useState({
    date:"",
    start_time:"",
    end_time:"",
    classroom:"",
    purpose:"",
    name:"",
    contact:"",
    requirement:""
  })

  const [oneoffive, setoneoffive] = useState('oneoffive1')

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is less than 10
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };


  const changeHandler3 = (e) => {
    setFormDataForBooking({...formDataForBooking, [e.target.name]: e.target.value})
  }

  const formatDate = (dateString) => {
    const bookingDate = new Date(dateString)
    return bookingDate.toLocaleDateString('en-GB',{
      day:'2-digit',
      month:'2-digit',
      year:'numeric'
    })
  }

  const addToBooking = () => {
      if(localStorage.getItem('auth_token'))
      {
        fetch('http://localhost:4000/teacher/addBooking', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'auth_token': `${localStorage.getItem('auth_token')}`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formDataForBooking)
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          window.alert(data.message)
        })
      }
  }
  
  let content

  useEffect(() => {
    getClassrooms();
    getBookings();
  }, []);

  const [allClassroomsData, setAllClassroomsData] = useState([]);
  useEffect(() => {
    if (display === 'home') {
        getClassrooms()
    }
  }, [display]);

  const [allBookingsData, setAllBookingsData] = useState([]);
  useEffect(() => {
    if (display === 'upcoming' || display === 'old') {
        getBookings()
    }
  }, [display]);

  const getClassrooms = () => {
    if(localStorage.getItem('auth_token'))
      {
        fetch('http://localhost:4000/getClassRooms', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setAllClassroomsData(data)
        })
      }
  }

  const getBookings = async () => {
    if(localStorage.getItem('auth_token'))
      {
        const loggedInTeacherEmail = (JSON.parse(localStorage.getItem('loggedInTeacherData'))).email;
        await fetch(`http://localhost:4000/teacher/getTeacherByemail/${loggedInTeacherEmail}`, {
          method: 'GET',
          headers: {
            'auth_token': `${localStorage.getItem('auth_token')}`
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.allBookings)
          setAllBookingsData(data.allBookings)
        })
      }
  }
  

  const holidays = [
    {name: "Republic Day", date: "January 26", day: "Friday"},
    {name: "Holi",date: "March 25",day: "Monday"},
    {name: "Good Friday",date: "March 29",day: "Friday"},
    {name: "Id-ul-Fitr",date: "April 11",day: "Thursday"},
    {name: "Ram Navmi",date: "April 17",day: "Wednesday"},
    {name: "Mahavir Jayanti",date: "April 21",day: "Sunday"},
    {name: "Buddha Purnima",date: "May 23",day: "Thursday"},
    {name: "Id-ul-Zuha (Bakrid)",date: "June 17",day: "Monday"},
    {name: "Muharram",date: "July 17",day: "Wednesday"},
    {name: "Independence Day / Parsi New Year’s Day / Nauraj",date: "August 15",day: "Thursday"},
    {name: "Janamashtami (Vaishnva)",date: "August 26",day: "Monday"},
    {name: "Milad-un-Nabi or Id-e-Milad (Birthday of Prophet Mohammad)",date: "September 16",day: "Monday"},
    {name: "Mahatma Gandhi’s Birthday",date: "October 2",day: "Wednesday"},
    {name: "Dussehra",date: "October 12",day: "Saturday"},
    {name: "Diwali",date: "October 31",day: "Thursday"},
    {name: "Christmas",date: "December 25",day: "Wednesday"}
];


  if(display==='home')
  {
    if(allClassroomsData.length>0)
    {
      content = (
        <div className="home-content">
          {allClassroomsData.map((classroom, index) => {
            return <div key={index} className="classroom-card">
                      <h1>{classroom.name}</h1>
                      <p><strong>Location:</strong> {classroom.location}</p>
                      <p><strong>Capacity:</strong> {classroom.capacity}</p>
                      <p><strong>Equipment:</strong> {classroom.equipment.join(", ")}</p>
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
  else if(display==='booknow')
  {
    content = (
        <form className='booknow-content'>
          <div className="eachdetail">
            <label htmlFor="date">Date :</label>
            <input type="date" id="date" name="date" value={formDataForBooking.date} min={getCurrentDate()}  onChange={changeHandler3} required />
          </div>
          
          <div className="eachdetail">
            <label htmlFor="startTime">Start Time :</label>
            <input type="time" id="startTime" value={formDataForBooking.start_time} onChange={changeHandler3} name="start_time" required />
          </div>

          <div className="eachdetail">
            <label htmlFor="endTime">End Time :</label>
            <input type="time" id="endTime" value={formDataForBooking.end_time} onChange={changeHandler3} name="end_time" required />
          </div>

          <div className="eachdetail">
            <label htmlFor="classroom">Select Classroom :</label>
            <input type="text" id="classroom" value={formDataForBooking.classroom} onChange={changeHandler3} name="classroom" required />
          </div>

          <div className="eachdetail">
            <label htmlFor="purpose">Purpose :</label>
            <input type="text" id="purpose" name="purpose"  value={formDataForBooking.purpose} onChange={changeHandler3} required />
          </div>

          <div className="eachdetail">
            <label htmlFor="name">Your Name :</label>
            <input type="text" id="name" name="name"  value={formDataForBooking.name} onChange={changeHandler3} required />
          </div>

          <div className="eachdetail">
            <label htmlFor="phone">Your Phone :</label>
            <input type="tel" id="contact" name="contact" value={formDataForBooking.contact} onChange={changeHandler3} required />
          </div>

          <div className="eachdetail">
            <label htmlFor="specialRequirements">Special Requirements :</label>
            <textarea id="requirement"  value={formDataForBooking.requirement} onChange={changeHandler3} name="requirement"></textarea>
          </div>

          <button type="submit" className='bookclass' onClick={() => addToBooking()}>Book Now</button>
        </form>
    )
  }
  else if(display==='holiday')
  {
    content = (
      <div className="holiday-content">
        {holidays.map((holiday, index) => {
          return <div key={index} className="holiday-card">
                    <h1>{holiday.name}</h1>
                    <p><strong>Date : </strong> {holiday.date}</p>
                    <p><strong>Day : </strong> {holiday.day}</p>
                  </div>
        })}
      </div>
    )
  }
  else if(display==='upcoming')
  {
    const today = new Date();
    const upcomingBookings = allBookingsData.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
    if(allBookingsData.length>0)
    {
      content = (
        <div className="upcoming-content">
          {upcomingBookings.map((booking, index) => {
            return <div key={index} className='upcoming-card'>
                      <h3 className='booking-heading'>Booking #{index + 1}</h3>
                      <p className='booking-inside'><strong>Date : </strong> {formatDate(booking.date)}</p>
                      <p className='booking-inside'><strong>Start Time : </strong> {booking.start_time}</p>
                      <p className='booking-inside'><strong>End Time : </strong> {booking.end_time}</p>
                      <p className='booking-inside'><strong>Classroom : </strong> {booking.classroom}</p>
                      <p className='booking-inside'><strong>Purpose : </strong> {booking.purpose}</p>
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
  else
  {
    const today = new Date();
    const oldBookings = allBookingsData.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate < today;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
    if(allBookingsData.length>0)
    {
      content = (
        <div className="upcoming-content">
          {oldBookings.map((booking, index) => {
            return <div key={index} className='upcoming-card'>
                      <h3 className='booking-heading'>Booking #{index + 1}</h3>
                      <p className='booking-inside'><strong>Date : </strong> {formatDate(booking.date)}</p>
                      <p className='booking-inside'><strong>Start Time : </strong> {booking.start_time}</p>
                      <p className='booking-inside'><strong>End Time : </strong> {booking.end_time}</p>
                      <p className='booking-inside'><strong>Classroom : </strong> {booking.classroom}</p>
                      <p className='booking-inside'><strong>Purpose : </strong> {booking.purpose}</p>
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
    <div className='homepage'>
      <div className='navbar-home'>
          <p className='name'>Classroom Booking System</p>
          <div className='helloimg'>
            <img src={personImg} className='helloimage' alt="" />
            <div className='hello'>Hello, {JSON.parse(localStorage.getItem('loggedInTeacherData')).fullName}</div>
          </div>
          
          <div className='logoutimg'>
            <img src={logoutImg} className='helloimage' onClick={() => {localStorage.removeItem('auth_token');window.location.replace('/')}} alt="" />
            <button className='logout-btn' onClick={() => {localStorage.removeItem('auth_token');window.location.replace('/')}}>Logout</button>
          </div>
      </div>

      <div className="listing">
        <div className='navbarimg'>
          <img src={homeImg} className='listimg' onClick={() => {setDisplay('home');setoneoffive('oneoffive1')}} alt="" />
          <button className="home" onClick={() => {setDisplay('home');setoneoffive('oneoffive1')}}>Home</button>
        </div>

        <div className='navbarimg'>
          <img src={classroomImg} className='listimg' onClick={() => {setDisplay('booknow');setoneoffive('oneoffive2')}} alt="" />
          <button className="booknow" onClick={() => {setDisplay('booknow');setoneoffive('oneoffive2')}}>Book a Classroom</button>
        </div>

        <div className='navbarimg'>
          <img src={upcomingImg} className='listimg' onClick={() => {setDisplay('upcoming');setoneoffive('oneoffive3');getBookings()}} alt="" />
          <button className="upcoming" onClick={() => {setDisplay('upcoming');setoneoffive('oneoffive3');getBookings()}}>Upcoming bookings</button>
        </div>

        <div className='navbarimg'>
          <img src={pastImg} className='listimg' onClick={() => {setDisplay('old');setoneoffive('oneoffive4');getBookings()}} alt="" />
          <button className="old" onClick={() => {setDisplay('old');setoneoffive('oneoffive4');getBookings()}}>Old bookings</button>
        </div>

        <div className='navbarimg'>
          <img src={holidayImg} className='listimg' onClick={() => {setDisplay('holiday');setoneoffive('oneoffive5')}} alt="" />
          <button className="holiday" onClick={() => {setDisplay('holiday');setoneoffive('oneoffive5')}}>Public holidays</button>
        </div>
      </div>

      <div className={oneoffive}>
        {display==='home'?<div className="allrooms">All Rooms</div>:<></>}
        {display==='booknow'?<div className="allrooms">Enter the details</div>:<></>}
        {content}
      </div>
    </div>
  )
}

export default Homepage