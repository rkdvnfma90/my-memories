import axios from 'axios'

const API = axios.create({
  baseURL: 'https://ab-my-memories.herokuapp.com',
})
//const url = 'https://ab-my-memories.herokuapp.com'
// const url = 'http://localhost:5000'

// 요청이나 응답을 가로챌 수 있음
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})

export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost)
}
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signIn', formData)
export const signUp = (formData) => API.post('/user/signUp', formData)
