import React from "react";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const LoginForm = () => {
  const navigate = useNavigate();
  const signIn = useSignIn;

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
          console.log(response.data);
          if (response.status === 200) {
            navigate("/");
            // if (
            //   signIn({
            //     token: response.data,
            //     expiresIn: 3600,
            //     tokenType: "Bearer",
            //     authState: { UserName: data.UserName },
            //   })
            // ) {
            //   // Only if you are using refreshToken feature
            //   navigate("/");
            // } else {
            //   console.log("hi");
            // }
          } // Close the if block here
        })
        .catch((error) => {
          console.error(error);
          // Handle login error and display an error message to the user
        });
    },
  });

  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem 2rem 2rem 2rem",
        }}
        elevation={0}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#C10206" }}
            >
              Login
            </Typography>
            <TextField
              label="Username"
              variant="standard"
              autoComplete="off"
              color="error"
              fullWidth
              margin="normal"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              color="error"
              fullWidth
              margin="normal"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              sx={{
                backgroundColor: "#A50113",
                borderRadius: "2rem",
              }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "16px" }}
            >
              <Link href="#" color="error">
                Forgot Password?
              </Link>
              <br />
              <br />
              Don't have an account?
              <Link href="../signup" color="error">
                Signup now
              </Link>
            </Typography>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
