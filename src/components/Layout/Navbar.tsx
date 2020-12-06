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

const theme = createMuiTheme({
  typography: {
    fontSize: 12
  },
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {
          color: '#2D7BC8'
        },
        margin: '0px -15px',
        padding: '0px 15px',
        color: grey[700]
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
  const classes = useStyles(props);


  return (
    <MuiThemeProvider theme={theme}>
      <nav>
          <BottomNavigation
            value="test"
            className={classes.stickToBottom}
          >
            <BottomNavigationAction
              component={Link}
              to="/projects"
              label="Projects"
              value="projects"
              icon={<EmojiTransportationIcon style={{ fontSize: 30 }} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/feed"
              label="Feed"
              value="feed"
              icon={<InsertCommentIcon style={{ fontSize: 30 }} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/participate"
              label="Participate"
              value="participate"
              icon={<PeopleIcon style={{ fontSize: 30 }} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/dashboard"
              label="Dashboard"
              value="dashboard"
              icon={<AssessmentIcon style={{ fontSize: 30 }} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/notifications"
              label="Notifications"
              value="notifications"
              icon={<NotificationsIcon style={{ fontSize: 30 }} />}
            />
          </BottomNavigation>
      </nav>
    </MuiThemeProvider>
  );
}
export default Navbar;
