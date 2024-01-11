import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context/AuthContext';
import Input from '../Input/Input';
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

  const authCtx = useContext(AuthContext);
  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();
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
    if(formIsValid){
      authCtx.onLogin(emailState.value, PasswordState.value);
    }else if(!EmailIsValid){
      EmailInputRef.current.focus();
    } else {
      PasswordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input 
        ref = {EmailInputRef}
        id="email" 
        label="E-Mail" 
        type="email" 
        isValid={EmailIsValid} 
        value={emailState.value} 
        onChange = {emailChangeHandler}
        onBlur = {validateEmailHandler}
        />
        <Input 
        ref = {PasswordInputRef}
        id="password" 
        label="Password" 
        type="password" 
        isValid={PasswordIsValid} 
        value={PasswordState.value} 
        onChange = {passwordChangeHandler}
        onBlur = {validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;