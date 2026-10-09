import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL


const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/project`)
    return response.data
}

export const addProject = async (values) => {
    const formData = new FormData()

    formData.append("projectTitle", values.projectTitle)
    formData.append("projectDesc", values.projectDesc)
    formData.append("order", values.order)

    if (values.projectImage?.[0]) {
        formData.append("projectImage", values.projectImage[0])
    }

    formData.append(
        "caseStudy",
        JSON.stringify(values.caseStudy)
    )

    const response = await axios.post(
        `${API_URL}/project/new/add`,
        formData,
        {
            headers: authHeaders(),
        }
    )

    return response.data
}

export const updateProject = async ({id, values}) => {
    const formData = new FormData()

    formData.append("projectTitle", values.projectTitle)
    formData.append("projectDesc", values.projectDesc)
    formData.append("order", values.order)

    if (values.projectImage?.[0]) {
        formData.append(
            "projectImage",
            values.projectImage[0]
        )
    }

    formData.append(
        "caseStudy",
        JSON.stringify(values.caseStudy)
    )


    const response = await axios.patch(
        `${API_URL}/project/update/${id}`,
        formData,
        {
            headers: authHeaders()

        }
    )
    return response.data
}

export const deleteProject = async (id) => {
    const response = await axios.delete(`${API_URL}/project/delete/${id}`, {
        headers: authHeaders()
    })
    return response.data
}