import jwt from 'jsonwebtoken'

// 해당 사용자의 권한을 체크함
// like 버튼 클릭 => auth middleware (next) => like controller
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500 // 일반 jwt 인증

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_TOKEN_KEY)
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
