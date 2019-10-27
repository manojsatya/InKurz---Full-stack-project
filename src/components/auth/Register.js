import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { postRegisterUser } from "./servicesAuth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [userError, setUserError] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  const { name, email, password, password2 } = formData;

  function onChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPassword2Error("");
    if (password === password2) {
      postRegisterUser(formData).then(res => {
        if (res.errors) {
          for (let i = 0; i < res.errors.length; i++) {
            if (res.errors[i].param === "name") {
              setNameError(res.errors[i].msg);
            } else if (res.errors[i].param === "email") {
              setEmailError(res.errors[i].msg);
            } else if (res.errors[i].param === "password") {
              setPasswordError(res.errors[i].msg);
            }
          }
        } else if (res.message) {
          setUserError(res.message);
        } else if (res.token) {
          setUserError("");
          setRegisterMsg("Registered Successfully");
          setFormData({
            ...formData,
            name: "",
            email: "",
            password: "",
            password2: ""
          });
        }
      });
    } else {
      setPassword2Error("Passwords does not match");
    }
  }

  return (
    <RegisterStyled>
      <TitleStyled>
        In
        <SpanStyled>Kurz</SpanStyled>
      </TitleStyled>
      <TitleLeadStyled>Create Your Account</TitleLeadStyled>
      <form className="form" onSubmit={event => handleSubmit(event)}>
        <div className="form-group">
          <InputStyled
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={event => onChange(event)}
          />
          <AlertMsgStyled>{nameError}</AlertMsgStyled>
        </div>
        <div className="form-group">
          <InputStyled
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={event => onChange(event)}
          />
          <AlertMsgStyled>{emailError}</AlertMsgStyled>
        </div>
        <div className="form-group">
          <InputStyled
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={event => onChange(event)}
          />
        </div>
        <AlertMsgStyled>{passwordError}</AlertMsgStyled>
        <div className="form-group">
          <InputStyled
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={event => onChange(event)}
          />
        </div>
        <AlertMsgStyled>{password2Error}</AlertMsgStyled>
        <ButtonStyled type="submit" value="Register">
          Register
        </ButtonStyled>
        <AlertMsgStyled>{userError}</AlertMsgStyled>
        <RegisterMsgStyled>{registerMsg}</RegisterMsgStyled>
      </form>
      <TitleLeadStyled>
        Already have an account? <NavlinkStyled to="/">Sign In</NavlinkStyled>
      </TitleLeadStyled>
    </RegisterStyled>
  );
}

const InputStyled = styled.input`
  display: flex;
  width: 90%;
  height: 35px;
  border-radius: 0.2rem;
  margin: 0 auto;
`;

const RegisterStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  height: 100%;
`;

const TitleStyled = styled.h1`
  font-family: "Baloo", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 4rem;
  margin: 95px auto 10px;
  text-align: center;
`;
const TitleLeadStyled = styled.p`
  margin: 0 auto;
  font-size: 1.3rem;
`;
const SpanStyled = styled.span`
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

const ButtonStyled = styled.button`
  color: white;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#ffb930" : "#721313"};
  margin: 20px;
  width: 85%;
  height: 35px;
  outline: none !important;
  box-shadow: 0px 2px 5px grey;
  border-radius: 2rem;
`;

const NavlinkStyled = styled(NavLink)`
  color: ${props => (props.theme.mode === "dark" ? "#ffb930" : "#721313")};
`;

const AlertMsgStyled = styled.p`
  color: red;
  margin-left: 15px;
`;

const RegisterMsgStyled = styled.p`
  color: green;
  margin-left: 15px;
`;
