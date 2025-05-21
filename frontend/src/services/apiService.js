import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const apiService = {
  // Sectors
  async getSectors() {
    const response = await axios.get(`${API_BASE_URL}/sectors`)
    return response.data
  },

  // Users
  async createUser(userData) {
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  },

  async getUserById(userId) {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
    return response.data
  },

  async updateUser(userId, userData) {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
}

export default apiService 