import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Divider } from "@mui/material";
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

    if (useFor !== "update") {
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

      if (useFor === "addUser" || useFor === "update") {
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
          {useFor === "update" ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="error"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={!!fullNameError}
                  helperText={fullNameError}
                  sx={{ minHeight: "5rem" }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="error"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!usernameError}
                  helperText={usernameError}
                  sx={{ minHeight: "5rem" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="error"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={!!fullNameError}
                  helperText={fullNameError}
                  sx={{ minHeight: "5rem" }}
                />
              </Grid>
            </Grid>
          )}

          {useFor === "update" ? (
            <div></div>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="error"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  sx={{ minHeight: "5rem" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Re-enter Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="error"
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  error={!!reEnterPasswordError}
                  helperText={reEnterPasswordError}
                  sx={{ minHeight: "5rem" }}
                />
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              color="error"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!addressError}
              helperText={addressError}
              sx={{ minHeight: "5rem" }}
            />
          </Grid>
          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2} >
            {NICType === "new" ? (
              <Grid item xs={12} md={6}>
                <TextField
                  label="NIC Number"
                  variant="outlined"
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
                  margin="normal"
                  sx={{ minHeight: "5rem" }}
                />
              </Grid>
            ) : (
              <>
                <Grid item xs={9} md={6}>
                  <TextField
                    label="NIC Number"
                    type="tel"
                    variant="outlined"
                    autoComplete="off"
                    onChange={validation}
                    onInput={sanitizeInput}
                    inputProps={{ maxLength: 12 }}
                    error={error}
                    helperText={nicNumError}
                    value={nicNum}
                    fullWidth
                    margin="normal"
                    color="error"
                    sx={{ minHeight: "5rem" }}
                  />
                </Grid>
                <Grid item xs={3} md={6}>
                  <TextField
                    variant="outlined"
                    onChange={NICLetter}
                    inputProps={{ maxLength: 1 }} // Limit to a single character
                    type="text"
                    fullWidth
                    sx={{ width: "5rem" }}
                    label={letter}
                    margin="normal"
                    color="error"
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
              <TextField
                label="Date of Birth"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={dateOfBirth}
                disabled
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField
                label="Age"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={age}
                disabled
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField
                label="Gender"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                value={gender}
                disabled
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
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
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    color="error"
                    style={{ minHeight: "5rem" }}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Service Provider"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={serviceProvider}
                disabled
                sx={{ marginTop: "1rem" }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleSignUp}
            sx={{
              backgroundColor: "#A50113",
              borderRadius: "1rem",
              marginTop: "3rem",
              maxWidth: "45%",
            }}
          >
            {useFor === "addUser" ? (
              <div>Add User</div>
            ) : useFor === "update" ? (
              <div>Update</div>
            ) : (
              <div>Sign Up</div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
