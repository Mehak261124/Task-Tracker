import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // Retrieve mock users from localStorage
    const mockUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];

    // Check if user credentials match any stored user
    const authenticatedUser = mockUsers.find(
      (user) =>
        user.email === signInData.email && user.password === signInData.password
    );

    if (authenticatedUser) {
      // Mock successful login
      const user = { email: authenticatedUser.email, name: authenticatedUser.name };

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", "mockAccessToken");

      navigate("/"); // Redirect to dashboard
    } else {
      // Mock error
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="card">
      <h2 className="heading">SignIn</h2>
      <form onSubmit={handleSignIn}>
        <div className="inputField">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) =>
              setSignInData({
                ...signInData,
                email: e.target.value,
              })
            }
            type="email"
            id="email"
            value={signInData.email}
            className="input"
          />
        </div>
        <div className="inputField">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) =>
              setSignInData({
                ...signInData,
                password: e.target.value,
              })
            }
            type="password"
            id="password"
            value={signInData.password}
            className="input"
          />
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}

        <div className="btndiv">
          <button type="submit" className="button">
            SignIn
          </button>
        </div>

        <div className="signInNote">
          New User?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="anchor"
            type="button"
          >
            SignUp here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
