import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Snackbar, StyledEngineProvider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { useEffect, useState } from "react";
import { getMessagingToken, onMessageListener } from "utils/config";
// import StepContext from "context/StepContext";

// ==============================|| APP ||============================== //
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // const [token, setToken] = useState();
  // console.log('message token: ' ,messaging);
  useEffect(() => {
    getMessagingToken();

    if (notification) {
      setSnackbarOpen(true);
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("err: ", err));

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
  >
    <Alert onClose={handleSnackbarClose} severity="info">
      <h2>{notification.title}</h2>
      <p>{notification.body}</p>
    </Alert>
  </Snackbar>;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
