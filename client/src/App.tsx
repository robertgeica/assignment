import { Grid, Typography } from '@mui/material';
import { BooksTable } from './components';

function App() {
  return (
    <Grid container sx={{ width: '80%', margin: 'auto', flexDirection: 'column' }}>
      <Typography variant='h1' my={3} sx={{ fontSize: '32px', fontWeight: 600 }}>
        Bookclub
      </Typography>
      <BooksTable />
    </Grid>
  );
}

export default App;
