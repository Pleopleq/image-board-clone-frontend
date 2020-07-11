import axios from 'axios'
const baseUrlLogin = 'http://localhost:3001/api/login/'


const login = async credentials => {
    const response = await axios.post(baseUrlLogin, credentials)
    return response.data
}

export default { login }