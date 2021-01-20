import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
import jss from 'json-server';
const { create, router, defaults } = jss;
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
const server = create()
const _router = router
const rout = _router('./db.json')
const userdb = JSON.parse(readFileSync('./db.json', 'UTF-8'))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(defaults());

const SECRET_KEY = '123456789'
const expiresIn = '168h'

function createToken(payload){
  return sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token){
  return verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  let ind = userdb.users.findIndex(user => user.email == email)
  let username = userdb.users[ind].username
  let balance = userdb.users[ind].balance
  let userId = userdb.users[ind].id
  res.status(200).json({username, balance, access_token, userId})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  console.log(req.headers.authorization)
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
})

server.use(rout)

server.listen(8080, () => {
  console.log('Run Auth API Server')
})