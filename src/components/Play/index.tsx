import React, { ReactElement, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  fetchConnectToRoom,
  setMyConnectionUrl
} from '../../store/slices/application';
import { useDispatch } from 'react-redux';

interface Props {}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'calc(100% - 28px)'
    }
  }
}));

export default function Play({}: Props): ReactElement {
  const [roomcode, setRoomcode] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Roomcode:', roomcode, 'Name:', name);
    const connectionUrl = `wss://da6wisihu2.execute-api.us-east-1.amazonaws.com/dev?roomcode=${roomcode}`;
    dispatch(setMyConnectionUrl(connectionUrl));
    dispatch(fetchConnectToRoom({ connectionUrl, roomcode, name }));
  };
  return (
    <div style={{ margin: '0px 16px' }}>
      <div style={{ marginBottom: 20 }}>
        Enter your roomcode from the host site. To start a lobby go to{' '}
        <a href="https://host.buffoonery.io" target="_blank">
          host.buffoonery.io
        </a>
        .
      </div>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          onInput={(e: any) => setRoomcode(e.target.value)}
          id="outlined-basic"
          label="Roomcode"
          variant="outlined"
        />
        <TextField
          onInput={(e: any) => setName(e.target.value)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Play
        </Button>
      </form>
    </div>
  );
}
