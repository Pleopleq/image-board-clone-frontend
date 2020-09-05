import axios from 'axios'
const baseUrlComments = 'https://desolate-anchorage-55331.herokuapp.com/api/replies/'

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

const deleteComment = async id => {
    const response = await axios.delete(baseUrlComments+id, {
      headers: {
        'Authorization': token
      }
    })
    return response.data
}

const update = async (id, updatedComment) => {
  const response = await axios.put(baseUrlComments+id, updatedComment, {
    headers: {
      'Authorization': token
    }
  })
  return response.data
}

export default { 
  setToken, 
  newComment,
  deleteComment,
  update,
  getAll 
}