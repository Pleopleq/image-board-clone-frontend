import axios from 'axios'
const baseUrlLogin = 'https://desolate-anchorage-55331.herokuapp.com/api/login'


const login = async credentials => {
    const response = await axios.post(baseUrlLogin, credentials)
    return response.data
}

export default { login }