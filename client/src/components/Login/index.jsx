import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import useStyles from './styles';
import Icon from './icon';
import { GoogleLogin, GoogleLogout, GoogleOAuthProvider} from "@react-oauth/google";
import { Redirect } from 'react-router-dom';



const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [use, setUser] = useState({});
  const classes = useStyles();
  const google = window.google;




  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    google.accounts.id.disableAutoSelect();
    google.accounts.id.prompt();
  }

  const handleGoogleLogin = () => {
    window.open(
          'http://localhost:8080/api/auth/google/callback',
          "_self"
        );
        localStorage.setItem("token", "aaryan");

        window.open(
          '/',
          "_self"
        );
    
  };


  const handleGoogleLoginFailure = (error) => {
    console.log(error);
  };
    

  const googleFailure = () => alert('Google Sign In was unsuccessful. Try again later')

  


  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
                <GoogleOAuthProvider clientId="148379985030-v1igf0cg3b8bbmpnnv9e7613er0tf9h6.apps.googleusercontent.com">
              <GoogleLogin
              buttonText="Sign in with Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLoginFailure}
               cookiePolicy={'single_host_origin'}
            />
               </GoogleOAuthProvider>
          </form>
        </div>

        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
