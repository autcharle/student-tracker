import { API_URL } from "./config"

export default () => {
  const token = localStorage.getItem("token");
  return fetch(`${API_URL}/get-class-id`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      }}).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Login failed')
        }
      })
}