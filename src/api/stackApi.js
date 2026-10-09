import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

export const getStacks = async () => {
  const response = await axios.get(`${API_URL}/stack`)
  return response.data
}

export const addStack = async (values) => {
  const response = await axios.post(
    `${API_URL}/stack/new/add`,
    values,
    {
      headers: authHeaders(),
    }
  )

  return response.data
}

export const updateStack = async ({ id, values }) => {
  const response = await axios.patch(
    `${API_URL}/stack/update/${id}`,
    values,
    {
      headers: authHeaders(),
    }
  )

  return response.data
}

export const deleteStack = async (id) => {
  const response = await axios.delete(
    `${API_URL}/stack/delete/${id}`,
    {
      headers: authHeaders(),
    }
  )

  return response.data
}