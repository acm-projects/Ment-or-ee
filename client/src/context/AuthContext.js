import React, { createContext, useContext, useState, useEffect } from "react";
import lindaProfile from "../assets/lindagarcia.png";
import michaelProfile from "../assets/michaelbrown.png";
import robertProfile from "../assets/robertsmith.png";
import autoprofile from "../assets/autoprofile.png";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  useEffect(() => {
    if (accessToken) {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
      // setUser(storedUser);
    }
  }, [accessToken]);

  //check here
  const login = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/authenication/store-auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new Error(error.message);
      }
      const data = await response.json();

      const basicUserInfo = {
        email: data.email,
        user: data.user,
        id: data.id,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      const userResponse = await fetch(
        `http://localhost:5000/api/users/users/${data.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();

      const profile = (() => {
        switch (userData.name) {
          case "Linda Garcia":
            return (
              <img
                src={lindaProfile}
                alt="Profile"
                className="rounded-full object-cover bg-white"
              />
            );
          case "Robert Smith":
            return (
              <img
                src={robertProfile}
                alt="Profile"
                className="rounded-full object-cover bg-white"
              />
            );
          case "Michael Brown":
            return (
              <img
                src={michaelProfile}
                alt="Profile"
                className="rounded-full object-cover bg-white"
              />
            );
          default:
            return (
              <img
                src={autoprofile}
                alt="Profile"
                className="rounded-full object-cover bg-white"
              />
            );
        }
      })();

      const completeUserInfo = {
        ...basicUserInfo,
        ...userData,
        profilePic: profile,
      };

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(completeUserInfo));
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(completeUserInfo);

      return true;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  //complete this - route to landing page
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed on server");
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, accessToken, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);

export { AuthContext };
