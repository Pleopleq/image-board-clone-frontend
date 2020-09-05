import axios from 'axios'
const baseUrlUsers = 'https://desolate-anchorage-55331.herokuapp.com/api/users/'

const register = async credentials => {
    const response = await axios.post(baseUrlUsers, credentials)
    return response.data
}

export default { register }