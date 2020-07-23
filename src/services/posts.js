import axios from 'axios'
const baseUrlPosts = 'http://localhost:3001/api/posts/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const createPost = async post => {
    const request = await axios.post(baseUrlPosts, post, {
        headers: {
          'Authorization': token
        }
      })
    return request.data
}

const deletePost = async id => {
    const request = await axios.delete(baseUrlPosts+id, {
        headers: {
          'Authorization': token
        }
      })
    return request.data
}

const update = async (id, updatedPost) => {
  const request = await axios.put(baseUrlPosts+id, updatedPost, {
    headers: {
      'Authorization': token
    }
  })
  return request.data
}

const getAll = async () => {
    const request = await axios.get(baseUrlPosts)
    return request.data
}

const getOne = async id => {
    const request = await axios.get(baseUrlPosts+id)
    return request.data
}


export default {
    getAll,
    getOne,
    createPost,
    deletePost,
    update,
    setToken
}