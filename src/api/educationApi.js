import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

export const getEducation = async () => {
  const response = await axios.get(`${API_URL}/edu`)
  return response.data
}

export const getEducationById = async (id) => {
  const response = await axios.get(`${API_URL}/edu/${id}`)
  return response.data
}

export const addEducation = async (values) => {
  const response = await axios.post(`${API_URL}/edu/add`, values,  { headers: authHeaders() })
  return response.data
}

export const updateEducation = async ({ id, values }) => {
  const response = await axios.patch(`${API_URL}/edu/update/${id}`, values, { headers: authHeaders() })

  return response.data
}

export const deleteEducation = async (id) => {
  const response = await axios.delete(`${API_URL}/edu/delete/${id}`, { headers: authHeaders() })
  return response.data
}