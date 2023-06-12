import React,{useEffect, useState} from "react";
import { Box, useTheme,Typography,MenuItem, Button } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';

const DashboardDefault = () => {
    const {adminId} = useParams();
    const navigate = useNavigate();
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
      // { field: "id", headerName: "Order No",flex:1},
      { field: "id", headerName: "Id",flex:1},
      { field: "name", headerName: "Name",flex:1},
      { field: "reg_no", headerName: "Reg No",flex:1},
      {
        headerName: "Actions",
        flex: 1,
        renderCell: ({ row: { id } })=>{
          return (
            <Box
                    m="0"
                    display="flex"
                    justifyContent="center  "
                    gap="10px"
            >
              <Button variant="contained" size="small"  onClick={()=>{view_student(id)}}>View</Button>
              <Button variant="contained" size="small"  style={{ backgroundColor: 'green' }} onClick={()=>{approve(id,true)}}>Aprove</Button>
              <Button variant="contained"  size="small"  style={{ backgroundColor: 'red' }} onClick={()=>{Reject(id,false)}}>Reject</Button>
            </Box>
          );
        }
      },
    ];


    const view_student = (id) =>{
      navigate(`/student/${id}`)
    }

    const approve = (id,flag) =>{
       const res = axios.get(`http://localhost:8000/api/pdf/${id}/true`).then((res)=>{
        alert("Approval Mail sended Successfully")
        console.log(res);
       })
    }

    const Reject = (id,flag) =>{
      const res = axios.get(`http://localhost:8000/api/pdf/${id}/false`)
      .then((res)=>{
        alert("Rejection Mail sended Successfully")
        console.log(res);
       })
       console.log(res);

    }
    const getStudentData = async() =>{
      const data  = await axios.get(`http://localhost:8000/api/students/1/`)
      console.log(data);
      setStudents(data.data.students);
    }
    useEffect(()=>{
      getStudentData();
    },[])
    return (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            width="95%"
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
};

export default DashboardDefault;
