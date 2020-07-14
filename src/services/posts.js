import axios from 'axios'
const baseUrlPosts = 'http://localhost:3001/api/posts/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
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
    setToken
}