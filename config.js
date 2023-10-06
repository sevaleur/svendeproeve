
require('dotenv').config()

const axios = require('axios')

const api = {
  post:
  {
    login: 'http://localhost:4000/login',
    register: 'http://localhost:4000/register',
    contactMessage: 'http://localhost:4000/contact_messages',
    comments: 'http://localhost:4000/comments',
    newsletter: 'http://localhost:4000/newsletters',
    reservations: 'http://localhost:4000/reservations'
  },
  get:
  {
    events: () => { return axios.get('http://localhost:4000/events') },
    gallery: () => { return axios.get('http://localhost:4000/gallery') },
    testimonials: () => { return axios.get('http://localhost:4000/testimonials') },
    blogposts: () => { return axios.get('http://localhost:4000/blogposts') },
    comments: () => { return axios.get('http://localhost:4000/comments') },
    contactMessages: () => { return axios.get('http://localhost:4000/contact_messages') },
    newsletter: () => { return axios.get('http://localhost:4000/newsletters') },
    commentsByBlogId: (id) => { return axios.get(`http://localhost:4000/comments?blogpostId=${id}`) },
    idWithReservations: (id) => { return axios.get(`http://localhost:4000/users/${id}?embed=reservations`) },
    reservationsById: (id) => { return axios.get(`http://localhost:4000/reservations?userId=${id}`) },
    userById: (id, config) => { return axios.get(`http://localhost:4000/users/${id}`, { id }, { headers: { config }}) },
    blogpostComments: (id) => { return axios.get(`http://localhost:4000/users/${id}?embed=comments`) },
    blogpostById: (id) => { return axios.get(`http://localhost:4000/blogposts/${id}`) },
    blogpostByIdComments: (id) => { return axios.get(`http://localhost:4000/blogposts/${id}?embed=comments`) },
  },
  config:
  {
    headers:
    {
      'Authorization': `${process.env.TOKEN}`,
      'Content-Type': 'application/json'
    }
  }
}

module.exports = api
