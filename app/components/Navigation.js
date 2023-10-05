import Component from 'classes/Component'

import gsap from 'gsap'

export default class Navigation extends Component
{
  constructor({ template })
  {
    super({
      element: '.nav',
      elements:
      {
        nav_links: document.querySelectorAll('.nav__links__item__link')
      }
    })

    this.createNavLocation(template)
    this.navigate(template)
  }

  createNavLocation(template)
  {
    if(template === 'home')
    {
      const bounds = this.element.getBoundingClientRect()

      const initial_location = (window.innerHeight - bounds.height) - window.scrollY

      gsap.to(
        this.element,
        {
          top: `${initial_location}px`
        }
      )

      window.onscroll = () =>
      {
        this.location = (window.innerHeight - bounds.height) - window.scrollY
        this.scroll = (window.scrollY + bounds.height) - window.innerHeight

        this.scroll > this.location
          ? this.element.style.top = 0
          : this.element.style.top = `${this.location}px`
      }
    }
    else
    {
      window.onscroll = null
      window.scrollTo(0, 0)

      gsap.to(
        this.element,
        {
          top: 0
        }
      )
    }
  }

  navigate(template)
  {
    this.elements.nav_links.forEach(link =>
    {
      if(link.classList.contains('active'))
        this.former = link

      link.dataset.path === template
      ? (link.classList.add('active'), link.classList.remove('link'))
      : (link.classList.add('link'), link.classList.remove('active'))

      link.addEventListener('click', (e) =>
      {
        if(this.former != e.target)
        {
          this.former.classList.remove('active')
          this.former.classList.add('link')

          e.target.classList.add('active')
          e.target.classList.remove('link')

          this.former = e.target
        }
      })
    })
  }

  show()
  {

  }

  hide()
  {

  }
}
