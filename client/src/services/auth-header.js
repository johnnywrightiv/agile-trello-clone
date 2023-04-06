export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const bearerToken = { Authorization: 'Bearer ' + user.token };
  console.log(bearerToken);
  console.log(user);
  if (user && user.token) {
    return { headers: bearerToken };
  } else {
    return {};
  }
}