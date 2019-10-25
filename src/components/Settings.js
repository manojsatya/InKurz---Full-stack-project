import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components/macro";
// import PropTypes from "prop-types";
import Title from "./common/Title";
// import Feedback from "./Feedback";
import { NavLink } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import jwtDecode from "jwt-decode";

export default function Settings({ firstPart, secondPart, onDarkModeClick }) {
  const [user, setUser] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwtDecode(token);
      console.log(token);
      const user = decoded.user.name;
      console.log(decoded.user.name);
      console.log(decoded.user.avatar);
      setUser(user);
      setUserImage(decoded.user.avatar);
    } else {
      console.log("No token");
    }
  }, []);

  function handleDarkModeClick(event) {
    if (event) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
    onDarkModeClick();
  }

  function getMode() {
    if (localStorage.getItem("mode") === "dark") {
      return true;
    } else {
      return false;
    }
  }

  function handleLogout() {
    localStorage.setItem("jwtToken", "");
    setUser("");
    setUserImage("");
  }

  function checkUserLoggedIn() {
    if (user) {
      return (
        <UserInfoStyled>
          {userImage && <ImgStyled src={userImage} alt="userImage" />}
          <UserSectionStyled>
            <p>{user}</p>
            <ButtonStyled onClick={handleLogout}> Logout</ButtonStyled>
          </UserSectionStyled>
        </UserInfoStyled>
      );
    } else {
      return <NavlinkStyled to="/">Login</NavlinkStyled>;
    }
  }

  return (
    <SettingsStyled>
      <Title firstPart={firstPart} secondPart={secondPart} />

      <WrapperStyled>
        {/* {user && (
          <UserInfoStyled>
            {userImage && <ImgStyled src={userImage} alt="userImage" />}
            <UserSectionStyled>
              <p>{user}</p>
              <button onClick={handleLogout}> Logout</button>
            </UserSectionStyled>
          </UserInfoStyled>
        )} */}
        {checkUserLoggedIn()}

        <NavlinkStyled to="/feedback"> Feedback/Suggestions</NavlinkStyled>

        <NavlinkStyled to="/reviews">See All Reviews</NavlinkStyled>

        <DarkModeStyled>
          <p> Dark/Light mode</p>
          <Switch
            checked={getMode()}
            onClick={event => handleDarkModeClick(event.target.checked)}
            value="light"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </DarkModeStyled>
      </WrapperStyled>
    </SettingsStyled>
  );
}

// Settings.propTypes = {

// }

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 80%;
  margin: 0 auto;
  height: 70%;
  /* margin: 100px auto 10px auto; */
`;

const NavlinkStyled = styled(NavLink)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "whitesmoke" : "#F9F6F2"};
  color: black;
  /* text-align: center; */
  text-decoration: none;
  font-size: 1.1rem;
  padding: 30px 60px 30px 40px;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px gray;
`;

const DarkModeStyled = styled.section`
  display: flex;
  justify-content: space-evenly;
  background-color: ${props =>
    props.theme.mode === "dark" ? "whitesmoke" : "#F9F6F2"};
  padding: 20px 0px;
  border-radius: 0.5rem;
  box-shadow: 0 5px 10px gray;
  /* margin-top: 90px; */
  p {
    padding-top: 5px;
    font-size: 1.1rem;
    margin: 0;
    color: black;
  }
`;

const PageTransitionIn = keyframes`
from {
    opacity: 0;
    transform: translateY(100px);
}
to{
    opacity: 1,
    transform: translateY(0px)
}
`;

const SettingsStyled = styled.div`
  animation: ${PageTransitionIn} 0.75s;
`;

const ImgStyled = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
`;

const UserInfoStyled = styled.div`
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 5px 10px gray;
  border-radius: 0.5rem;
  background-color: ${props =>
    props.theme.mode === "dark" ? "whitesmoke" : "#F9F6F2"};
`;

const UserSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    margin: 10px;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
  }
`;

const ButtonStyled = styled.button`
  color: white;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#ffb930" : "#721313"};
  margin: 10px;
  width: 85%;
  height: 35px;
  outline: none;
  box-shadow: 0px 2px 5px grey;
  border-radius: 2rem;
`;
