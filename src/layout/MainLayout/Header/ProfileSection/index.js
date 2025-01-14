import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extend/Transitions";
import User1 from "assets/images/users/user-round.svg";

// assets
import { IconLogout, IconSettings, IconUser, IconWallet } from "@tabler/icons";
import ChangePassword from "ui-component/modal/password/ChangePassword";
import WalletModal from "ui-component/modal/wallet/WalletModal";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Set the authentication status here
  const userData = JSON.parse(user);
  const apiUrl = "https://parkzapi.azurewebsites.net/api";

  // const [sdm, setSdm] = useState(true);
  // const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();
  const [data, setData] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchData = async () => {
    const response = await fetch(
      `${apiUrl}/business-profile/business-profile/${userData._id}`,
      requestOptions
    );
    const data = await response.json();
    console.log("data.data", data.data);
    setData(data.data);
    setAvatar(data.data.avatar);
  };

  useEffect(() => {
    fetchData();
  }, []);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setIsOpenWallet(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose(event);
    setIsOpen(true);
  };

  const handleListItemClickWallet = (event, index) => {
    setSelectedIndex(index);
    handleClose(event);
    navigate("/wallet");
  };

  const handleListItemProfileClick = (event, index, route) => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };

  const handleListItemClickClose = () => {
    setIsOpen(false);
    setIsOpenWallet(false);
    setSelectedIndex(-1);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={avatar ? avatar : User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper sx={{ transform: "translate(-2px, -25px)" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Chào mừng,</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {data?.name}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">
                        {userData.role === "Manager" ? "Quản lý" : "Bảo vệ"}
                      </Typography>
                    </Stack>
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: "100%",
                      maxHeight: "calc(100vh - 250px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0)}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Đổi mật khẩu
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemProfileClick(event, 1, "/profile")
                          }
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">Hồ sơ</Typography>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 2}
                          onClick={(event) =>
                            handleListItemClickWallet(event, 2)
                          }
                        >
                          <ListItemIcon>
                            <IconWallet stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">Ví</Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 3}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Đăng xuất</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <ChangePassword isOpen={isOpen} handleClose={handleListItemClickClose} />
      <WalletModal
        isOpen={isOpenWallet}
        handleClose={handleListItemClickClose}
      />
    </>
  );
};

export default ProfileSection;
