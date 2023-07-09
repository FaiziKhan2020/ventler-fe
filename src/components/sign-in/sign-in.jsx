import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockPersonOutlinedIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { login } from '../../app/auth/auth.action';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const defaultTheme = createTheme();

const SignIn = ({ SignIn, showAlert, message }) => {
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [signIn, { error, loading, data }] = useMutation(LOGIN_USER);

  // if (data) {
  //   localStorage.setItem("token", data.user.token);
  //   navigate("/dashboard1");
  // }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  //   setFormData(data);
  //   navigate("/dashboard1");

  //   // signIn({
  //   //   variables: {
  //   //     UserSignIn: data,
  //   //   },
  //   // });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    SignIn(email, password, navigate);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack
            style={
              showAlert
                ? { display: 'block', marginBottom: '30px' }
                : { display: 'none' }
            }
            sx={{ width: '100%' }}
            spacing={2}
          >
            <Alert
              severity='warning'
              style={{ background: 'red', color: 'white', margin: 'auto' }}
            >
              {message}
            </Alert>
          </Stack>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockPersonOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/auth/forget' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/auth/signUp' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          sx={{ mt: 8, mb: 4 }}
          variant='body2'
          color='text.secondary'
          align='center'
        >
          {'Copyright © '}
          <Link color='inherit' href='https://mui.com/'>
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    firstName: state.auth,
    email: state.auth.email,
    message: state.auth.error,
    showAlert: state.auth.showAlert,
  };
};
const mapDispatchToProps = (dispatch) => ({
  SignIn: (email, password, navigate) => {
    dispatch(login(email, password, navigate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
