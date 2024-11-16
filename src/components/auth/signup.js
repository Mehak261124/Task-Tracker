import React, { useState } from "react";
import "./Signup.css";  
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock validation
    if (signUpData.name && signUpData.email && signUpData.password) {
      // Save mock user data to localStorage (simulating signup success)
      const mockUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];
      mockUsers.push(signUpData);
      localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

      navigate("/login"); // Redirect to login page
    } else {
      setErrorMessage("Please fill all fields correctly.");
    }
  };

  return (
    <div className="card">
      <h2 className="heading">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputField">
          <label htmlFor="name">Name:</label>
          <input
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                name: e.target.value,
              })
            }
            type="text"
            id="name"
            value={signUpData.name}
            className="input"
          />
        </div>
        <div className="inputField">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                email: e.target.value,
              })
            }
            type="email"
            id="email"
            value={signUpData.email}
            className="input"
          />
        </div>
        <div className="inputField">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                password: e.target.value,
              })
            }
            type="password"
            id="password"
            value={signUpData.password}
            className="input"
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="btndiv">
          <button type="submit" className="button">
            Signup
          </button>
        </div>

        <div className="signInNote">
          Already have an Account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="anchor"
          >
            SignIn here
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
