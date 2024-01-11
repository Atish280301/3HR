import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//Email Reducer
const EmailReducer = (state, action) => {
  if(action.type === 'UserInput'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'InputBlur'){
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: "", isValid: false};
};
//Password Reducer
const PasswordReducer = (state, action) => {
  if(action.type === 'UserInput'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'InputBlur'){
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: "", isValid: false};
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
//Email Reduce Code
  const [emailState, dispatchEmail] = useReducer(EmailReducer, {
    value: '',
    isValid: null
  });
//Password Reduce Code
  const [PasswordState, DispatchPassword] = useReducer(PasswordReducer,{
    value: '',
    isValid: null
  })

  const { isValid: EmailIsValid } = emailState;
  const { isValid: PasswordIsValid } = PasswordState;
  useEffect(() => {
    const Handler =  setTimeout(()=>{
       console.log("Checking Form Validity");
       setFormIsValid(
        EmailIsValid && PasswordIsValid
       );
     },500);
     return () => {
       console.log("cleanup!");
       clearTimeout(Handler);
     };
   }, [EmailIsValid, PasswordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'UserInput', val: event.target.value});
    // setFormIsValid(
    //   event.target.value.includes("@") && PasswordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    DispatchPassword({type: 'UserInput', val: event.target.value});
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'InputBlur'});
  };

  const validatePasswordHandler = () => {
    DispatchPassword({type: 'InputBlur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, PasswordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            PasswordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={PasswordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
