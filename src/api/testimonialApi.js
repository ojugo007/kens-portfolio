import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
})

export const getTestimonials = async () => {
  const response = await axios.get(`${API_URL}/testimonial`)
  return response.data
}

export const getTestimonialById = async (id) => {
  const response = await axios.get(`${API_URL}/testimonial/${id}`)
  return response.data
}

export const addTestimonial = async (values) => {
  const formData = new FormData()

  formData.append("fullName", values.fullName)
  formData.append("position", values.position)
  formData.append("testimonial", values.testimonial)
  formData.append("rating", values.rating)

  if (values.avatar?.[0]) {
    formData.append("avatar", values.avatar[0])
  }

  const response = await axios.post(`${API_URL}/testimonial/new/add`, formData, {headers: authHeaders()})

  return response.data
}

export const updateTestimonial = async ({ id, values }) => {
  const formData = new FormData()

  formData.append("fullName", values.fullName)
  formData.append("position", values.position)
  formData.append("testimonial", values.testimonial)
  formData.append("rating", values.rating)

  // Only send a new avatar when one was selected
  if (values.avatar?.[0]) {
    formData.append("avatar", values.avatar[0])
  }

  console.log(formData)
  const response = await axios.patch(`${API_URL}/testimonial/update/${id}`, formData, {headers: authHeaders()})
  console.log(response)

  return response.data
}

export const deleteTestimonial = async (id) => {
  const response = await axios.delete(`${API_URL}/testimonial/delete/${id}`, {headers: authHeaders()})

  return response.data
}