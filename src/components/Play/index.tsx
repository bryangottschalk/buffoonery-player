// @ts-nocheck
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import {
  fetchConnectToRoom,
  setMyConnectionUrl,
  fetchSendWebsocketMessage,
  setNavigationTab
} from '../../store/slices/application';
import { fetchInitialStateAndConnect } from '../../store/slices/websocket';
import { useDispatch, useSelector } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { connect, send } from '@giantmachines/redux-websocket';
import store from '../../store';
import { CommentList } from '../';
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
  const dispatch = useDispatch();
  const { isConnected, comments, navigationTab } = useSelector(
    (state) => state
  ).applicationSlice;
  const { loading, hasErrors, errorMsg } = useSelector(
    (state: any) => state
  ).websocket;

  const [roomcode, setRoomcode] = useState('');
  const [name, setName] = useState('');
  const [isPlayBtnDisabled, setIsPlayBtnDisabled] = useState(true);
  if (roomcode.length === 4 && name.length > 0 && isPlayBtnDisabled) {
    setIsPlayBtnDisabled(false);
  }
  if ((roomcode.length < 4 || name.length === 0) && !isPlayBtnDisabled) {
    setIsPlayBtnDisabled(true);
  }

  useEffect(() => {
    if (!hasErrors && !loading && !navigationTab) {
      dispatch(setNavigationTab('play'));
    }
  }, [dispatch, hasErrors, loading, navigationTab]);

  const [chatMsg, setChatMsg] = useState('');
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
    event.preventDefault();
    const connectionUrl = `wss://da6wisihu2.execute-api.us-east-1.amazonaws.com/dev?roomcode=${roomcode}&name=${name}`;
    dispatch(fetchInitialStateAndConnect({ roomcode, connectionUrl, name }));
  };

  const sendChatMsg = () => {
    console.log('in send chat msg');
    dispatch(
      fetchSendWebsocketMessage({
        comment: {
          chatMsg,
          name,
          timestamp: new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
        },
        roomcode
      })
    );
    setChatMsg('');
  };
  return (
    <div style={{ margin: '0px 16px' }}>
      {!isConnected ? (
        <React.Fragment>
          {hasErrors && errorMsg && (
            <div style={{ marginTop: 10, color: 'red' }}>
              Error connecting to room. It may not exist, please double check
              the room code on your host site try again.
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            Enter your roomcode from the host site. To start a lobby go to{' '}
            <a href="https://host.buffoonery.io" target="_blank">
              host.buffoonery.io
            </a>{' '}
            on a computer or smart TV.
          </div>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              inputProps={{ maxLength: 4 }}
              value={roomcode}
              onInput={(e: any) => setRoomcode(e.target.value.toUpperCase())}
              id="outlined-basic"
              label="Roomcode"
              variant="outlined"
            />
            <TextField
              inputProps={{ maxLength: 30 }}
              value={name}
              onInput={(e: any) => setName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <Button
              disabled={isPlayBtnDisabled}
              type="submit"
              variant="contained"
              color="primary"
            >
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
                style={{ width: 300 }}
                value={chatMsg}
                onInput={(e: any) => setChatMsg(e.target.value)}
                id="outlined-basic"
                label="Message room"
                variant="outlined"
              />
            </div>

            <div>
              <br></br>
              <Button
                value={chatMsg}
                onClick={sendChatMsg}
                style={{ width: 300 }}
                variant="contained"
                color="primary"
                disabled={hasErrors}
              >
                Submit
              </Button>
            </div>
            <br></br>
            <div>{`Roomcode: ${roomcode}`}</div>
            <div>{`Name: ${name}`}</div>
          </div>
          <CommentList></CommentList>
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
