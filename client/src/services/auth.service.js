import axios from 'axios';

const API_URL = "http://localhost:3001/api/users/";

const signup = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "signin", {
    email,
    password
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringinfy(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  login,
  logout,
}

export default authService;