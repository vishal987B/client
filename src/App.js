import EmployeeManageGrid from "./EmployeeManageGrid";
import ModalView from "./lib/components/drop";
import { Grid, Typography } from '@mui/material';

export default function App() {
  return (
      <div className="App">

      <Grid container spacing={2} display={'flex'} justifyContent={'space-between'} alignItems="center" padding={'20px'}> 
      <Grid item>
        <Typography  variant="h4">Employee Details</Typography>
      </Grid>
      <Grid item>
      <ModalView/>
      </Grid>
    </Grid>
          <EmployeeManageGrid />
    </div>
  );
}
