export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  const bearerToken = { Authorization: 'Bearer ' + user.token };

  if (user.token) {
    return { headers: bearerToken };
  } else {
    return {};
  }
}