const verifyToken = require('../auth/verifyToken')

const { Router } = require('express')
const router = Router()

const User = require('../models/User')

const jwt = require('jsonwebtoken')

router.get('/', (req, res) => res.send('Hello World!'))

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const newUser = new User({
    email,
    password
  })
  await newUser.save()

  const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY)
  res.status(200).json({ token })
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) return res.status(401).send("Email doesn't exist")
  if (user.password !== password) return res.status(401).send('Wrong password')

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
  return res.status(200).json({ token })
})

router.get('/tasks', (req, res) => {
  res.json([
    {
      _id: 1,
      name: 'Prueba1',
      description: 'Pruebadesc1',
      date: '2021-04-09T03:33:01.211Z'
    },
    {
      _id: 2,
      name: 'Prueba2',
      description: 'Pruebadesc2',
      date: '2021-04-09T03:33:01.211Z'
    },
    {
      _id: 3,
      name: 'Prueba3',
      description: 'Pruebadesc3',
      date: '2021-04-09T03:33:01.211Z'
    }
  ])
})
router.get('/private', verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: 'private Prueba1',
      description: 'Pruebadesc1',
      date: '2021-04-09T03:33:01.211Z'
    },
    {
      _id: 2,
      name: 'private Prueba2',
      description: 'Pruebadesc2',
      date: '2021-04-09T03:33:01.211Z'
    },
    {
      _id: 3,
      name: 'private Prueba3',
      description: 'Pruebadesc3',
      date: '2021-04-09T03:33:01.211Z'
    }
  ])
})

router.get('/profile', verifyToken, (req, res) => {
  res.send(req.userId)
})

module.exports = router
