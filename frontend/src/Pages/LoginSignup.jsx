import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { useNavigate } from 'react-router-dom'
import loginImg from './images/loginimg.jpg'

function LoginSignup() {

    const navigate = useNavigate()
    const handleClickFeedback = () => {
        navigate('/feedback');
    };

    const [loginRegister, setLoginRegister] = useState('register')
    const [formDataForLogin, setFormDataForLogin] = useState({
        email: "",
        password: ""
    })
    const [formDataForAdminLogin, setFormDataForAdminLogin] = useState({
        email: "",
        password: ""
    })
    const [formDataForRegister, setFormDataForRegister] = useState({
        fullName: "",
        gender: "",
        contact:"",
        email:"",
        password:"",
        repassword:""
    })

    const changeHandler1 = (e) => {
        setFormDataForLogin({...formDataForLogin, [e.target.name]: e.target.value})
    }

    const changeHandler2 = (e) => {
        setFormDataForRegister({...formDataForRegister, [e.target.name]: e.target.value})
    }

    const changeHandler3 = (e) => {
        setFormDataForAdminLogin({...formDataForAdminLogin, [e.target.name]: e.target.value})
    }

    const login = async(req, res) => {
        let empty = 0
        for(const key in formDataForLogin) {
            if (!formDataForLogin[key]) {
                empty++;
            }
        }
        if(empty > 0)
        {
            alert("Input fields must not be empty")
            return
        }
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type':'application/json'
            },
            body: JSON.stringify(formDataForLogin)
        })
        .then((response) => response.json())
        .then((data) => responseData = data)

        if(responseData.success)
        {
            localStorage.setItem('auth_token', responseData.token)
            localStorage.setItem('loggedInTeacherData', JSON.stringify(responseData.teacher));
            window.location.replace("/inside")            
        }
        else
        {
            alert(responseData.errors)
        }
    }

    const adminLogin = () => {
        let empty = 0
        for(const key in formDataForAdminLogin) {
            if (!formDataForAdminLogin[key]) {
                empty++;
            }
        }
        if(empty > 0)
        {
            alert("Input fields must not be empty")
            return
        }
        if(formDataForAdminLogin.email === "admin@gmail.com" && formDataForAdminLogin.password === "admin")
        {
            window.location.replace("/insideAdmin")
        }
        else
        {
            alert('Please enter correct email and password')
        }
    }

    const register = async(req, res) => {
        let empty = 0
        for(const key in formDataForRegister) {
            if (!formDataForRegister[key]) {
                empty++;
            }
        }
        if(empty > 0)
        {
            alert("Input fields must not be empty")
            return
        }
        if(formDataForRegister.password !== formDataForRegister.repassword)
        {
            alert("Password and Confirmation password are not matching")
            return
        }
        let responseData;
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-type':'application/json'
            },
            body: JSON.stringify(formDataForRegister)
        })
        .then((response) => response.json())
        .then((data) => responseData = data)

        if(responseData.success)
        {
            alert("Successfully Registered, Login to Continue")
            setFormDataForRegister({
                fullName: "",
                gender: "",
                contact:"",
                email:"",
                password:"",
                repassword:""
            });

        }
        else
        {
            alert(responseData.errors)
        }
    }

    const closeLogin = () => {
        setFormDataForLogin({
            email: "",
            password: ""
        })
        setLoginRegister('register')
    }

    const closeadminLogin = () => {
        setFormDataForAdminLogin({
            email:"",
            password:""
        })
        setLoginRegister('register')
    }

    let content

    if(loginRegister==='register')
    {
        content = (
            <div className='big-register-box'>
                <p className='register-now'>Register Now</p>
                <input type="text" name="fullName" value={formDataForRegister.fullName} onChange={changeHandler2} className='register-box' placeholder='FullName' required/>
                <select name="gender" value={formDataForRegister.gender} onChange={changeHandler2} className='register-box'>
                    <option value="" disabled selected>Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" name="contact" value={formDataForRegister.contact} onChange={changeHandler2} className='register-box' placeholder='Contact Number' required/>
                <input type="text" name="email" value={formDataForRegister.email} onChange={changeHandler2} className='register-box' placeholder='Email ID' required/>
                <input type="password" name="password" value={formDataForRegister.password} onChange={changeHandler2} className='register-box' placeholder='Password' required/>
                <input type="password" name="repassword" value={formDataForRegister.repassword} onChange={changeHandler2} className='register-box' placeholder='Confirmation Password' required/>
                <button className='register-btn' onClick={() => register()}>Register</button>
            </div>
        )
    }
    else if(loginRegister==='login')
    {
        content = (
            <div className='big-register-box now'>
                <p className='register-now'>USER LOGIN</p>
                <hr />
                <input type="text" name="email" value={formDataForLogin.email} onChange={changeHandler1} placeholder='Email ID' className='register-box just' />
                <input type="password" name="password" value={formDataForLogin.password} onChange={changeHandler1} placeholder='Password' className='register-box' />
                <hr />
                <div className="log">
                    <button className='log1' onClick={() => login()}>Log in</button>
                    <button className='log2' onClick={() => closeLogin()}>Close</button>
                </div>
            </div>
        )
    }
    else
    {
        content = (
            <div className='big-register-box now'>
                <h1 className='register-now'>ADMIN LOGIN</h1>
                <hr />
                <input type="text" name="email" value={formDataForAdminLogin.email} onChange={changeHandler3} placeholder='Admin Email ID' className='register-box just' />
                <input type="password" name="password" value={formDataForAdminLogin.password} onChange={changeHandler3} placeholder='Password' className='register-box' />
                <hr />
                <div className="log">
                    <button className='log1' onClick={() => adminLogin()}>Log in</button>
                    <button className='log2' onClick={() => {closeadminLogin()}}>Close</button>
                </div>
            </div>
        )
    }

  return (
    <div className='loginsignup'>
        <div className='navbar'>
            <p className='name'>Classroom Booking System</p>
            <div className='loginimgdiv'>
                <img className='loginimg' src={loginImg}  onClick={() => setLoginRegister('login')} />
                <button className='login-btn' onClick={() => setLoginRegister('login')}>Login</button>
            </div>
        </div>

        
        <div className='register'>
            {content}
        </div> 
        
        <div className='footer'>
            <button className='admin' onClick={() => setLoginRegister('admin')}>Admin Login</button>
            <button className='developer' onClick={() => {alert('Developer: Karnati Ravi Teja\nCollege: IIT Guwahati\nCurrently studying: Btech 2nd year')}}>Developers</button>
            <button className='feedback' onClick={() => handleClickFeedback()}>Feedback</button>
        </div>
    </div>
  )
}

export default LoginSignup