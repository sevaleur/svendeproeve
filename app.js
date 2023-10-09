/*
  CONFIGURATION.
*/

require('dotenv').config()
const api = require('./api_config')

const express = require('express')
const axios = require('axios')
const axiosInstance = axios.create({ baseURL: api.BASE_URL })

const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(flash())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: api.USER_SECRET,
  cookie: {
    secure: false,
    sameSite: 'lax',
    maxAge: api.oneday,
    httpOnly: true
  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

initPassport(passport)

/*
*
** JWT INTERCEPTION.
*
*/

if(typeof localStorage === "undefined" || localStorage === null)
{
  const LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage('./scratch')
}

axiosInstance.interceptors.request.use(
  (config) =>
  {
    const token = localStorage.getItem('accessToken')
    if(token)
    {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) =>
  Promise.reject(error)
)

/*
*
** LINK BEHAVIOR // AUTHENTICATION CHECK
*
*/

const linkResolver = req =>
{
  if(req.url === '/blogpost')
  {
    return `/blogpost/${req.params.uid}`
  }

  if(req.url === '/user')
  {
    if(req.isAuthenticated())
    {
      return `/user/${user.id}`
    }
    else
    {
      return '/error'
    }
  }

  if(req.url === '/comments')
  {
    if(req.isAuthenticated())
    {
      return `/comments/${user.id}`
    }
    else
    {
      return '/error'
    }
  }

  if(req.url === '/reservations')
  {
    if(req.isAuthenticated())
    {
      return `/reservations/${user.id}`
    }
    else
    {
      return '/error'
    }
  }

  return '/'
}

app.use((req, res, next) => {
  res.locals.Link = linkResolver

  req.isAuthenticated()
    ? (res.locals.auth = true, res.locals.user = req.user)
    : res.locals.auth = false

  next()
})

/*
*
** API REQUESTS & ROUTING
*
*/

/*
*
 ** APP/API GET REQUESTS.
 *
*/


app.get('/', async(req, res) =>
{
  const data = await Promise.all([
    axiosInstance.get(`${api.BASE_URL}/events`),
    axiosInstance.get(`${api.BASE_URL}/gallery`),
    axiosInstance.get(`${api.BASE_URL}/testimonials`),
    axiosInstance.get(`${api.BASE_URL}/blogposts`)
  ]).then(res =>
  {
    return {
      events: res[0].data,
      gallery: res[1].data,
      testimonials: res[2].data,
      blogPost: res[3].data,
    }
  })

  res.render('pages/home', {
    ...data
  })
})

/*
  BLOG.
*/

app.get('/blog', async(req, res) =>
{
  const data = await Promise.all([
    axiosInstance.get(`${api.BASE_URL}/blogposts`),
    axiosInstance.get(`${api.BASE_URL}/comments`)
  ]).then(res =>
    {
      return {
        blogpost: res[0].data,
        comments: res[1].data
      }
    }
  )

  res.render('pages/blog', {
    ...data
  })
})

app.get('/blogpost/:uid', async(req, res) =>
{
  res.locals.uid = req.params.uid
  const post = await axiosInstance.get(
    `${api.BASE_URL}/blogposts/${req.params.uid}`
  ).then(
    res =>
    { return res.data }
  )

  const comments = await axiosInstance.get(
    `${api.BASE_URL}/comments?blogpostId=${req.params.uid}`
  ).then(
    res =>
    { return res.data.slice().reverse() }
  )

  res.render('pages/blogpost', {
    post,
    comments,
  })
})

/*
  BOOKING.
*/

app.get('/booking', async(req, res) =>
{
  if(req.isAuthenticated())
  {
    const tables = api.tables
    const date = new Date()

    res.render('pages/booking', {
      tables: tables.images,
      positions: tables.positions,
      date
    })
  }
  else
  {
    res.render('pages/booking')
  }
})

app.get('/reserved', async(req, res) =>
{
  res.render('pages/reserved')
})

/*
  CONTACT.
*/

app.get('/contact', async(req, res) =>
{
  res.render('pages/contact')
})

app.get('/thanks', async(req, res) =>
{
  res.render('pages/thanks')
})

/*
  LOGIN // REGISTER.
*/

app.get('/login', noAuth, async(req, res) =>
{
  res.render('pages/login')
})

app.get('/register', noAuth, async(req, res) =>
{
  res.render('pages/register')
})

app.get('/error', noAuth, async(req, res) =>
{
  res.render('pages/error')
})

/*
  USER.
*/

app.get('/user/:uid', auth, async(req, res) =>
{
  try
  {
    const reservations = await axiosInstance.get(
      `${api.BASE_URL}/reservations?userId=${req.user.id}`
    ).then(res =>
      { return res.data } )

    const comments = await axiosInstance.get(
      `${api.BASE_URL}/users/${req.user.id}?embed=comments`
    ).then(res =>
      { return res.data } )

    res.render('pages/user', {
      comments,
      reservations,
    })
  }
  catch (e)
  {
    res.redirect('/error')
    console.log(e)
  }
})

app.get('/reservations/:uid', auth, async(req, res) =>
{
  try
  {
    const reservations = await axiosInstance.get(
      `${api.BASE_URL}/reservations?userId=${req.user.id}`
    ).then(res =>
      { return res.data } )

    res.render('pages/reservations', {
      reservations
    })
  }
  catch (e)
  {
    res.redirect('/error')
    console.log(e)
  }
})

app.get('/comments/:uid', auth, async(req, res) =>
{
  try
  {
    const comments = await axiosInstance.get(
      `${api.BASE_URL}/users/${req.user.id}?embed=comments`
    ).then(res =>
      { return res.data } )

    const images = await axiosInstance.get(
      `${api.BASE_URL}/blogposts`
    ).then(res =>
      { return res.data } )

    res.render('pages/comments', {
      comments,
      images
    })
  }
  catch (e)
  {
    res.redirect('/error')
    console.log(e)
  }
})

/*
*
 ** API POST REQUESTS.
 *
*/

/*
 LOGIN // REGISTER.
*/

app.post('/login', passport.authenticate('local',
{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  session: true
}))

app.post('/register', async(req, res) =>
{
  try
  {
    axiosInstance.post(
      `${api.BASE_URL}/register`,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      api.headers
    )
    res.redirect('/')
  }
  catch
  {
    res.redirect('/error')
  }
})

/*
  CONTACT.
*/

app.post('/contact', async(req, res) =>
{
  try
  {
    axiosInstance.post(
      `${api.BASE_URL}/contact_messages`,
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: new Date().toJSON()
      },
      api.headers
    )
    res.redirect('/thanks')
  }
  catch(err)
  {
    console.log(err)
    res.redirect('/error')
  }
})

/*
  BOOKING.
*/

app.post('/booking', async(req, res) =>
{
  try
  {
    const date = new Date(req.body.date).toISOString()

    axiosInstance.post(
      `${api.BASE_URL}/reservations`,
      {
        userId: req.user.id,
        name: req.body.name,
        email: req.body.email,
        table: req.body.table,
        guests: req.body.guests,
        date,
        phone: req.body.phone
      },
      api.headers
    )
    res.redirect('/reserved')
  }
  catch(e)
  {
    console.log(e)
    res.redirect('/error')
  }
})

/*
  BLOGPOST COMMENT.
*/

app.post('/blogpost', async(req, res) =>
{
  try
  {
    const date = new Date().toJSON()

    axiosInstance.post(
      `${api.BASE_URL}/comments`,
      {
        blogpostId: req.body.uid,
        userId: req.user.id,
        name: req.body.name,
        content: req.body.message,
        date
      },
      api.headers
    )
    res.redirect(`/blogpost/${req.body.uid}`)
  }
  catch(e)
  {
    console.log(e)
    res.redirect('/error')
  }
})

/*
*
**  DELETE.
*
*/

app.delete('/comments', async (req, res) =>
{
  try
  {
    await axiosInstance.delete(
      `${api.BASE_URL}/comments/${req.body.comment}`,
      api.headers
    ).then(
      res =>
      { console.log(res) }
    )
    res.redirect(`/comments/${req.body.uid}`)
  }
  catch (e)
  {
    res.redirect('/error')
    console.log(e)
  }
})

app.delete('/reservations', async (req, res) =>
{
  try
  {
    await axiosInstance.delete(
      `${api.BASE_URL}/reservations/${req.body.rs}`,
      api.headers
    ).then(
      res =>
      { console.log(res) }
    )
    res.redirect(`/reservations/${req.body.uid}`)
  }
  catch (e)
  {
    res.redirect('/error')
    console.log(e)
  }
})

/*
*
**  LOGOUT.
*
*/

app.delete('/logout', (req, res) =>
{
  req.logOut(() => { res.redirect('/login') })
})

/*
*
**  LISTEN.
*
*/

app.listen(process.env.PORT, () =>
{
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})

/*
*
**  FUNCTIONS.
*
*/

const login = async (email, password) =>
{
  return response = await axios.post(
    `${api.BASE_URL}/login`,
    {
      email,
      password
    }
  )
}


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

/*
*
**  PASSPORT_CONFIG.
*
*/

function initPassport(passport)
{
  const authUser = async (email, password, done) =>
  {
    const res = await Promise.resolve(login(email, password)).then(response => { return response })
    const data = res.data

    if(data.user.email === undefined)
      return done(null, false, { message: 'No user with that email' })

    localStorage.setItem('accessToken', data.accessToken)
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
          id: user.data.user.id,
          email: user.data.user.email,
          name: user.data.user.name,
          accessToken: user.data.accessToken
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
