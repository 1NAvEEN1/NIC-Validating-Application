import React from 'react';
import { Container, TextField, Button, Typography, Link, Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  fullName: Yup.string().required('Full Name is required'),
  address: Yup.string().required('Address is required'),
  nic: Yup.string()
    .matches(/^[0-9]{12}$/, 'NIC must be 12 digits')
    .required('NIC is required'),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile No must be 10 digits')
    .required('Mobile No is required'),
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  address: '',
  nic: '',
  mobileNo: '',
};

const LoginForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log('Form values:', values);
    setSubmitting(false);
  };

  return (
    <Container maxWidth="xs">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="username" component="div" className="error" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="password" component="div" className="error" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Re-enter Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="fullName"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="fullName" component="div" className="error" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="address"
                  as={TextField}
                  label="Address"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="address" component="div" className="error" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="nic"
                  as={TextField}
                  label="NIC"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="nic" component="div" className="error" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="mobileNo"
                  as={TextField}
                  label="Mobile No"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="mobileNo" component="div" className="error" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
