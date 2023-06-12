import React,{useEffect, useState} from "react";
import { Box, useTheme,Typography,MenuItem, Button } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import axios from 'axios'

import Snackbar from '@mui/material/Snackbar';
import { useParams } from "react-router";
// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const ComponentTypography = () => {
    const[studentData,setStudentData]  = useState([]);
    const {student_ID} = useParams;
    const [students, setStudents] = useState({});
    const [open, setOpen] = useState(false);
    const handleButtonClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    const columns = [
      { field: "semester", headerName: "Semester",flex:1},
      { field: "subject", headerName: "Subject",flex:1},
      { field: "grades", headerName: "Grades",flex:1},
    ];

    const getStudentData = async() =>{
      const data  = await axios.get(`http://localhost:8000/api/student_grades/1/`)
      setStudents(data.data.grades);
      const student_data = []
      student_data['Name'] = data.data.user_name
      student_data['Department'] = data.data.department
      setStudentData(student_data);
    }
    useEffect(()=>{
      getStudentData();
    },[])
    return (
        <Box m="20px">
          <Box>
                Name : {studentData['Name']}
          </Box>
          <Box>
                Department : {studentData['Department']}
          </Box>
          <Box
            m="40px 0 0 0"
            height="75vh"
            width="100%"
            overflow="auto"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: `#DCDCDC`,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: `#D3D3D3`,
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: `#DCDCDC`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: `#D3D3D3`,
              },
              "& .MuiCheckbox-root": {
                color: `#DCDCDC`,
              },
            }}
          >
            <DataGrid rows={students} columns={columns} />
          </Box>
          
        </Box>
      );
}

export default ComponentTypography;
