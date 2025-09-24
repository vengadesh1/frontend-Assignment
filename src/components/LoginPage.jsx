import React, { useState,useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
function LoginPage() {

  const inputRef = useRef([]);
  const buttonRef = useRef(null);

  const [data,setData] = useState({
    emailId:"",
    password:""
  })

  const handleClick = async (e) => {
    try{
      const response = await axios.post('http://localhost:4000/log',data)
      console.log("login successfully",response.data)
      localStorage.setItem("credentials",response.data.token)
      navigate("/form")
    }
    catch(error){
      console.log("it has error", error)
      alert("Incorrect email or password")
    }
  }

  const handleChange =(e)=>{
    const {name,value} = e.target;
    setData({...data,[name]:value})
  }

  const navigate =useNavigate();

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
    
    <div className="ilog">
      <div>
    <div  className="log">
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <h1>Login Page</h1>
      <TextField className="len" id="outlined-basic" label="Email" variant="outlined" inputRef={(el)=>(inputRef.current[0]=el)} onKeyDown={(e) => handlekeydown(e, 0)} name="emailId" value={data.emailId} onChange={handleChange} /><br />
      <TextField className="len" id="outlined-basic" label="Password" variant="outlined" inputRef={(el)=>(inputRef.current[1]=el)} onKeyDown={(e)=> handlekeydown(e,1)} name="password" value={data.password} onChange={handleChange}/><br />
      <Button className="len" variant="contained" ref={buttonRef} onClick={handleClick} onKeyDown={(e)=>{if(e.key==="Enter"){handleClick(e)}}}>SUBMIT</Button>
      <p >Didn't have an account? <a href="/">SignUp</a></p>
      </Box>
    </div>
    </div>
    </div>
    
  );
}
 
export default LoginPage;