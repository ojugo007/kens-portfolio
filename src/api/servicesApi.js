import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getServices = async () => {
    const response = await axios.get(`${API_URL}/service`)
    return response.data
}


const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

export const addService = async (values) => {
  const response = await axios.post(
    `${API_URL}/service/new/add`,
    values,
    { headers: authHeaders() }
  )

  return response.data
}

export const updateService = async ({ id, values }) => {
  const response = await axios.patch(
    `${API_URL}/service/update/${id}`,
    values,
    { headers: authHeaders() }
  )

  return response.data
}

export const deleteService = async (id) => {
  const response = await axios.delete(
    `${API_URL}/service/delete/${id}`,
    { headers: authHeaders() }
  )

  return response.data
}