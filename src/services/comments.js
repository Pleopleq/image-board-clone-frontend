import axios from 'axios'
const baseUrlComments = 'http://localhost:3001/api/replies/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async id => {
    const response = await axios.get(baseUrlComments+id)
    return response.data
}

const newComment = async (id, message) => {
    const response = await axios.post(baseUrlComments+id, message, {
        headers: {
          'Authorization': token
        }
      })
    return response.data
}

export default { newComment, setToken, getAll }