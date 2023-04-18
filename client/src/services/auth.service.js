import axios from 'axios';

const API_URL = "https://trello-clone-api-crxa.onrender.com/api/users/";

const signup = (email, password, org) => {
  const signUpRequest = { 
    email: email,
    password: password,
    organization: org
  }
  return axios.post(API_URL + "signup", signUpRequest  
  );
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
    email: email,
    password: password
  })
  .then((response) => {
    
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data.user;
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