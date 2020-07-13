import axios from 'axios'
const baseUrlUsers = 'http://localhost:3001/api/users/'

const register = async credentials => {
    const response = await axios.post(baseUrlUsers, credentials)
    return response.data
}

export default { register }