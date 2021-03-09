import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import useStyles from './styles'
import memories from '../../images/memories.png'

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const logout = () => {
    dispatch({ type: LOGOUT })
    history.push('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)
      // 토큰만료되면 로그아웃
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h4"
          align="center"
        >
          Memories..
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            로그인
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
