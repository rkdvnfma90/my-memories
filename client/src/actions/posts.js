import * as api from '../api'

// 액션 생성자 (redux thunk 사용하기 위함)
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts() // response.data
    dispatch({ type: 'FETCH_ALL', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    dispatch({ type: 'CREATE', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: 'UPDATE', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: 'DELETE', payload: id })
  } catch (error) {
    console.log(error)
  }
}
