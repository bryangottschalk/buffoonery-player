import React, { ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

interface Props {}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'calc(100% - 28px)'
    }
  }
}));

const handleClick = () => {
  alert(`Sorry, this feature isn't ready yet.`);
};
export default function Contribute({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <div style={{ margin: '0px 16px' }}>
      <div style={{ marginBottom: 20 }}>
        <div>Contribute to this app! Submit prompt suggestions below.</div>
      </div>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Category" variant="outlined" />
        <TextField id="outlined-basic" label="Prompt" variant="outlined" />
        <Button onClick={handleClick} variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
