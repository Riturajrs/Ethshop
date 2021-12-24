import React, { useState, useContext } from "react";

import Card from "./Card";
import Input from "../../../FormElements/Input";
import Button from "../../../FormElements/Button";
import {useHistory} from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../validators";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const history = useHistory();
  const { sendRequest,error } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/login`, //url
          "POST", //method
          JSON.stringify({ //body
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json", //headers 
          }
        );
        auth.login(responseData.userId);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/signup`,
          "POST",
          JSON.stringify({ 
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json", //headers 
          }
        );

        auth.login(responseData.userId);
      } catch (err) {}
    }
    // history.push("/");
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        <h3 style={{"margin-top":"1rem"}}>Login to continue shopping</h3>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Username"
              placeholder="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            placeholder="E-mail Address"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button style={{"margin-right":"5rem"}} type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOG IN" : "SIGN UP"}
          </Button>
          <Button inverse onClick={switchModeHandler}>
           {isLoginMode ? "Don't have an account yet" : "Already have an account"} 
        </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
