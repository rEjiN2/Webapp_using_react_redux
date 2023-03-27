import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../../features/usernameReducer';
import { changeImage } from '../../features/userimageReducer';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function UserPro() {
  const dispatch = useDispatch();
  const obj = JSON.parse(localStorage.getItem('userInfo'))
  const navigate = useNavigate()


  useEffect(()=>{
    axios.get(`http://localhost:5000/api/users/userDetails/${obj._id}`).then((res)=>{
      dispatch(change(res['data'].name))
      dispatch(changeImage(
        res['data'].image
      ))   
    },[])
 })

//  useEffect(()=>{
      
//   axios.get(`http://localhost:5000/api/users/userDetails/${obj._id}`).then((res)=>{
//     console.log(res['data'].name);
//     console.log(res['data'].image);
//     console.log(res['data'].email);
//   })
// },[])
 const username = useSelector((state) => state.username)
     const userImage = useSelector((state) => {
      return state.userImage;

  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [loading,setLoading] = useState(false)
   const [picMessage , setPicMessage] = useState(null)

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

  



  const handleSubmit = async(event) => {
    event.preventDefault();
    // Submit form data to backend or do something with user details
    try{
      const config = {
        headers : {
          "Content-type" : "application/json"
        },

      };
      setLoading(true)
      console.log(image,"Kanikke");
      const id = obj._id
      const {data} = await axios.post(
        'http://localhost:5000/api/users/updateUserDetils',
        {
          email,
      username,
          image,
          id
       
        },
        config
      )
       console.log(data.image,"Suko");
       setLoading(false)
       
      
    }catch(error){

    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    profilePic: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginRight: "10px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      minHeight: "100px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        
          <img style={{width:200,height:200}} src={userImage} alt="Profile"  />
        <h1>User Profile</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={username}
            onChange={(e)=>setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            
            style={styles.input}
            required
          />
        </div>
       
        <div style={styles.inputGroup}>
          <label htmlFor="profilePic" style={styles.label}>
            Profile Picture:
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/png , image/jpeg , image/jpg"
            onChange={(e) => postDetails(e.target.files[0], setImage)}
          />
        </div>
        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}

export default UserPro;
