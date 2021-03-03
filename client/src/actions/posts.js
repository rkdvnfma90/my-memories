import * as api from '../api'

// 액션 생성자 (redux thunk 사용하기 위함)
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts() // response.data
    dispatch({ type: 'FETCH_ALL', payload: data })
  } catch (error) {
    console.log(error.message)
  }
}
