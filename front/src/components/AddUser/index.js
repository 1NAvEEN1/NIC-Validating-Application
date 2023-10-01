import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";

const AddUser = (props) => {
  const navigate = useNavigate();
  let useFor = props.useFor;
  let usernameProp = props.username;
  let nameProp = props.name;
  let addressProp = props.address;
  let nicProp = props.nic;
  let ageProp = props.age;
  let genderProp = props.gender;
  let dobProp = props.dob;
  let serviceProviderProp = props.serviceProvider;
  let mobileNoProp = props.mobileNo;

  const [username, setUsername] = useState(usernameProp);
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [fullName, setFullName] = useState(nameProp);
  const [address, setAddress] = useState(addressProp);
  const [nicNum, setnicNum] = useState(nicProp);
  const [dateOfBirth, setDateOfBirth] = useState(dobProp);
  const [age, setAge] = useState(ageProp);
  const [gender, setGender] = useState(genderProp);
  const [serviceProvider, setServiceProvider] = useState(serviceProviderProp);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reEnterPasswordError, setReEnterPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [nicNumError, setnicNumError] = useState("");
  // const [mobileNumberError, setMobileNumberError] = useState("");

  const [NICType, setNICType] = useState("new");
  const [letter, setLetter] = useState("V");
  const [error, setError] = useState(false);
  var year = new Date().getFullYear();

  const [phone, setPhone] = useState(mobileNoProp ? mobileNoProp : "07"); // Initialize phone state
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mobileNoValidation = (event) => {
    const inputValue = event.target.value;
    const number = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
    setPhone(number);
    let sp = number.charAt(2);
    setErrorMobile(true);
    setErrorMsg("Invalid Mobile Number");
    setServiceProvider("");
    if (number.length == 10) {
      setErrorMobile(false);
      setErrorMsg("");
      if (sp == "0" || sp == "1") {
        setServiceProvider("Mobitel");
      } else if (sp == "2" || sp == "8") {
        setServiceProvider("Hutch");
      } else if (sp == "3" || sp == "4" || sp == "6" || sp == "7") {
        setServiceProvider("Dialog");
      } else if (sp == "5") {
        setServiceProvider("Airtel");
      } else if (sp == "9") {
        setServiceProvider("");
        setErrorMobile(true);
        setErrorMsg("Invalid Mobile Number");
      }
    }
  };

  const handleSignUp = () => {
    // Validate form data
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if(useFor !== "update"){
      if (!password) {
        setPasswordError("Password is required");
        isValid = false;
      } else {
        setPasswordError("");
      }

      if (password !== reEnterPassword) {
        setReEnterPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setReEnterPasswordError("");
      }
    }
    
    if (!fullName) {
      setFullNameError("Full Name is required");
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!nicNum) {
      setnicNumError("NIC Number is required");
      isValid = false;
    } else {
      setnicNumError("");
    }

    if (!phone) {
      setErrorMsg("Mobile Number is required");
      isValid = false;
    } else {
      setErrorMsg("");
    }

    // If all fields are valid, proceed with sign-up
    if (isValid) {
      let nicToSubmit;
      if (NICType === "old") {
        nicToSubmit = nicNum + letter;
      } else if (NICType === "new") {
        nicToSubmit = nicNum;
      }

      if (useFor === "update") {
        axios
          .put(`http://localhost:3001/Users/${username}`, {
            UserName: username,
            Name: fullName,
            NIC: nicToSubmit,
            DOB: dateOfBirth,
            Age: age,
            Gender: gender,
            Address: address,
            MobileNo: phone,
            ServiceProvider: serviceProvider,
          })
          .then(() => {
            console.log("Profile details updated");
          })
          .catch((error) => {
            console.error(error);
          });
        console.log("hi");
      } else {
        axios
          .post("http://localhost:3001/Users", {
            UserName: username,
            Password: password,
            Name: fullName,
            NIC: nicToSubmit,
            DOB: dateOfBirth,
            Age: age,
            Gender: gender,
            Address: address,
            MobileNo: phone,
            ServiceProvider: serviceProvider,
          })
          .then(() => {
            console.log("New validation record created");
          })
          .catch((error) => {
            console.error(error);
          });
      }

      if (useFor === "addUser"||useFor === "update") {
      } else {
        navigate("../login");
      }
    }
  };

  const validation = (event) => {
    const value = event.target.value;
    setError(false);
    setnicNum(value);
    setDateOfBirth("");
    setGender("");
    setAge("");
    if (value === "") {
      setError(true);
      setnicNumError("Enter a NIC number!");
    } else if (value.length < 12) {
      setError(true);
      setnicNumError("Invalid NIC number!");
    } else if (
      Number(value.substring(0, 4)) < 1900 ||
      Number(value.substring(0, 4)) > year - 16
    ) {
      setError(true);
      setnicNumError("Invalid NIC number! Age");
    } else {
      setNICType("new");
      extractInfoFromNIC(value, "new");
      setnicNumError("");
    }
    setNICType("new");

    if (value.length === 9) {
      setNICType("old");
      setError(false);
      extractInfoFromNIC(value, "old");
      setnicNumError("");
    }
  };

  function extractInfoFromNIC(nic, type) {
    var birthYear = "";
    var days = 0;
    var genderDigit = 0;
    if (type === "new") {
      birthYear = nic.substring(0, 4);
      days = parseInt(nic.substring(4, 7));
      genderDigit = parseInt(nic.charAt(4));
    } else if (type === "old") {
      birthYear = `19${nic.substring(0, 2)}`;
      days = parseInt(nic.substring(2, 5)) - 1;
      genderDigit = parseInt(nic.charAt(2));
    }

    const gender = genderDigit < 5 ? "Male" : "Female";
    // Initialize with the birth year
    const birthDate = new Date(birthYear, 0);
    if (gender == "Female") {
      birthDate.setDate(birthDate.getDate() + days - 500);
      console.log("hi");
    } else if (gender == "Male") {
      birthDate.setDate(birthDate.getDate() + days);
      console.log("h");
    }

    const dob = birthDate.toISOString().split("T")[0];

    const age = year - Number(birthYear);

    setDateOfBirth(dob);
    setGender(gender);
    setAge(age);
  }

  const NICLetter = (event) => {
    // Allow only 'X' or 'V' and convert to uppercase
    const value = event.target.value.toUpperCase().replace(/[^XV]/g, "");
    event.target.value = value;
    setLetter(value);
  };

  const sanitizeInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  };

  return (
    <div>
      <form>
        <div>
          <Grid container spacing={2}>
          {useFor === "update" ? (
              <Grid item xs={12} md={12}>
              <TextField
                label="Full Name"
                variant="standard"
                fullWidth
                margin="normal"
                color="error"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!fullNameError}
                helperText={fullNameError}
              />
            </Grid>
            ) : (
              <div>
                <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                variant="standard"
                fullWidth
                margin="normal"
                color="error"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                variant="standard"
                fullWidth
                margin="normal"
                color="error"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!fullNameError}
                helperText={fullNameError}
              />
            </Grid>
              </div>
            )}
            
            {useFor === "update" ? (
              <div></div>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="error"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Re-enter Password"
                    type="password"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="error"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    error={!!reEnterPasswordError}
                    helperText={reEnterPasswordError}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="standard"
                color="error"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!addressError}
                helperText={addressError}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {NICType === "new" ? (
                <div>
                  <TextField
                    label="NIC Number"
                    variant="standard"
                    type="tel"
                    color="error"
                    autoComplete="off"
                    onChange={validation}
                    onInput={sanitizeInput}
                    inputProps={{ maxLength: 12 }}
                    error={error}
                    helperText={nicNumError}
                    value={nicNum}
                    fullWidth
                    sx={{ width: "9.2rem" }}
                    margin="normal"
                  />
                </div>
              ) : (
                <div>
                  <TextField
                    label="NIC Number"
                    type="tel"
                    variant="standard"
                    autoComplete="off"
                    onChange={validation}
                    onInput={sanitizeInput}
                    inputProps={{ maxLength: 12 }}
                    error={error}
                    helperText={nicNumError}
                    value={nicNum}
                    fullWidth
                    margin="normal"
                    sx={{ width: "7rem" }}
                    color="error"
                  />
                  <TextField
                    variant="standard"
                    onChange={NICLetter}
                    inputProps={{ maxLength: 1 }} // Limit to a single character
                    type="text"
                    fullWidth
                    sx={{ width: "2.2rem" }}
                    label={letter}
                    margin="normal"
                    color="error"
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <InputMask
                mask="(07)9 999 9999"
                maskChar=" "
                value={phone}
                onChange={mobileNoValidation}
              >
                {(inputProps) => (
                  <TextField
                    label="Mobile Number"
                    name="phone"
                    type="text"
                    autoComplete="off"
                    error={errorMobile}
                    helperText={errorMsg}
                    {...inputProps}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="error"
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
          <Typography
            variant="h7"
            align="center"
            gutterBottom
            sx={{ alignSelf: "flex-start" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                Date of Birth: <b>{dateOfBirth}</b>
              </Grid>
              <Grid item xs={12} md={6}>
                Age : <b>{age}</b>
              </Grid>
              <Grid item xs={12} md={6}>
                Gender : <b>{gender}</b>
              </Grid>
              <Grid item xs={12} md={6}>
                Service Prover: <b>{serviceProvider}</b>
              </Grid>
            </Grid>
          </Typography>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleSignUp}
            sx={{
              backgroundColor: "#A50113",
              borderRadius: "2rem",
              marginTop: "16px",
            }}
          >
            {useFor === "addUser" ? <div>Add User</div> :useFor === "update"? <div>Update</div>: <div>Sign Up</div>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
