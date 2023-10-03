import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const LoginForm = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  // State to manage login errors
  const [loginError, setLoginError] = useState(null);

  // Define the validation schema using Yup
  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { UserName: values.username, Password: values.password };
      axios
        .post("http://localhost:3001/Users/login", data)
        .then((response) => {
          if (response.status === 200) {
            signIn({
              token: response.data.token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: { Username: data.UserName },
            });
            navigate("/");
          } else {
            // Handle login error and set the error message
            setLoginError(response.data.error);
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle network errors or other issues
          setLoginError("Username and Password doesn't match");
        });
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem 2rem 2rem 2rem",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Typography
              variant="h3"
              align="left"
              gutterBottom
              sx={{ color: "#C10206" }}
            >
              Login
            </Typography>
            <div style={{ minHeight: "3rem" }}>
              {loginError ? (
                <Alert severity="error">{loginError}</Alert>
              ) : (
                <Typography
                  variant="body1"
                  align="left"
                  gutterBottom
                  sx={{ paddingTop: "-1rem" }}
                >
                  Unlock a World of Possibilities. <b>Join Us Today!</b>
                </Typography>
              )}
            </div>

            <TextField
              label="Username"
              variant="outlined"
              autoComplete="off"
              color="error"
              fullWidth
              margin="normal"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{ sx: { borderRadius: 4 } }}
              sx={{ minHeight: "5rem",marginBottom: -2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              color="error"
              fullWidth
              margin="normal"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ minHeight: "5rem", borderRadius:'1rem' }}
              InputProps={{ sx: { borderRadius: 4 } }}
            />
            <Typography
              variant="body2"
              align="left"
              style={{ marginBottom: "16px" }}
            >
              <Link href="../forgotPassword" color="error" underline="hover">
                <b>Forgot Password?</b>
              </Link>
              </Typography>
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              sx={{
                backgroundColor: "#A50113",
                borderRadius: 3,
              }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              align="left"
              style={{ marginTop: 40 }}
            >
              Don't have an account?
              <Link href="../signup" color="error" underline="hover">
                <b> Create an Account</b>
              </Link>
            </Typography>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
