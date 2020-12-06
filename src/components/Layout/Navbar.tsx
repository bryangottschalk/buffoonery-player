/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import grey from '@material-ui/core/colors/grey';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../history';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { setNavigationTab } from '../../store/slices/application';

const theme = createMuiTheme({
  typography: {
    fontSize: 12
  },
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {},
        margin: '0px -15px',
        padding: '0px 15px',
        color: '#19003C'
      }
    }
  }
});

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    height: '75px',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1
  }
});

function Navbar(props: any) {
  const dispatch = useDispatch();
  const { navigationTab } = useSelector((state: any) => state).applicationSlice;
  const classes = useStyles();

  useEffect(() => {
    dispatch(setNavigationTab('play'));
    history.push('/');
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <nav>
        <BottomNavigation
          style={{ backgroundColor: '#19003C', color: 'white ' }}
          color="primary"
          value={navigationTab}
          className={classes.stickToBottom}
        >
          <BottomNavigationAction
            onClick={() => dispatch(setNavigationTab('play'))}
            style={{ color: 'white' }}
            component={Link}
            to="/play"
            label="Play"
            value="play"
            icon={
              <SportsEsportsIcon style={{ fontSize: 30, color: 'white' }} />
            }
          />
          <BottomNavigationAction
            onClick={() => dispatch(setNavigationTab('contribute'))}
            style={{ color: 'white' }}
            component={Link}
            to="/contribute"
            label="Contribute"
            value="contribute"
            icon={
              <InsertCommentIcon style={{ fontSize: 30, color: 'white' }} />
            }
          />
        </BottomNavigation>
      </nav>
    </MuiThemeProvider>
  );
}
export default Navbar;
