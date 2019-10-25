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
  const [userError, setUserError] = useState("");

  const { name, email, password, password2 } = formData;

  function onChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    //   const formData = new FormData(form);
    //   const data = Object.fromEntries(formData);
    // console.log(formData);
    setNameError("");
    setEmailError("");
    setPasswordError("");
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
      } else console.log(res.token);
    });
  }

  return (
    <RegisterStyled>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">Create Your Account</p>
      <form className="form" onSubmit={event => handleSubmit(event)}>
        <div className="form-group">
          <InputStyled
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={event => onChange(event)}
          />
          <p>{nameError}</p>
        </div>
        <div className="form-group">
          <InputStyled
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={event => onChange(event)}
          />
          <p>{emailError}</p>
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
        <p>{passwordError}</p>
        <div className="form-group">
          <InputStyled
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={event => onChange(event)}
          />
        </div>
        <button type="submit" className="btn btn-primary" value="Register">
          Register
        </button>
        <p>{userError}</p>
      </form>
      <p className="my-1">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
    </RegisterStyled>
  );
}

const InputStyled = styled.input`
  display: flex;

  width: 90%;
  height: 35px;
  border-radius: 0.2rem;
`;

const RegisterStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  height: 100%;
`;
