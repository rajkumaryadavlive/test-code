import classes from './AuthForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions';
import { useState } from 'react';
import loginData from '../../MockData/loginData';
import TableCon from '../EmployeeTable/Table';


const AuthForm = () => {
  const logged = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[err, setError] = useState(false);
  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passHandler = (event) => {
    setPassword(event.target.value);
  }

  const loginHandler = (event) => {
    event.preventDefault();
    if ((email === loginData().username) && (password === loginData().password)) {
      dispatch(login());
    }
    else {
      setError("Please enter correct credentials");
    }
    
  }




  
  

  return (
    <div>
    {logged ? <TableCon /> :
      <section className={classes.auth}>
        <h1>Login</h1>
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required onChange={emailHandler} value={email} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required onChange={passHandler} value={password}/>
          </div>
          <div className={classes.actions}>
            <button onClick={loginHandler}>Login</button>
          </div>
          <h3>{err}</h3>
        </form>
      </section>
    }
    </div>
  
    
  );
};

export default AuthForm;
