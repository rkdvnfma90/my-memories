import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'

const Posts = () => {
  const posts = useSelector((state) => state.posts) // state.posts는 reducers/index.js 에서 확인 가능
  const classes = useStyles()

  console.log(posts)

  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  )
}

export default Posts
