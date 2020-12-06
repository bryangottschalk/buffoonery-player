import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Header } from './components/';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#19003C'
    },
    secondary: {
      main: '#19003C'
    }
  },
  overrides: {
    MuiButton: {
      label: {
        whiteSpace: 'nowrap'
      }
    },
    MuiTypography: {
      subtitle1: {
        fontWeight: 'bold'
      },
      h6: {
        fontWeight: 'bold'
      },
      h5: {
        fontSize: 15
      }
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
