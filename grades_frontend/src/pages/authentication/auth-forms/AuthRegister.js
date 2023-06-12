import { useEffect, useState } from 'react';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Select,
    MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Alert } from '../../../../node_modules/@mui/lab/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const [statusName, setStatusName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [department,setDepartment] = useState({});
    const [err, setErr] = useState({});
    const navigate = useNavigate();

    const courseChange = (event) => {
      setCourseName(event.target.value);
    };
  
    const departmentChange = (event) => {
      setDepartmentName(event.target.value);
    };
  
    const statusChange = (event) => {
      setStatusName(event.target.value);
    };

//   #######################
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const val = {
        name : "",
        reg_no: "",
        email : "",
        department : "",
        mobile : "",
        joining_year: "",
        course : "",
        password: "",
        confirm_password:"",
        status : "",
    }

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const submit = async(data) => {
       const payload =  {
            "name": data.name,
            "reg_no": data.reg_no,
            "mobile": data.mobile,
            "email": data.email,
            "joining_year": data.joining_year,
            "course": courseName,
            "department": departmentName,
            "password": data.password,
            "status": statusName,
            "confirm_password": data.confirm_password
        }

        console.log(payload);

        await axios.post('http://localhost:8000/api/signup/',payload)
        .then((data)=> {
            // console.log("error")
            console.log(data);
            alert("Your data submitted successfully");
            navigate('/login');
        })
        .catch((e)=>{
            console.log(e.response.data);
            setErr(e.response.data)
        })


        // console.log(p);
    }

    const dep = async() => {
        const depart = await axios.get("http://localhost:8000/api/departments/");
        // department = department['data'];
        // console.log(depart['data']);
        setDepartment(depart['data']);
    }

    useEffect(() => {
        dep();
    }, []);

    return (
        <>
            <Formik
                initialValues={val}
                validationSchema={Yup.object().shape({
                    // firstname: Yup.string().max(255).required('First Name is required'),
                    // lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    name: Yup.string().max(255).required('required'),
                    // reg_no: Yup.string().max(255).required('required'),
                    // email : Yup.string().max(255).required('required'),
                    // department : Yup.string().max(255).required('required'),
                    mobile : Yup.string().max(255).required('required'),
                    joining_year: Yup.string().max(255).required('required'),
                    // course : Yup.string().max(255).required('required'),
                    // password: Yup.string().max(255).required('required'),
                    // status : Yup.string().max(255).required('required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                    console.log("hii")
                    submit(values);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                <Select value={departmentName} onChange={departmentChange} displayEmpty variant="outlined">
                                    <MenuItem value="" disabled>
                                    Department
                                    </MenuItem>
                                    {Object.entries(department).map(([key2, value2]) => {
                                        return (
                                        <MenuItem key={key2} value={value2.name}>
                                            {value2.name}
                                        </MenuItem>
                                        );
                                    })}
                                </Select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                <Select value={courseName} onChange={courseChange} displayEmpty variant="outlined">
                                <MenuItem value="" disabled>
                                  Course
                                </MenuItem>
                                <MenuItem value="BTech">BTech</MenuItem>
                                <MenuItem value="MTech">MTech</MenuItem>
                              </Select>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                <Select value={statusName} onChange={statusChange} displayEmpty variant="outlined">
                                <MenuItem value="" disabled>
                                  Status
                                </MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                              </Select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Name</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                        id="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Register Number</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.reg_no && errors.reg_no)}
                                        id="reg_no"
                                        value={values.reg_no}
                                        name="reg_no"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.reg_no && errors.reg_no && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.reg_no}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Mobile</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.mobile && errors.mobile)}
                                        id="mobile"
                                        value={values.mobile}
                                        name="mobile"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.mobile && errors.mobile && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.mobile}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="company-signup">Joining Year</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.joining_year && errors.joining_year)}
                                    id="joining_year"
                                    value={values.joining_year}
                                    name="joining_year"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder=""
                                    inputProps={{}}
                                />
                                {touched.joining_year && errors.mjoining_year&& (
                                    <FormHelperText error id="helper-text-company-signup">
                                        {errors.joining_year}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-signup">Confirm Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                                    id="confirm_password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.confirm_password}
                                    name="confirm_password"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="******"
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText error id="helper-text-password-signup">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Account
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {err && 
                                    Object.entries(err).map(([key2, value2]) => {
                                        return (
                                            <Alert severity="error">{value2}</Alert>
                                        );
                                    })
                            }
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthRegister;
