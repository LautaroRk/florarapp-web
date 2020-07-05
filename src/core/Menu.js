import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuth } from "../auth";
import { Home, Dashboard, ExitToApp, AccountCircle } from '@material-ui/icons';

const MenuAppBar = ({ history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#000000" };
    }
    return { color: "#757575" };
  };

  return (
    <div className="navbar nav-tabs bg-white sticky-top align-items-center">

        <div className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            <div className="d-flex flex-row align-items-center">
              <Home />
              <p className="ml-2 mt-0 mb-0">Inicio</p>
            </div>
          </Link>
        </div>

        {/* Pantalla login */}
        {!isAuth() && (
          <Fragment>
            <div className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                <div className="d-flex flex-row align-items-center">
                  <AccountCircle />
                  <p className="ml-2 mt-0 mb-0">Ingresar</p>
                </div>
              </Link>
            </div>
          </Fragment>
        )}

        {/* Admin logueado */}
        {isAuth() && isAuth().user.role === 1 && (
          <Fragment>
            <div className="nav-item">
              <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
                <div className="d-flex flex-row align-items-center">
                  <Dashboard />
                  <p className="ml-2 mt-0 mb-0">Panel</p>
                </div>
              </Link>
            </div>
          </Fragment>
        )}

        {/* Usuario logueado */}
        {isAuth() && isAuth().user.role === 0 && (
          <Fragment>
            <div className="nav-item">
              <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
                <div className="d-flex flex-row align-items-center">
                  <Dashboard />
                  <p className="ml-2 mt-0 mb-0">Panel</p>
                </div>
              </Link>
            </div>
          </Fragment>
        )}

        {/* Usuario/Admin logueado */}
        {isAuth() && (
          <Fragment>
            <div className="nav-item ml-auto">
              <span
                className="nav-link right"
                style={{ cursor: "pointer", color: "#000000" }}
                onClick={() =>
                  signout(() => {
                    history.push("/signin");
                  })
                }
              >
                <div className="d-flex flex-row align-items-center">
                  <p className="mr-2 mt-0 mb-0">Salir</p>
                  <ExitToApp />
                </div>
              </span>
            </div>
          </Fragment>
        )}
    </div>
  );
};

export default withRouter(MenuAppBar);

// MaterialUI

// import React from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
// import { AccountCircle } from '@material-ui/icons';
// import MenuIcon from '@material-ui/icons/Menu';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const MenuAppBar = ({history}) => {

//   const classes = useStyles();
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             Florar
//           </Typography>
//           <React.Fragment>
//             <IconButton
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleMenu}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorEl}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={open}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleClose}>Profile</MenuItem>
//               <MenuItem onClick={handleClose}>My account</MenuItem>
//             </Menu>
//           </React.Fragment>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default withRouter(MenuAppBar);
