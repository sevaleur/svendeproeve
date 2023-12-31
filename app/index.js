import Navigation from 'components/Navigation'

import Home from 'pages/home'
import Blog from 'pages/blog'
import BlogPost from 'pages/blogPost'
import Booking from 'pages/booking'
import Contact from 'pages/contact'
import Login from 'pages/login'
import Register from 'pages/register'
import User from 'pages/user'
import Comments from 'pages/comments'
import Reservations from 'pages/reservations'
import Reserved from 'pages/reserved'
import Thanks from 'pages/thanks'
import E from 'pages/e'

import Validation from 'classes/Validation'

export default class App
{
  constructor()
  {
    this.createContent()
    this.createNavigation()
    this.createPages()
    this.createValidation()

    this.disableScroll()

    this.addEventListeners()
    this.addLinkListeners()
  }

  /*
    CREATE.
  */

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createNavigation()
  {
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createPages()
  {
    this.pages = {
      home: new Home(),
      blog: new Blog(),
      blogpost: new BlogPost(),
      booking: new Booking(),
      contact: new Contact(),
      login: new Login(),
      register: new Register(),
      user: new User(),
      comments: new Comments(),
      reservations: new Reservations(),
      reserved: new Reserved(),
      thanks: new Thanks(),
      error: new E()
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  createValidation()
  {
    if(this.page.form)
    {
      this.validate = new Validation(
        this.page.input,
        this.page.err,
        this.page.button,
        this.page.notice,
        this.page.id
      )
    }
  }

  /*
    EVENTS.
  */

  async onChange({ url, push = true })
  {
    await this.page.hide()

    document.body.scrollTo(0, 0)

    const req = await window.fetch(url)

    if(req.status === 200)
    {
      const html = await req.text()
      const div = document.createElement('div')

      if(push)
        window.history.pushState({}, '', url)

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()

      this.createValidation()

      this.navigation.createNavLocation(this.template)
      this.navigation.navigate(this.template)

      this.page.show()

      this.addLinkListeners()
    }
    else
    {
      console.log('error')

      // HANDLE ERROR
    }
  }

  onPopState()
  {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  disableScroll()
  {
    if('scrollRestoration' in history)
    {
      history.scrollRestoration = 'manual'
    }
  }

  addEventListeners()
  {
    window.addEventListener('popstate', this.onPopState.bind(this))

    if(this.page.addEventListeners)
      this.page.addEventListeners()
  }

  addLinkListeners()
  {
    const links = document.querySelectorAll('a')

    links.forEach(link =>
    {
      link.onclick = event =>
      {
        event.preventDefault()

        const { href } = link
        this.onChange({ url: href })
      }
    })
  }
}

new App()
