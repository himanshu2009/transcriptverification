import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  FormLabel,
  Select,
  MenuItem
} from '@mui/material';

import { useParams } from 'react-router';
import axios from 'axios'

const SubjectForm = () => {
  const {user_id,depId,semId} = useParams();
  const [subjectScores, setSubjectScores] = useState({});
  const [subject, setSubject] = useState([]);
  const [adminList, setAdminList] = useState({});
  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();

  const give_alert = (data) =>{
    alert("Your Grades are Sended Successfuuly")
  }
  const handleChange = (e) => {
    setSubjectScores((prevScores) => ({
      ...prevScores,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const sub = []
    {Object.entries(subjectScores).map(([key, value]) => {
        sub.push({
          "subject":parseInt(key),
          "grade": value,
        });
    })}

    const payload =
    {
      "department_id": parseInt(depId),
      "semester_id": parseInt(semId) ,
      "user_id": parseInt(user_id),
      "reviewer_id": admin,
      "grades": sub
    }
    const data = await axios.post(`http://localhost:8000/api/grades/`,payload)
                    .then((res)=>{
                      give_alert();
                      return res
                    })
                    .catch((e) => {
                      console.log("Eroor ",e);
                    });
    // console.log(data);
   
  };

  const adminChangeFunction = (e) => {
    setAdmin(e.target.value);
  }

  const subjectFunction = async() => {
     const st = await axios.get(`http://localhost:8000/api/department/${depId}/semester/${semId}/subjects/`)
    {Object.entries(st.data).map(([key,value])=>(
      setSubjectScores((prevScores) => ({
        ...prevScores,
        [value.id]: "",
      }))
    ))}
     setSubject(st.data)

     const ad = await axios.get(`http://localhost:8000/api/admins/`);
     setAdminList(ad.data)
    //  console.log(ad.data);
  }

  useEffect(()=>{
     subjectFunction();
    
  },[])

  return (
    <Box width={500} mx="auto">

      <Grid style={{marginTop:"100px"}}>
          <Stack spacing={1}>
          <MenuItem value="" disabled>
              Select Reviewer
          </MenuItem>
          <Select value={admin} onChange={adminChangeFunction} displayEmpty variant="outlined">
            {Object.entries(adminList).map(([key2, value2]) => {
                return (
                <MenuItem key={key2} value={value2.id}>
                    {value2.name}
                </MenuItem>
                );
            })}
          </Select>
        </Stack>
      </Grid>
      <Typography variant="h3" align="center" style={{marginTop:"50px"}} gutterBottom>
        Fill Subject Scores
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {Object.entries(subject).map(([key,value])=>(
          <FormControl margin="normal" variant="outlined" style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
              <FormLabel style={{ marginRight: "10px", width:"200px" }}>{value.name}</FormLabel>
              <OutlinedInput
                  id={value.name}
                  name={value.id}
                  type="string"
                  value={subjectScores[value.id]}
                  onChange={handleChange}
                  label="Math Score"
              />
          </FormControl>
        ))}
       
        <Button type="submit" variant="contained" color="primary"  style={{ marginTop:"20px" }} fullWidth>
          Save Scores
        </Button>
        <Button  variant="contained"  style={{ backgroundColor: 'red',marginTop:"20px" }} onClick={()=>{navigate('/login')}} fullWidth>
          Back
        </Button>
      </form>
    </Box>
  );
};

export default SubjectForm;
