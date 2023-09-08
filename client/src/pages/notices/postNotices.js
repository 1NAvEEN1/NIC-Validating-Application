import React from 'react';
import MainCard from 'components/MainCard';
import { Grid, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  // SpecialDate: Yup.date().required('Required'),
  // Heading: Yup.string().required('Required'),
  // SubHeading: Yup.string().required('Required'),
  // Description: Yup.string().required('Required'),
  // Department: Yup.string().required('Required')
});

const Notices = () => {
  async function handleSubmit(values) {
    try {
      console.log('values', values);
      // Add your API endpoint URL for posting notices
      const response = await axios.post('http://localhost:3001/Notices', values);
      console.log('Notice posted successfully!', response.data);
      // // You can add any success handling here, like showing a success message or redirecting to another page.
    } catch (error) {
      console.error('Failed to post the notice:', error);
      // You can add error handling here, like showing an error message to the user.
    }
  }

  return (
    <div>
      <h1>Post a Notice</h1>
      <MainCard sx={{ boxShadow: 2 }}>
        <Formik
          initialValues={{
            SpecialDate: '',
            Heading: '',
            SubHeading: '',
            Description: '',
            Department: 'Registration Unit'
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <div>Special Date</div>
                <Field as={TextField} name="SpecialDate" type="date" fullWidth required />
              </Grid>
              <Grid item xs={4}>
                <div>Heading</div>
                <Field as={TextField} name="Heading" fullWidth required />
              </Grid>
              <Grid item xs={6}>
                <div>Sub Heading</div>
                <Field as={TextField} name="SubHeading" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <div>Description</div>
                <Field as={TextField} name="Description" multiline rows={4} fullWidth required />
              </Grid>
              <Grid item xs={2}>
                <div>Department</div>
                <TextField name="Department" value="Registration Unit" fullWidth disabled required />
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={2}>
                {/* PDF upload input */}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => formik.setFieldValue('PDFFile', event.currentTarget.files[0])}
                  style={{ display: 'none' }}
                  id="pdf-file-input"
                />
                <label htmlFor="pdf-file-input">
                  <Button variant="contained" component="span" color="success" sx={{ marginTop: 3 }}>
                    Upload PDF File
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 5, marginLeft: '45%' }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </MainCard>
    </div>
  );
};

export default Notices;
