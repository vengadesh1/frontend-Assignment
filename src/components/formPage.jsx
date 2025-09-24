import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { use } from "react";
import axios from "axios";

function Form(){

  const inputRef = useRef([]);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    age:"",
    date:""
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("credentials");
     
      const response = await axios.post("http://localhost:4000/add-User", formData,{
      headers:{Authorization:`Bearer ${token}`}
    });
      console.log("User Added Successfully", response.data);
      alert("User added successfully");
      navigate('/table');
    } catch (error) {
      console.log("Error while adding user:", error);
      alert("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlekeydown = (e,index) =>{
    if(e.key === "Enter"){
      e.preventDefault();
      const nextInput = inputRef.current[index+1];

      if(nextInput){
        nextInput.focus();
      }else{
        buttonRef.current.focus();
      }
    }
  }

 


    return(
      <>
      <div className="iform">
        <div className="back">
    <Container sx={{mt:5}}>
    <Typography variant="h4" gutterBottom>
        Add User
      </Typography>
   
      <Grid container spacing={2} >
        <Grid item xs={12} sm={8} >
        <TextField name="firstName" value={formData.firstName} onChange={handleChange} className="len1" id="outlined-basic" label="First Name" variant="outlined" inputRef={(el)=>{inputRef.current[0]=el}} onKeyDown={(e)=>{handlekeydown(e,0)}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField name="lastName" value={formData.lastName} onChange={handleChange} className="len1" id="outlined-basic" label="Last Name" variant="outlined" inputRef={(el)=>{inputRef.current[1]=el}} onKeyDown={(e)=>{handlekeydown(e,1)}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField name="age" value={formData.age} onChange={handleChange} className="len1" id="outlined-basic" label="Age" variant="outlined" inputRef={(el)=>{inputRef.current[2]=el}} onKeyDown={(e)=>{handlekeydown(e,2)}}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField  name="date" value={formData.date} onChange={handleChange} className="len1" id="outlined-basic" label="Date" variant="outlined" inputRef={(el)=>{inputRef.current[3]=el}} onKeyDown={(e)=>{handlekeydown(e,3)}}/>
        </Grid>
      </Grid>
      <Button className="len1"  sx={{mt:5, backgroundColor:'rgba(253, 5, 5, 0.65)', color:'white'}} ref={buttonRef} onClick={handleClick} onKeyDown={(e)=>{if(e.key==="Enter"){handleClick(e)}}}>SUBMIT</Button>
    </Container>
    </div>
    </div>
    </>
    )
}
export default Form;