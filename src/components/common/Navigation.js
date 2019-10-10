import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import BookmarkIcon from "@material-ui/icons/Bookmark";
// import AppsIcon from "@material-ui/icons/Apps";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import AddIcon from "@material-ui/icons/Add";
// import SettingsIcon from "@material-ui/icons/SettingsApplications";
// import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    // borderRadius: "1.5rem 1.5rem 0 0",
    width: "100%",
    height: "10%",
    backgroundColor: "#F9F6F2",
    position: "fixed",
    bottom: 0,
    // marginBottom: "-5px"
    icon: {
      background: "black"
    }
  }
});

// const useBadgeStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(2)
//   },
//   padding: {
//     padding: theme.spacing(0, 2)
//   }
// }));

function NavigationIcons() {
  const classes = useStyles();
  // const badgeClasses = useBadgeStyles();
  const [value, setValue] = React.useState("home");

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      classes={{
        root: classes.root
      }}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        value="home"
        icon={<HomeIcon fontSize="large" />}
        key="0"
      />
      <BottomNavigationAction
        component={Link}
        to="/bookmarks"
        label="Bookmarks"
        value="bookmark"
        icon={<BookmarkIcon fontSize="large" />}
        key="1"
      />

      {/* <BottomNavigationAction
        label="Categories"
        value="categories"
        icon={<AppsIcon fontSize="large" />}
        key="2"
      /> */}

      {/*  <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<SettingsIcon fontSize="large" />}
        key="3"
      /> */}
    </BottomNavigation>
  );
}

export default NavigationIcons;
