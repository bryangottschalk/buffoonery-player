import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import history from '../../history';
import grey from '@material-ui/core/colors/grey';
import { useSelector, useDispatch } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    color: grey[700],
    background: 'white'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  centerLogo: {
    // justifyContent: 'center'
  }
}));

interface Props {}

export default function Header({}: Props): ReactElement {
  const dispatch = useDispatch();


  const classes = useStyles({});
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openAfterDelay, setOpenAfterDelay] = React.useState(false);

  const delayBeforeShowingIcons = (open: boolean) => {
    //delay waits for drawer open/close animation
    if (open) {
      setOpenAfterDelay(true);
    } else {
      setTimeout(() => {
        setOpenAfterDelay(false);
      }, 250);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    delayBeforeShowingIcons(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    delayBeforeShowingIcons(false);
  };

  return (
    <div>
      
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar className={classes.centerLogo}>
            
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    style={{ marginRight: 'auto' }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <h1>Buffoonery</h1>
                  {/* <Link to="/projects">
                      Buffoonery
                    <img
                      style={{ width: 100, marginLeft: 10 }}
                      src={ReachLogo}
                      alt="Logo"
                    ></img>
                  </Link> */}
                </div>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {['My Profile', 'Logout'].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  {...(text === 'Logout' && {
                    onClick: async () => {
                      console.log('signing out onClick');
                      // localStorage.clear();
                      // history.push('/');
                      //dispatch(fetchLogout());
                      handleDrawerClose();
                    }
                  })}
                  {...(text === 'My Profile' && {
                    onClick: () => {
                      handleDrawerClose();
                      history.push('/myprofile');
                    }
                  })}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <AccountCircleIcon />
                    ) : (
                      <ExitToAppIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <div style={{ height: '10px' }} />
          </main>
        </div>
      
    </div>
  );
}
