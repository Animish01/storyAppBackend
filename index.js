const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const { login } = require('./login.js')
const { signup } = require('./signup.js')
const { create } = require('./create.js')
const { appendPost } = require('./append.js')
const { userVerification } = require('./userVerification.js')
const { fetchPosts, fetchOnePost } = require('./fetchPosts.js')

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.post('/', userVerification)
app.post('/post/create', create)
app.post('/users/login', login)
app.post('/users/signup', signup)
app.get('/post/fetch', fetchPosts)
app.get('/post/fetch/:id', fetchOnePost)
app.post('/post/append/:id', appendPost)

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})