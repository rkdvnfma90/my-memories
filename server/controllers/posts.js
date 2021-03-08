import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find()
    res.status(200).json(postMessage)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  // route에서 '/:값' 으로 넘어온 값을 req.params로 가져옴
  const { id: _id } = req.params
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('해당 Post의 ID가 존재하지 않습니다.')
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  )

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('해당 Post의 ID가 존재하지 않습니다.')
  }

  await PostMessage.findByIdAndRemove(_id)

  res.json({ message: '삭제되었습니다.' })
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('해당 Post의 ID가 존재하지 않습니다.')
  }

  const post = await PostMessage.findById(_id)
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  )

  res.json(updatedPost)
}
