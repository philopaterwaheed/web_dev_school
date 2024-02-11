import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

import AxiosContext from "../../Services/context";
import Copyright from "../Copyright";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

export default function SignUp() {
  const navigate = useNavigate();
  const [{ name, email, password, error }, setSignUpFormState] =
    React.useState(INITIAL_STATE);
  const axios = React.useContext(AxiosContext);

  const isInvalid = password === "" || email === "" || name === "";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    axios
      .createUserWithEmailAndPassword(name, email, password)
      .then(() => {
        setSignUpFormState(INITIAL_STATE);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response?.data?.error)
          error.message = error.response.data.error + " - " + error.message;
        setSignUpFormState((prev) => ({ ...prev, error: error }));
      });

    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {isInvalid && (
            <Box sx={{ color: "red" }}>
              {"Please enter email and password."}
            </Box>
          )}
          {!!error && <Box sx={{ color: "red" }}>{error.message}</Box>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={ROUTES.SIGN_IN} variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
