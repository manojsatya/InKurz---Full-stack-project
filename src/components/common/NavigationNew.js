import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Home } from "styled-icons/boxicons-solid/Home";
import { Bookmark } from "styled-icons/boxicons-solid/Bookmark";
import { Grid } from "styled-icons/boxicons-solid/Grid";
import { Settings } from "styled-icons/material/Settings";
import Badge from "@material-ui/core/Badge";
// import { ThemeProvider } from "styled-components";

const useStyles = makeStyles(theme => ({
  // root: {
  //   backgroundColor: `${
  //     theme.mode === "dark" ? "#111" : "var(--inkurz-bg-color)"
  //   }`
  // },
  margin: {
    margin: theme.spacing(2)
  }
}));
export default function Navigation({ bookmarkCount }) {
  const classes = useStyles();
  return (
    <NavigationStyled>
      <LinkStyled exact to="/">
        <HomeStyled />
      </LinkStyled>
      <LinkStyled to="/bookmarks">
        <Badge
          className={classes.margin}
          badgeContent={bookmarkCount}
          color="error"
        >
          <BookmarkStyled />
        </Badge>
      </LinkStyled>
      <LinkStyled exact to="/categories">
        <GridStyled />
      </LinkStyled>
      <LinkStyled exact to="/settings">
        <SettingsStyled />
      </LinkStyled>
    </NavigationStyled>
  );
}

const LinkStyled = styled(NavLink)`
  color: inherit;
  display: flex;
  justify-content: center;

  &.active {
    color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  }
`;

const NavigationStyled = styled.nav`
  position: fixed;
  display: grid;
  grid-auto-flow: column;
  /* gap: 1px; */
  width: 100%;
  /* background-color: "#F9F6F2"; */
  background-color: ${props =>
    props.theme.mode === "dark" ? "black" : "#ffefda"};
  bottom: -1px;
`;

const HomeStyled = styled(Home)`
  width: 35px;
`;
const BookmarkStyled = styled(Bookmark)`
  width: 35px;
`;

const GridStyled = styled(Grid)`
  width: 35px;
`;
const SettingsStyled = styled(Settings)`
  width: 35px;
`;
