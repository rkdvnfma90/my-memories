import axios from 'axios'

const url = 'https://ab-my-memories.herokuapp.com/posts'
// const url = 'http://localhost:5000'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id, updatedPost) => {
  return axios.patch(`${url}/${id}`, updatedPost)
}
export const deletePost = (id) => axios.delete(`${url}/${id}`)
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)
