import axios from 'axios';

const API_URL = "http://localhost:3001/api/users/";

const signup = (email, password, org) => {
  const signUpRequest = { 
    email: email,
    password: password,
    organization: org
  }
  console.log(signUpRequest)
  return axios.post(API_URL + "signup", signUpRequest  
  );
};

const login = (email, password) => {
  return axios.post(API_URL + "signin", {
    email: email,
    password: password
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