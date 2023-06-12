import  { useEffect, useState } from 'react';
import { Container, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const SameYear = () => {
  const {user_id} = useParams();
  const [departmentState, setDepartmentState] = useState('');
  const [semesterState, setSemesterState] = useState('');
  const [department,setDepartment] = useState({});
  const [semister,setSemister] = useState({});
  const navigate = useNavigate();

  // let department = {}


  const departmentChange = (event) => {
    console.log(event);
    setDepartmentState(event.target.value);
  };

  const semisterChange = (event) => {
    setSemesterState(event.target.value);
  };

  const handleSubmit = async() => {
      navigate(`/subject-form/${user_id}/${departmentState}/${semesterState}`)
  };

  const get_sem_department = async() =>{
    const dep = await axios.get('http://localhost:8000/api/departments/').then((res)=>{
       return res.data;
    });
    setDepartment(dep);
    const sem = await axios.get('http://localhost:8000/api/semesters/').then((res)=>{
      return res.data;
    });
    setSemister(sem);
  }
  useEffect(()=>{
    get_sem_department();
  },[])

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Select Department and Semister
      </Typography>

      <FormControl style={{ margin: '8px', minWidth: '200px' }}>
        <Select value={departmentState} onChange={departmentChange} displayEmpty variant="outlined">
            <MenuItem value="" disabled>
              Department
            </MenuItem>
            {Object.entries(department).map(([key2, value2]) => {
                return (
                  <MenuItem key={key2} value={value2.id}>
                      {value2.name}
                  </MenuItem>
                );
            })}
        </Select>
      </FormControl>

      <FormControl style={{ margin: '8px', minWidth: '200px' }}>
        <Select value={semesterState} onChange={semisterChange} displayEmpty variant="outlined">
            <MenuItem value="" disabled>
              Semister
            </MenuItem>
            {Object.entries(semister).map(([key2, value2]) => {
                return (
                  <MenuItem key={key2} value={value2.id}>
                      {value2.name}
                  </MenuItem>
                );
            })}
        </Select>
      </FormControl>

      

      <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default SameYear;
