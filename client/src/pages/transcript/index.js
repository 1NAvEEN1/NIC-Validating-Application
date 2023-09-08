import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './AdmissionCard.css';
import { useReactToPrint } from 'react-to-print';
import MainCard from 'components/MainCard';
import { Box, Typography, TextField, Button } from '@mui/material';
import image from './logo.png';

const Transcript = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Addmission Card'
    // onAfterPrint: () => alert('Print Success')
  });
  const [RegNo, setRegNo] = useState(39580);
  const [PreExamResults, setPreExamResults] = useState([]);
  const [PersonalDetails, setPersonalDetails] = useState({});
  const [Avg, setAvg] = useState(0);

  let classValue;
  if (Avg > 70) {
    classValue = '1st Class Honours pass';
  } else if (Avg >= 60 && result.Average <= 70) {
    classValue = '2nd Class Honours pass';
  } else {
    classValue = 'General Class Pass';
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Preliminary_exam_results/${RegNo}`)
      .then((response) => {
        const filteredData = response.data.filter((applicant) => applicant.Grade === 'PASS');
        setPreExamResults(filteredData);
        setAvg(filteredData.Average);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:3001/Student_personal_details/${RegNo}`)
      .then((response) => {
        setPersonalDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
        setMedicalDetails({});
      });
  }, [RegNo]);

  const handleRegNo = (event) => {
    setRegNo(event.target.value)
  };

  return (
    <div>
      <MainCard>
        <TextField variant="outlined" onChange={handleRegNo} value='39580'></TextField>
        <div className="align-center">
          <div ref={componentRef}>
            <Box sx={{ width: '21cm', height: '29.7cm', boxShadow: 3 }}>
              <div style={{ width: '21cm', height: '29.7cm', padding: '0.7cm' }}>
                <div className="logo-container d-flex justify-content-end flex-column align-items-center">
                  <div className="align-center">
                    <img src={image} width={100} height={100} alt="Logo" />
                  </div>
                  <Typography variant="h5" className="align-center">
                    Sri Lanka Law College
                  </Typography>
                </div>
                <Typography className="align-center" variant="h6">
                  The Incorporated Council of Legal Education
                </Typography>
                <Typography className="align-center" style={{ marginTop: '30px', fontSize: '20px' }}>
                  <b>Auto-Generated Transcript</b>
                </Typography>

                <table>
                  <tr>
                    <td>Registration Number </td>
                    <td>
                      <b>{PersonalDetails.RegNo}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Full Name</td>
                    <td>
                      <b>
                        {PersonalDetails.Title} {PersonalDetails.NameInFull}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>NIC Number</td>
                    <td>
                      <b>{PersonalDetails.NIC}</b>
                    </td>
                  </tr>
                </table>

                <div style={{ width: '50%' }}>
                  <table>
                    <tr>
                      <td>Started Date</td>
                      <td>
                        <b>{PersonalDetails.StartedDate}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Citizenship</td>
                      <td>{/* <b>{PersonalDetails.Citizenship}</b> */}</td>
                    </tr>
                    <tr>
                      <td>Date of Birth</td>
                      <td>
                        <b>{PersonalDetails.DOB}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Awarded class</td>
                      <td>
                        <b>{classValue}</b>
                      </td>
                    </tr>
                  </table>
                  {/* {medical ? (
                    <Typography style={{ fontSize: '12px' }}>
                      <i>You have a medical submitted</i>
                    </Typography>
                  ) : null} */}
                </div>

                <h4 className="align-right">Class : {classValue} </h4>

                <h3>Preliminary Year Exam Results</h3>

                {PreExamResults.map((result) => (
                  <table key={result.IndexNo}>
                    <tr>
                      <td>LW101</td>
                      <td>Criminal Law</td>
                      <td>{result.LW101}</td>
                    </tr>
                    <tr>
                      <td>LW102</td>
                      <td>Legal History & Legal System</td>
                      <td>{result.LW102}</td>
                    </tr>
                    <tr>
                      <td>LW103</td>
                      <td>Law of Persons</td>
                      <td>{result.LW103}</td>
                    </tr>
                    <tr>
                      <td>LW106</td>
                      <td>Legislative Drafting and Statut3ory Interpretation</td>
                      <td>{result.LW106}</td>
                    </tr>
                    <tr>
                      <td>LW107</td>
                      <td>Law of Obligations - I</td>
                      <td>{result.LW107}</td>
                    </tr>
                    <tr>
                      <td>LW108</td>
                      <td>Industrial Law</td>
                      <td>{result.LW108}</td>
                    </tr>
                    <tr>
                      <td>LW109</td>
                      <td>Conflict of Laws</td>
                      <td>{result.LW109}</td>
                    </tr>
                    <tr>
                      <td>LW203</td>
                      <td>Constitutional Law</td>
                      <td>{result.LW203}</td>
                    </tr>
                    <tr>
                      <td>LW210</td>
                      <td>Environmental Law</td>
                      <td>{result.LW210}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Total</td>
                      <td>{result.Total}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Average</td>
                      <td>{result.Average}</td>
                    </tr>
                  </table>
                ))}
              </div>
            </Box>
            <Box sx={{ width: '21cm', height: '29.7cm', boxShadow: 3 }}>
              <div style={{ width: '21cm', height: '29.7cm', padding: '0.7cm' }}>
                <h3>Intermediate Year Exam Results</h3>

                {PreExamResults.map((result) => (
                  <table key={result.IndexNo}>
                    <tr>
                      <td>LW101</td>
                      <td>Criminal Law</td>
                      <td>{result.LW101}</td>
                    </tr>
                    <tr>
                      <td>LW102</td>
                      <td>Legal History & Legal System</td>
                      <td>{result.LW102}</td>
                    </tr>
                    <tr>
                      <td>LW103</td>
                      <td>Law of Persons</td>
                      <td>{result.LW103}</td>
                    </tr>
                    <tr>
                      <td>LW106</td>
                      <td>Legislative Drafting and Statut3ory Interpretation</td>
                      <td>{result.LW106}</td>
                    </tr>
                    <tr>
                      <td>LW107</td>
                      <td>Law of Obligations - I</td>
                      <td>{result.LW107}</td>
                    </tr>
                    <tr>
                      <td>LW108</td>
                      <td>Industrial Law</td>
                      <td>{result.LW108}</td>
                    </tr>
                    <tr>
                      <td>LW109</td>
                      <td>Conflict of Laws</td>
                      <td>{result.LW109}</td>
                    </tr>
                    <tr>
                      <td>LW203</td>
                      <td>Constitutional Law</td>
                      <td>{result.LW203}</td>
                    </tr>
                    <tr>
                      <td>LW210</td>
                      <td>Environmental Law</td>
                      <td>{result.LW210}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Total</td>
                      <td>{result.Total}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Average</td>
                      <td>{result.Average}</td>
                    </tr>
                  </table>
                ))}

                <h3>Final Year Exam Results</h3>

                {PreExamResults.map((result) => (
                  <table key={result.IndexNo}>
                    <tr>
                      <td>LW101</td>
                      <td>Criminal Law</td>
                      <td>{result.LW101}</td>
                    </tr>
                    <tr>
                      <td>LW102</td>
                      <td>Legal History & Legal System</td>
                      <td>{result.LW102}</td>
                    </tr>
                    <tr>
                      <td>LW103</td>
                      <td>Law of Persons</td>
                      <td>{result.LW103}</td>
                    </tr>
                    <tr>
                      <td>LW106</td>
                      <td>Legislative Drafting and Statut3ory Interpretation</td>
                      <td>{result.LW106}</td>
                    </tr>
                    <tr>
                      <td>LW107</td>
                      <td>Law of Obligations - I</td>
                      <td>{result.LW107}</td>
                    </tr>
                    <tr>
                      <td>LW108</td>
                      <td>Industrial Law</td>
                      <td>{result.LW108}</td>
                    </tr>
                    <tr>
                      <td>LW109</td>
                      <td>Conflict of Laws</td>
                      <td>{result.LW109}</td>
                    </tr>
                    <tr>
                      <td>LW203</td>
                      <td>Constitutional Law</td>
                      <td>{result.LW203}</td>
                    </tr>
                    <tr>
                      <td>LW210</td>
                      <td>Environmental Law</td>
                      <td>{result.LW210}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Total</td>
                      <td>{result.Total}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Average</td>
                      <td>{result.Average}</td>
                    </tr>
                  </table>
                ))}
              </div>
            </Box>
          </div>
        </div>
        <div className="align-center" style={{ marginTop: '1cm' }}>
          <Button variant="contained" onClick={handlePrint}>
            Print the Addmission Card
          </Button>
        </div>
      </MainCard>
    </div>
  );
};

export default Transcript;
