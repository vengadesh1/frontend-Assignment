import React, { useState,useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

 
function RegisterPage() {

  const inputRef = useRef([]);
  const buttonRef = useRef(null);

  const [data,setData] = useState({
    emailId:"",
    password:""
  })

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/add-user-data", data);
      console.log("User Added Successfully", response.data);
      // alert("User added successfully");
      Swal.fire({
        title: "Success",
        text: "You Registered Successfully!",
        icon: "success",
        confirmButtonText: "Done"
      });
      navigate('/login');
    } catch (error) {
      console.log("Error while adding user:", error);
      // alert("Something went wrong");
      Swal.fire({
        title: "Failure!",
        text: "Please Create New Credentials!",
        icon: "failure",
        confirmButtonText: "Done"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();

  const handlekeydown = (e,index) => {
    
    if(e.key === 'Enter'){
      e.preventDefault();
      const nextInput = inputRef.current[index+1];
      if(nextInput){
        nextInput.focus();
      }else{
        buttonRef.current.focus();
      }
    }

  }

  
  return (
    
    <div className="isign">
      <div>
    <div  className="sign">
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <h1>SignUp Page</h1>
      <TextField className="len" id="outlined-basic" label="Email" variant="outlined" inputRef={(el)=>(inputRef.current[0]=el)} onChange={handleChange} onKeyDown={(e) => handlekeydown(e, 0)} name="emailId" value={data.emailId}/><br />
      <TextField className="len" id="outlined-basic" label="Password" variant="outlined" inputRef={(el)=>(inputRef.current[1]=el)} onChange={handleChange} onKeyDown={(e)=> handlekeydown(e,1)} name="password" value={data.password}/><br />
      <Button className="len" variant="contained" ref={buttonRef} onClick={handleClick} onKeyDown={(e)=>{if(e.key==="Enter"){handleClick(e)}}}>SUBMIT</Button>
      <p >Already have account? <a href="/login">Login</a></p>
      </Box>
    </div>
    </div>
    </div>
    
  );
}
 
export default RegisterPage;