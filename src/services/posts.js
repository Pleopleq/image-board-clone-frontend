import axios from 'axios'
const baseUrlPosts = 'http://localhost:3001/api/posts/'
const baseUrlComments = 'http://localhost:3001/api/replies/'

let token = null
/*
const setToken = newToken => {
    token = `bearer ${newToken}`
}
*/

const getAll = async () => {
    const request = await axios.get(baseUrlPosts)
    return request.data
}

const getAllComments = async id => {
    const request = await axios.get(baseUrlComments+id)
    return request.data
}


export default {
    getAll,
    getAllComments
}