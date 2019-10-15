import React from "react";
import styled from "styled-components/macro";
// import PropTypes from "prop-types";
import Title from "./common/Title";
// import Feedback from "./Feedback";
import { NavLink } from "react-router-dom";

export default function Settings({ firstPart, secondPart }) {
  return (
    <div>
      <Title firstPart={firstPart} secondPart={secondPart} />

      <WrapperStyled>
        <NavlinkStyled to="/feedback">Please give us feedback</NavlinkStyled>
      </WrapperStyled>
    </div>
  );
}

// Settings.propTypes = {

// }

const WrapperStyled = styled.h3`
  text-align: center;
  margin: 100px auto 10px auto;
  background-color: white;
  width: 80%;
  height: 40px;
`;

const NavlinkStyled = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  font-size: 1.3rem;
`;
