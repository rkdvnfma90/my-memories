import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  // 모바일 디바이스
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    },
  },
}))
