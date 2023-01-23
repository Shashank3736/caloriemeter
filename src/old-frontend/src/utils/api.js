const BASE_URL = 'http://localhost:3000/api';

export async function get_user() {
  const response = await fetch(`${BASE_URL}/user`);
  return response.json();
}