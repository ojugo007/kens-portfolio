import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})


export const sendMessage = async (values) => {
  const response = await axios.post(
    `${API_URL}/message/send-message`,
    {
      name: values.name,
      email: values.email,
      message: values.message,
    }
  )

  return response.data
}

export const getMessages = async () => {
  const response = await axios.get(`${API_URL}/message`, {headers: authHeaders()})
  return response.data
}

export const getMessage = async (id) => {
  const response = await axios.get(`${API_URL}/message/${id}`,  {headers: authHeaders()})
  return response.data
}

export const generateMessage = async (id) => {
  const response = await axios.post(
    `${API_URL}/message/generate-response/${id}`,
    {headers: authHeaders()}
  )
  return response.data
}

export const sendResponse = async ({ id, message }) => {
  const response = await axios.post(
    `${API_URL}/message/${id}/send-response`,
    { message },
    {headers: authHeaders()}
  )
  return response.data
}

export const deleteMessage = async (id) => {
  const response = await axios.delete(
    `${API_URL}/message/delete/${id}`,
    {headers: authHeaders()}
  )
  return response.data
}