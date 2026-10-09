import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

export const getExperiences = async () => {
  const response = await axios.get(`${API_URL}/experience`)
  return response.data
}

export const getExperienceById = async (id) => {
  const response = await axios.get(`${API_URL}/experience/${id}`)
  return response.data
}

export const addExperience = async (values) => {
  const response = await axios.post(`${API_URL}/experience/add-new`, values,  { headers: authHeaders() })
  return response.data
}

export const updateExperience = async ({ id, values }) => {
  const response = await axios.patch(`${API_URL}/experience/update/${id}`, values, { headers: authHeaders() })

  return response.data
}

export const deleteExperience = async (id) => {
  const response = await axios.delete(`${API_URL}/experience/delete/${id}`, { headers: authHeaders() })
  return response.data
}