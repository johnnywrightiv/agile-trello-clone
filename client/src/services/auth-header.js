export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.token);
  const bearerToken = { Authorization: 'Bearer ' + user.token };
  console.log(bearerToken);
  if (user && user.token) {
    return { headers: bearerToken };
  } else {
    return {};
  }
}