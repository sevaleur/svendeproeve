import Navigation from 'components/Navigation'

import Home from 'pages/home'
import Blog from 'pages/blog'
import Contact from 'pages/contact'
import Login from 'pages/login'
import Register from 'pages/register'

export default class App
{
  constructor()
  {
    this.createContent()
    this.createNavigation()
    this.createPages()

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
      contact: new Contact(),
      login: new Login(),
      register: new Register()
    }

    this.page = this.pages[this.template]
    this.page.create()
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
