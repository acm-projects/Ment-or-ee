import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = UseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const success = await login(email, password);

    if (success) {
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 bg-[#F5F5EF]">
        <button
          onClick={handleHomeClick}
          className="flex items-center px-6 py-4"
        >
          <img src={logo} alt="mentor/ee logo" className="h-16 w-auto mr-2" />
          <span className="text-4xl font-bold text-gray-800">mentor/ee</span>
        </button>

        <div className="flex flex-col items-center justify-center">
          <h1 class="mt-12 text-5xl block text-center font-semibold">
            Welcome Back!
          </h1>

          <form action="POST">
            <div class="mt-12">
              <label font-bold mb-2 block for="email"></label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                class="w-full block border text-base px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full"
                placeholder="Email"
              />
            </div>
            <div class="mt-4">
              <label for="password"></label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                class="w-full block border text-base px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full"
                placeholder="Password"
              />
            </div>
            <div class="flex items-center justify-between mt-5">
              <button
                type="submit"
                className="border-2 border-[#1F2839] bg-[#1F2839] text-white py-1 px-5 rounded-md hover:bg-transparent hover:text-[#1F2839] font-semibold"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>

            {/* <p className="flex justify-between m-3">or</p> */}
            <div className="flex justify-between m-3">
              <button
                className="border-none bg-none text-center hover:underline"
                onClick={() => navigate("/signup")}
              >
                Don't have an account?
              </button>
            </div>
          </form>

          <div>
            <h2>Log in here with Google</h2>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-[#1F3839]"></div>
    </div>
  );
};

export default Login;
