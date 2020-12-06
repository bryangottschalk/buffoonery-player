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

export default function Play({}: Props): ReactElement {
  const classes = useStyles();

  return (
    <div style={{ margin: '0px 16px' }}>
      <div style={{ marginBottom: 20 }}>
        Enter your roomcode from the host site. To start a lobby go to{' '}
        <a href="https://host.buffoonery.io" target="_blank">
          host.buffoonery.io
        </a>
        .
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Roomcode" variant="outlined" />
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <Button onClick={handleClick} variant="contained" color="primary">
          Play
        </Button>
      </form>
    </div>
  );
}
