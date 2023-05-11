import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";

import Personal from "ui-component/profile/personal/Personal";
import "./Profile.scss";
import Business from "ui-component/profile/business/Business";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Profile() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid
      container
      direction="row"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "10px",
        height: "90%",
      }}
    >
      <Typography
        color={theme.palette.secondary.main}
        gutterBottom
        variant={matchDownSM ? "h3" : "h2"}
        sx={{ padding: "1%" }}
      >
        Hồ sơ của bạn
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <AppBar
          position="static"
          sx={{
            borderRadius: "10px",
            backgroundColor: "background.paper",
            boxShadow: "none",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            //   textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              color: "#00000",
              backgroundColor: "#ffff",
              fontSize: "20px",
              borderRadius: "10px",
            }}
          >
            <Tab
              label="Cá nhân"
              {...a11yProps(0)}
              // sx={{ borderRight: "1px solid grey" }}
            />
            <Tab label="Doanh nghiệp" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          style={{}}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Personal />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Business />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Grid>
  );
}
