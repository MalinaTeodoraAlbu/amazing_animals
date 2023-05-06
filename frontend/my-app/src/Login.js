import './login.scss';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React, { useState } from "react";
import store from "./store/store";
import { useSelector, useDispatch } from 'react-redux';

function Login() {

  const idUser = useSelector(state => state.idUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");


  const container = document.querySelector('#container');

  async function togglePanel_a() {
    const container = document.querySelector('#container');
    container.classList.add("right-panel-active");
  }  
  
  async function togglePanel_r() {
    const container = document.querySelector('#container');
    container.classList.remove("right-panel-active");
  }

  const login = (event) => {
    event.preventDefault();
    fetch("http://localhost:7070/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.success === true) {   
            const action = { type: "logIn", _id: data._id};
            store.dispatch(action);
            localStorage.setItem("userId", data._id);
            localStorage.setItem("token", data.token);
            window.location.href = '/feed' ;
          } else {
            alert("Invalid email or password");
          }
      })
      .catch((error) => console.error("Error:", error));
  };

  const registration = async (event) => {
    event.preventDefault();
    let user = {
      name,
      email : emailReg,
      password : passwordReg,
      city,
      phoneNumber,
      birthday
    }

    if(name === ''){
      toast.error("Empty  name", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(emailReg === ''){
      toast.error("Empty email", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(passwordReg === ''){
      toast.error("Empty password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;  
    }
    if(city === ''){
      toast.error("Empty city", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(phoneNumber === ''){
      toast.error("Empty phone number", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }
    if(birthday === ''){
      toast.error("Empty birthday", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    const resEmail = await fetch(`http://localhost:7070/api/users/email/${email}`);
    if(resEmail.status === 200){
      toast.error("Email already in use", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
      return;
    }

    const res = await fetch(`http://localhost:7070/api/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if(res.status === 200){ //sucess register
      toast.success("Succesfully registered your account!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        style: {
          marginTop: "5rem"
        }
      });
    }else {
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: {
          marginTop: "5rem"
        }
      });
    }}

  return (
   
    <div className="login">
       <ToastContainer />
<div className="container" id="container">
	<div className="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={emailReg} onChange={(e) => setEmailReg(e.target.value)} />
      <input type="password" placeholder="Password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} />
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="tel" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
			<button onClick={registration} >Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email"  id="login_input_email" 
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)} />
			<input type="password" 
            id="login_input" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
			<a href="#">Forgot your password?</a>
			<button onClick={login} > Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
      <h1>Welcome to Our Community!</h1>
        <p>To stay connected with us and find your new furry family member, please log in with your personal information.</p>
				<button onClick={togglePanel_r}  className="ghost" >Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Find your perfect pet match with just a few clicks</h1>
				<p>Enter your personal details and find Your Furry Companion</p>
				<button onClick={togglePanel_a} className="ghost" >Sign Up</button>
			</div>
		</div>
	</div>
</div>

    </div>
    
  );
}

export default Login;