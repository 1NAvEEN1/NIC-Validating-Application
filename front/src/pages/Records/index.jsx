import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";

import AddUser from "../../components/AddUser";

function Records() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleVerifyClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/Users").then((response) => {
      const UsersWithId = response.data.map((user) => ({
        ...user,
        id: user.UserName, // Add the id property using GEuserID
      }));
      setListOfUsers(UsersWithId);
      setFilteredUsers(UsersWithId);
    });
  }, [openModal]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = listOfUsers.filter((user) => {
      return (
        user.UserName.toLowerCase().includes(value) ||
        user.Name.toLowerCase().includes(value) ||
        user.NIC.toLowerCase().includes(value) ||
        user.MobileNo.toLowerCase().includes(value) ||
        user.Address.toLowerCase().includes(value)
      );
    });
    setFilteredUsers(filteredData);
  };
  const columns = [
    {
      field: "UserName",
      headerName: "UserName",
      flex: 0.4,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 0.8,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "NIC",
      headerName: "NIC",
      flex: 0.6,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "MobileNo",
      headerName: "MobileNo",
      flex: 0.5,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 1,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "DOB",
      headerName: "DOB",
      flex: 0.5,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 0.4,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ServiceProvider",
      headerName: "ServiceProvider",
      flex: 0.5,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.4,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <Button variant="outlined" size="small" color="error">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    <div>
      <Container
        // maxWidth="xs"
        sx={{
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Records
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid container mb={4}>
          <Grid item md="6">
            <TextField
              label="Search"
              variant="outlined"
              color="error"
              onChange={handleSearchChange}
              size="small"
            />
          </Grid>
          <Grid item md="6">
            <Button
              variant="contained"
              color="error"
              onClick={handleVerifyClick}
            >
              Add User
            </Button>
          </Grid>
        </Grid>

        <div style={{ height: "99%", width: "97%", marginLeft: "1.5%" }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            slots={{
              toolbar: CustomToolbar,
            }}
            sx={{
              boxShadow: 2,
              "& .MuiDataGrid-cell:hover": {
                color: "red",
              },
              "& .header": {
                backgroundColor: "#880808",
                color: "white",
              },
              display: "flex",
              fontSize: 14,
            }}
            getRowId={(row) => row.id} // Specify the custom id for each row
          />
        </div>
      </Container>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <h3>Add User</h3>
        </DialogTitle>
        <DialogContent>
          <AddUser useFor="addUser" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{ mr: "45%" }} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Records;
