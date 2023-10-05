require('dotenv').config()

const express = require('express')
const axios = require('axios')

const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const getEvents = () => { return axios.get('http://localhost:4000/events') }
const getGallery = () => { return axios.get('http://localhost:4000/gallery') }
const getTestimonials = () => { return axios.get('http://localhost:4000/testimonials') }

app.get('/', async(req, res) =>
{
  const data = await Promise.all([
    getEvents(),
    getGallery(),
    getTestimonials()
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

app.get('/contact', async(req, res) =>
{
  res.render('pages/contact', {

  })
})

app.get('/login', async(req, res) =>
{
  res.render('pages/login', {

  })
})

app.get('/register', async(req, res) =>
{
  res.render('pages/register', {

  })
})

app.listen(process.env.PORT, () =>
{
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})
