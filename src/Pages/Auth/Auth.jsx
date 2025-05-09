import React, { useState, useContext } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import classes from "./Signup.module.css";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signin: false, signup: false });

  const [user, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData=useLocation();
console.log(navStateData);


  const authHandler = async (e) => {
    e.preventDefault();
    const actionType = e.target.name;

    if (actionType === "signin") {
      setLoading((prev) => ({ ...prev, signin: true }));

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({...loading, signin: false });
          navigate(navStateData?.useState?.redirect || "/"); 
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, signin: false }));
        });
    } else if (actionType === "signup") {
      setLoading((prev) => ({ ...prev, signup: true }));

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signup: false });

          navigate(navStateData?.useState?.redirect || "/");  
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, signup: false }));
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontweight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInbutton}
            disabled={loading.signin}
          >
            {loading.signin ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing in, you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerbutton}
          disabled={loading.signup}
        >
          {loading.signup ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

