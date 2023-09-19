import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
import logo from './logo.png';
import './App.css';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { UserName: userName, Password: password };
      await axios.post('http://localhost:3001/Users/login', data).then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (
            signIn({
              token: response.data,
              expiresIn: 180,
              tokenType: 'Bearer',
              authState: { UserName: data.UserName }
            })
          ) {
            // Only if you are using refreshToken feature
            navigate('../dashboard');
          } else {
            console.log('hi');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: '#003a8c', height: '150px', margin: '0 0 6rem 0', boxShadow: '0 0 0.5rem 0 black', padding: '25px' }}>
        <table className="align-center">
          <tbody>
            <tr>
              <td rowSpan={2}>
                <img src={logo} alt="Logo" style={{ height: '100px' }} />
              </td>
              <td>
                <div style={{ color: '#bae7ff', fontSize: '15PX', margin: '1rem 0 -1rem 0' }}>
                  THE INCOPORATED COUNCIL OF LEGAL EDUCATION
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ color: 'white', fontSize: '40px' }}>SRI LANKA LAW COLLEGE</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="align-center" style={{ color: '#002766', fontSize: '15PX', margin: '1rem 0 1rem 0' }}>
        <Typography component="h1" variant="h2">
          REGISTRATION UNIT LOGIN
        </Typography>
      </div>

      <Container component="main" maxWidth="xs">
        <MainCard sx={{ boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography component="h1" variant="h6">
              User Name
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Typography component="h1" variant="h6">
              Password
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#003a8c' }}>
              LOGIN
            </Button>
          </form>
        </MainCard>
      </Container>
      <div className="bottom">STUDENT MANAGEMENT ADMINISTRATIVE</div>
    </div>
  );
};

export default LoginForm;
