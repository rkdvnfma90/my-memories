const posts = (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload
    case 'CREATE':
      return [...posts, action.payload]
    case 'UPDATE':
      // actions.payload 에는 업데이트된 post가 담겨있음
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    default:
      return posts
  }
}

export default posts
