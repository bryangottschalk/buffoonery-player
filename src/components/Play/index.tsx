// @ts-nocheck
import React, { ReactElement, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import {
  fetchConnectToRoom,
  setMyConnectionUrl
} from '../../store/slices/application';
import { useDispatch, useSelector } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
  const { loading, hasErrors, errorMsg, isConnected } = useSelector(
    (state) => state
  ).applicationSlice;
  // console.log('🚀 ~ file: index.tsx ~ line 24 ~ Play ~ hasErrors', hasErrors);
  // console.log('🚀 ~ file: index.tsx ~ line 24 ~ Play ~ loading', loading);

  const [roomcode, setRoomcode] = useState('');
  const [name, setName] = useState('');
  const [chatMsg, setChatMsg] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  function iconStyles() {
    return {
      successIcon: {
        color: 'green'
      },
      errorIcon: {
        color: 'red'
      }
    };
  }
  const classes2 = makeStyles(iconStyles);
  const handleSubmit = (event: any) => {
    setRoomcode('');
    setName('');
    event.preventDefault();

    const connectionUrl = `wss://da6wisihu2.execute-api.us-east-1.amazonaws.com/dev?roomcode=${roomcode}&name=${name}`;
    dispatch(setMyConnectionUrl(connectionUrl));
    dispatch(fetchConnectToRoom({ connectionUrl, roomcode, name }));
  };

  const sendChatMsg = () => {
    setChatMsg('');
    alert(`sorry, this feature isn't set up yet.`);
  };
  return (
    <div style={{ margin: '0px 16px' }}>
      {!isConnected ? (
        <React.Fragment>
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
              value={roomcode}
              onInput={(e: any) => setRoomcode(e.target.value)}
              id="outlined-basic"
              label="Roomcode"
              variant="outlined"
            />
            <TextField
              value={name}
              onInput={(e: any) => setName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Play
            </Button>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            style={{
              height: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                alignItems: 'space-between',
                justifyContent: 'center',
                margin: 16
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {' '}
                <div style={{ marginRight: 8 }}>You're connected!</div>{' '}
                <CheckCircleIcon className={classes2.successIcon} />
              </div>

              <br></br>
              <TextField
                value={chatMsg}
                onInput={(e: any) => setChatMsg(e.target.value)}
                id="outlined-basic"
                label="Message to room"
                variant="outlined"
              />
            </div>

            <div>
              <br></br>
              <Button
                value={chatMsg}
                onClick={sendChatMsg}
                style={{ width: 300, margin: 16 }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
      {loading && <CircularProgress />}
      {hasErrors && errorMsg && (
        <React.Fragment>
          <div style={{ color: 'red' }}>{errorMsg}</div>
          <ReportProblemIcon className={classes2.errorIcon} />
        </React.Fragment>
      )}
    </div>
  );
}
