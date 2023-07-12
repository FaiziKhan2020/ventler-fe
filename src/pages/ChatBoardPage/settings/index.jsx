import { Label } from '@material-ui/icons';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    TextField,
    Typography
  } from '@mui/material';
import { useCallback, useState } from 'react';

const Settings = () => {
    const [values, setValues] = useState({
        wordpress: '',
        openai: ''
      });

    const handleChange = useCallback(
        (event) => {
          setValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
          }));
        },
        []
      );
    
      const handleSubmit = useCallback(
        (event) => {
          event.preventDefault();
        },
        []
      );

    return(
        <main className='ml-0 h-full p-6 flex-grow'>
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Setup Keys & Credentials"
          title="Settings"
        />
        <CardContent>
          <Stack
            spacing={3}
          >
            <Box>
            <Typography>Wordpress Credentials</Typography>
            <TextField
              fullWidth
              placeholder='Wordpress Secret Credentials'
              name="wordpress"
              onChange={handleChange}
              type="text"
              value={values.wordpress}
            />
            </Box>

            <Box>
            <Typography>OpenAI Key</Typography>
            <TextField
              fullWidth
              placeholder='OpenAI Secret Key'
              name="openai"
              onChange={handleChange}
              type="text"
              value={values.openai}
            />
            </Box>

          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
        </main>
    )
}

export default Settings;