import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(404).json({ message: '사용자가 존재하지 않습니다.' })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: '패스워드가 일치하지 않습니다.' })
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: '1h' }
    )

    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: '로그인시 에러가 발생하였습니다.' })
  }
}

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: '이미 사용자가 존재합니다.' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: '패스워드가 일치하지 않습니다.' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: '1h' }
    )

    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: '회원가입시 에러가 발생하였습니다.' })
  }
}
