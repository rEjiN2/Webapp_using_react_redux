import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import "./Signup.css"; // Import styles
import axios from "axios";
import Loading from "../Loading/Loadinig";
import { useNavigate } from "react-router-dom";
function UserSignup() {
  const navigate = useNavigate()
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image , setImage] = useState('https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png')
  const [message,setMessage] = useState(null)
  const [picMessage , setPicMessage] = useState(null)
  const [ error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch()
  

  const handleSubmit = async(e) => {
    e.preventDefault();

      if(password !== confirmPassword){
        setMessage('Passwords not match')
      }
      else{
            setMessage(null)
            try{
                  const config = {
                    headers : {
                      "Content-type" : "application/json"
                    },

                  };
                  setLoading(true)
                  console.log(image,"Kanikke");
                  const {data} = await axios.post(
                    'http://localhost:5000/api/users',
                    {
                      email,
                      password,
                      name,
                      image,
                    },
                    config
                  )
                   console.log(data,"Suko");
                   setLoading(false)
                  localStorage.setItem("userInfo",JSON.stringify(data))
                   navigate('/home')
                 
            }catch(error){

            }
            dispatch(login({
              name:name,
              email:email,
              password:password,
              loggedIn:true,
            }));
      }
    // Additional code to submit form data to backend goes here
  };

  const postDetails = (pics) =>{
      if(pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
        return setPicMessage("Please Select an Image");
      }
    

    setPicMessage(null)
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "webapp");
      data.append("cloud_name", "dl4xaqrfu");
      fetch("https://api.cloudinary.com/v1_1/dl4xaqrfu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.url);
  
          setImage(data.url.toString());
          console.log(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      return setPicMessage("Please Select an Image");
    }
  }

  return (
    <div className="signup-container">
      { error && <ErrorMessage variant="danger" >{error}</ErrorMessage> }
      {message && <ErrorMessage variant="danger" >{message}</ErrorMessage>}
      {loading && <Loading/>}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {picMessage && ( <ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
        <div className="form-control">
          <label htmlFor="image">Profile Picture</label>
          <input
  type="file"
  accept="image/png, image/jpeg"
  placeholder="Upload Pic"
  onChange={(e) => postDetails(e.target.files[0], setImage)}
/>

        </div>
        <button style={{marginLeft:20}} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default UserSignup;
