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
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from '@mui/x-data-grid-generator';
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "../../components/AddUser";
import ViewUser from "../UserProfile/viewDetails";
import DeleteUser from "./deleteUser";
import Title from "../../components/Title";

function Records() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModelRow, setOpenModalRow] = useState(false);
  const [deleteRow, setDeleteRow] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddUserClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRowClick = (params) => {
    setSelectedUser(params.row.id);
    setOpenModalRow(true);
  };

  const handleCloseRowClickModal = () => {
    setOpenModalRow(false);
    setDeleteRow(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteUserSuccess = () => {
    setSnackbarOpen(true); // Show the success Snackbar
  };

  const handleDeleteRow = (event, params) => {
    // Prevent event propagation to stop opening the row click modal
    event.stopPropagation();
    setSelectedUser(params.row.id);
    setDeleteRow(true);
  };

  const handleCloseDeleteRow = () => {
    setDeleteRow(false);
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
  }, [openModal, deleteRow, openModelRow]);

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
      flex: 0.6,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.1,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <IconButton onClick={(event) => handleDeleteRow(event, params)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // function CustomToolbar() {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarExport />
  //     </GridToolbarContainer>
  //   );
  // }

  const {loading } = useDemoData({
    rowLength: 4,
    maxColumns: 6,
  });

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
        <Title title="Records" />

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
              onClick={handleAddUserClick}
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
            loading={loading}
            slots={{ toolbar: GridToolbar}}
            m
            initialState={{
              
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
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
              minHeight: 670
            }}
            onRowClick={handleRowClick}
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

      {/* Row click view details  */}
      <Dialog
        open={openModelRow}
        onClose={handleCloseRowClickModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <h3>User Details</h3>
        </DialogTitle>
        <DialogContent>
          <ViewUser username={selectedUser} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseRowClickModal}
            sx={{ mr: "45%" }}
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete row  */}
      <Dialog
        open={deleteRow}
        onClose={handleCloseDeleteRow}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <h3>Delete user {selectedUser}</h3>
        </DialogTitle>
        <DeleteUser
          username={selectedUser}
          onClose={handleCloseDeleteRow}
          onDeleteSuccess={handleDeleteUserSuccess}
        />
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          User deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Records;
