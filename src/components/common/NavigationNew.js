import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Home } from "styled-icons/boxicons-solid/Home";
import { Bookmark } from "styled-icons/boxicons-solid/Bookmark";
import Badge from "@material-ui/core/Badge";

// import { PlusCircle } from "styled-icons/boxicons-solid/PlusCircle";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "fixed",
    backgroundColor: "#F9F6F2",
    bottom: 0
  },
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 2)
  }
}));
export default function Navigation({ bookmarkCount }) {
  const classes = useStyles();
  //   console.log({ bookmarkCount });
  return (
    <NavigationStyled className={classes.root}>
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
    </NavigationStyled>
  );
}

const LinkStyled = styled(NavLink)`
  color: inherit;
  display: flex;
  justify-content: center;

  &.active {
    color: brown;
  }
`;

const NavigationStyled = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: 1px;
`;

const HomeStyled = styled(Home)`
  width: 35px;
`;
const BookmarkStyled = styled(Bookmark)`
  width: 35px;
`;
// const PlusCircleStyled = styled(PlusCircle)`
// width: 28px;
// `
