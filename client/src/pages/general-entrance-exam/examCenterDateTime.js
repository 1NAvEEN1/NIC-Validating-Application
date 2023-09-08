import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './App.css';
import MainCard from 'components/MainCard';

const ViewApplicants = () => {
  const [examCenters, setExamCenters] = useState([]);
  const [AddCenterName, setAddCenterName] = useState('');
  const [AddCenterCap, setAddCenterCap] = useState('');
  const [startDate, setStartDate] = useState('');
  const [GKTime, setGKTime] = useState('');
  const [LangTime, setLangTime] = useState('');

  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/Entrance_exam_center').then((response) => {
      setExamCenters(response.data);
    });
    axios.get('http://localhost:3001/Entrance_exam_date_time/1').then((response) => {
      setStartDate(response.data);
    });
  }, [refresh]);

  const handleAddCenter = () => {
    axios.post('http://localhost:3001/Entrance_exam_center', { Name: AddCenterName, Capacity: AddCenterCap }).then(() => {
      const centerAdd = { Name: AddCenterName, Capacity: AddCenterCap };
      setExamCenters([...examCenters, centerAdd]);
      setAddCenterName('');
      setAddCenterCap('');
      console.log('New Exam Center is added');
    });
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteCenterId, setDeleteCenterId] = useState('');

  const handleDeleteCenter = async (id) => {
    setDeleteCenterId(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteCenter = async () => {
    setDeleteConfirmationOpen(false);
    if (deleteCenterId) {
      try {
        await axios.delete(`http://localhost:3001/Entrance_exam_center/${deleteCenterId}`);
        setExamCenters(examCenters.filter((center) => center.CenterID !== deleteCenterId));
        console.log('Exam Center deleted');
      } catch (error) {
        console.log('Error deleting Exam Center', error);
      }
    }
  };

  const cancelDeleteCenter = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleUpdateDate = () => {
    axios
      .put('http://localhost:3001/Entrance_exam_date_time/1', { Date: startDate, GKTime: GKTime, LangTime: LangTime })
      .then(() => {
        console.log('Exam date updated successfully');
      })
      .catch((error) => {
        console.log('Error updating exam date', error);
      });
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <div>
      <MainCard>
        <h3>Exam Centers</h3>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              id="ExCentName"
              label="Exam center name"
              variant="standard"
              value={AddCenterName}
              fullWidth
              onChange={(event) => {
                setAddCenterName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="Capacity"
              label="Capacity"
              variant="standard"
              type="number"
              value={AddCenterCap}
              onChange={(event) => {
                setAddCenterCap(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleAddCenter}>
              Add
            </Button>
          </Grid>
        </Grid>

        <div>
          {examCenters.map((value, key) => (
            <div key={key}>
              <div className="centerlist">
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    {value.Name}
                  </Grid>
                  <Grid item xs={3}>
                    Capacity: {value.Capacity}
                  </Grid>
                  <Grid item xs={2}>
                    <Button size="small" sx={{ color: 'red' }} onClick={() => handleDeleteCenter(value.CenterID)}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          ))}
        </div>
      </MainCard>

      <h3> </h3>
      <MainCard>
        <h3>Exam Date</h3>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div>Current Date: </div>
            <h3>{startDate.Date}</h3>
            <div>Set a New Date</div>
            <TextField
              id="ExamDate"
              type="date"
              onChange={(event) => {
                setStartDate(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <div>General Knowledge Paper Time: </div>
            <h3>{startDate.GKTime}</h3>
            <div>Set a new time</div>
            <TextField
              id="GKTime"
              label="GK Paper Time"
              type="text"
              onChange={(event) => {
                setGKTime(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <div>Language Paper Time: </div>
            <h3>{startDate.LangTime}</h3>
            <div>Set a new time</div>
            <TextField
              id="LangTime"
              label="Language Paper Time"
              type="text"
              onChange={(event) => {
                setLangTime(event.target.value);
              }}
              hiddenLabel="true"
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleUpdateDate}>
              Update Date
            </Button>
          </Grid>
        </Grid>
      </MainCard>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={cancelDeleteCenter}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this record?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCenter}>Cancel</Button>
          <Button onClick={confirmDeleteCenter} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewApplicants;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, TextField, Grid } from '@mui/material';
// import './App.css';
// import MainCard from 'components/MainCard';

// const ViewApplicants = () => {
//   const [examCenters, setExamCenters] = useState([]);
//   const [AddCenterName, setAddCenterName] = useState('');
//   const [AddCenterCap, setAddCenterCap] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [GKTime, setGKTime] = useState('');
//   const [LangTime, setLangTime] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3001/Entrance_exam_center').then((response) => {
//       setExamCenters(response.data);
//     });
//     axios.get('http://localhost:3001/Entrance_exam_date_time/1').then((response) => {
//       setStartDate(response.data);
//     });
//   }, []);

//   const handleAddCenter = () => {
//     axios.post('http://localhost:3001/Entrance_exam_center', { Name: AddCenterName, Capacity: AddCenterCap }).then(() => {
//       const centerAdd = { Name: AddCenterName, Capacity: AddCenterCap };
//       setExamCenters([...examCenters, centerAdd]);
//       setAddCenterName('');
//       setAddCenterCap('');
//       console.log('New Exam Center is added');
//     });
//   };

//   const handleDeleteCenter = async (id) => {
//     if (window.confirm('Are you sure you want to delete this record?')) {
//       try {
//         await axios.delete(`http://localhost:3001/Entrance_exam_center/${id}`);
//         setExamCenters(examCenters.filter((center) => center.CenterID !== id));
//         console.log('Exam Center deleted');
//       } catch (error) {
//         console.log('Error deleting Exam Center', error);
//       }
//     }
//   };

//   const handleUpdateDate = () => {
//     axios
//       .put('http://localhost:3001/Entrance_exam_date_time/1', { Date: startDate, GKTime: GKTime, LangTime: LangTime })
//       .then(() => {
//         console.log('Exam date updated successfully');
//       })
//       .catch((error) => {
//         console.log('Error updating exam date', error);
//       });
//   };

//   return (
//     <div>
//       <MainCard>
//         <h3>Exam Centers</h3>
//         <Grid container spacing={2}>
//           <Grid item xs={7}>
//             <TextField
//               id="ExCentName"
//               label="Exam center name"
//               variant="standard"
//               value={AddCenterName}
//               fullWidth
//               onChange={(event) => {
//                 setAddCenterName(event.target.value);
//               }}
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               id="Capacity"
//               label="Capacity"
//               variant="standard"
//               type="number"
//               value={AddCenterCap}
//               onChange={(event) => {
//                 setAddCenterCap(event.target.value);
//               }}
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <Button variant="contained" onClick={handleAddCenter}>
//               Add
//             </Button>
//           </Grid>
//         </Grid>

//         <div>
//           {examCenters.map((value, key) => (
//             <div key={key}>
//               <table className="centerlist">
//                 <tbody>
//                   <tr>
//                     <td className="centername">{value.Name}</td>
//                     <td>Capacity: {value.Capacity}</td>
//                     <td>
//                       <Button size="small" sx={{ color: 'red' }} onClick={() => handleDeleteCenter(value.CenterID)}>
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       </MainCard>
//       <h3> </h3>
//       <MainCard>
//         <h3>Exam Date</h3>
//         <Grid container spacing={2}>
//           <Grid item xs={4}>
//             <div>Current Date: </div>
//             <div>{startDate.Date}</div>
//             <div>Set a New Date</div>
//             <TextField
//               id="ExamDate"
//               label="Exam Date"
//               type="text"
//               onChange={(event) => {
//                 setStartDate(event.target.value);
//               }}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <div>General Knowledge Paper Time: </div>
//             <div>{startDate.GKTime}</div>
//             <div>Set a new time</div>
//             <TextField
//               id="GKTime"
//               label="GK Paper Time"
//               type="text"
//               onChange={(event) => {
//                 setGKTime(event.target.value);
//               }}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <div>Language Paper Time: </div>
//             <div>{startDate.LangTime}</div>
//             <div>Set a new time</div>
//             <TextField
//               id="LangTime"
//               label="Language Paper Time"
//               type="text"
//               onChange={(event) => {
//                 setLangTime(event.target.value);
//               }}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <Button variant="contained" onClick={handleUpdateDate}>
//               Update Date
//             </Button>
//           </Grid>
//         </Grid>
//       </MainCard>
//     </div>
//   );
// };

// export default ViewApplicants;
