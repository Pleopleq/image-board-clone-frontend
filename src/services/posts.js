import axios from 'axios'
const baseUrlPosts = 'https://desolate-anchorage-55331.herokuapp.com/api/posts/'
const baseUrlLikePost = 'https://desolate-anchorage-55331.herokuapp.com/api/posts/likes/'
const imageUploadURL = 'https://api.imgbb.com/1/upload?expiration=600&key=fb223360f4f362805066a7186f4b1056'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const imageUpload = async image => {
  const request = await axios.post(imageUploadURL, image)
  return request.data
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

const likeAPost = async (id, likedPost) => {
  const request = await axios.put(baseUrlLikePost+id, likedPost, {
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
    likeAPost,
    imageUpload,
    setToken
}