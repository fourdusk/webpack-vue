import axios from 'axios'

const prefix = '/api'
const getArticleList = params => {
    return axios.get(`${prefix}/articlelist`, { params })
}

export default {
    getArticleList
}
