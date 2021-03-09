import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'

const Posts = () => {
  const posts = useSelector((state) => state.posts) // state.posts는 reducers/index.js 에서 확인 가능
  const classes = useStyles()

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
