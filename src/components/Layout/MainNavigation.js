import { Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './MainNavigation.module.css';
import { logout } from '../../actions';



const MainNavigation = () => {
  const logged = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  let history = useHistory();

const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
}

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Test App</div>
      </Link>
      <nav>
        <ul>
          {!logged&&
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          }
          {logged&&
          <li>
           <button onClick={logoutHandler}>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
