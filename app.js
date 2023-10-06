/*
  CONFIG.
*/

require('dotenv').config()
const api = require('./config')

const express = require('express')
const axios = require('axios')

const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.USER_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  req.isAuthenticated()
    ? res.locals.auth = true
    : res.locals.auth = false

  next()
})

const LocalStrategy = require('passport-local').Strategy
initPassport(passport)

/*
  APP GET.
*/

app.get('/', async(req, res) =>
{
  const data = await Promise.all([
    api.get.events(),
    api.get.gallery(),
    api.get.testimonials()
  ]).then(res =>
  {
    return {
      events: res[0].data,
      gallery: res[1].data,
      testimonials: res[2].data
    }
  })

  res.render('pages/home', {
    ...data
  })
})

app.get('/blog', async(req, res) =>
{
  res.render('pages/blog', {

  })
})

app.get('/booking', async(req, res) =>
{
  res.render('pages/booking', {

  })
})

app.get('/mybooking', auth, async(req, res) =>
{
  res.render('pages/mybooking', {

  })
})

app.get('/contact', async(req, res) =>
{
  res.render('pages/contact')
})

app.get('/thanks', async(req, res) =>
{
  res.render('pages/thanks')
})

app.get('/login', noAuth, async(req, res) =>
{
  res.render('pages/login')
})

app.get('/register', noAuth, async(req, res) =>
{
  res.render('pages/register')
})

/*
  APP POST.
*/

app.post('/login', noAuth, passport.authenticate('local',
{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  session: true
}))

app.post('/register', noAuth, async(req, res) =>
{
  try
  {
    axios.post(
      api.post.register,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      api.config
    )
    res.redirect('/')
  }
  catch
  {
    res.redirect('/register')
  }
})

app.post('/contact', async(req, res) =>
{
  try
  {
    axios.post(
      api.post.contactMessage,
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: new Date().toJSON()
      },
      api.config
    )
    res.redirect('/thanks')
  }
  catch(err)
  {
    console.log(err)
  }
})

/*
  DELETE.
*/

app.delete('/logout', (req, res) =>
{
  req.logOut(() => { res.redirect('/login') })
})

/*
  LISTEN.
*/

app.listen(process.env.PORT, () =>
{
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})

/*
  FUNCTIONS.
*/

function auth(req, res, next)
{
  if(req.isAuthenticated())
    return next()

  res.redirect('/login')
}

function noAuth(req, res, next)
{
  if(req.isAuthenticated())
    return res.redirect('/')

  next()
}

function login(email, password)
{
  return axios.post(
    api.post.login,
    {
      email: email,
      password: password
    },
    api.config
  )
}

function initPassport(passport)
{
  const authUser = async (email, password, done) =>
  {
    const res = await login(email, password)
    const user = res.data.user

    if(user.email === undefined)
      return done(null, false, { message: 'No user with that email' })
    if(res.data === 'Incorrect password')
      return done(null, false, { message: 'Incorrect password'})

    return done(null, res)
  }

  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authUser))

  passport.serializeUser((user, cb) =>
  {
    process.nextTick(() =>
    {
      return cb(
        null,
        {
          id: user.id,
          email: user.email,
          name: user.name
        }
      )
    })
  })

  passport.deserializeUser((user, cb) =>
  {
    process.nextTick(() =>
    {
      return cb(null, user)
    })
  })
}
