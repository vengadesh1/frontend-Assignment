import React, { useEffect, useState } from "react";
import Typography from '@mui/joy/Typography';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { FireExtinguisher } from "@mui/icons-material";
function Tables() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("credentials");
    if(!token){
      alert("No token,please login first");
      return;
    }
    axios.get("http://localhost:4000/Users",{
      headers:{Authorization:`Bearer ${token}`}
    })
      .then(res => setData(res.data.users))
      .catch(err => console.log(err));
  }, []);

  const Navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("credentials");
  Navigate("/login");
};

const handleAdd = () =>{
  Navigate("/form")
}


  const handleEdit = (id) => {
    Navigate(`/edit/${id}`);
  }

  const handleDelete = (id) => {
    const token = localStorage.getItem("credentials");
    if(!token){
      alert("No token,please login first");
      return;
    }
    axios.delete(`http://localhost:4000/delete-User/${id}`,{
      headers:{Authorization:`Bearer ${token}`}
    })
      .then(res => {
        console.log(res);
        setData(prev => prev.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <>
    
    
    <Card sx={{ minWidth: 275,width: "1000px",margin: "20px auto", }}>
      
      <CardContent>
        <CardContent sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography sx={{ textAlign: 'start' }} level="h4">Profiles</Typography>
        <Button sx={{color:'white',backgroundColor:'rgba(55, 55, 55, 1)',fontWeight:'bold'}} onClick={handleLogout}>Logout</Button>
      </CardContent>

  <TextField
    label="Search by First or Last Name"
    variant="outlined"
    fullWidth
    sx={{ mt: 2,borderRadius:'15px' }}
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />
</CardContent>
<div style={{display:'flex',justifyContent:'space-between',marginRight:'20px'}}><div></div>
<Button sx={{color:'white',backgroundColor:'rgba(55, 55, 55, 1)',fontWeight:'bold'}} onClick={handleAdd}>+ Add Profile</Button>
</div>
      

      <TableContainer sx={{ width: "965px",margin: "20px auto", borderRadius: 2, }} component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>First Name</TableCell>
              <TableCell sx={{ fontSize: '18px' }} align="right">Last Name</TableCell>
              <TableCell sx={{ fontSize: '18px' }} align="right">Age</TableCell>
              <TableCell sx={{ fontSize: '18px' }} align="right">Date</TableCell>
              <TableCell sx={{ fontSize: '18px' }} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter(user => 
      user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filter.toLowerCase())
    ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <Button sx={{backgroundColor:'white',color:'rgba(55, 55, 55, 1)',fontWeight:'bold',":hover":{color:'white',backgroundColor:'rgba(55, 55, 55, 1)'}}} onClick={() => handleEdit(row._id)}>Edit</Button>
                  <Button sx={{backgroundColor:'white',color:'rgba(55, 55, 55, 1)',fontWeight:'bold',":hover":{color:'white',backgroundColor:'rgba(55, 55, 55, 1)'}}} onClick={() => handleDelete(row._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>

    
</>
  );
}

export default Tables;
