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

    this.createSticky(template)
    this.navigate(template)
  }

  createSticky(template)
  {
    if(template === 'home')
    {
      this.element.classList.add('home')
      this.element.classList.remove('away')

      let pos = this.element.getBoundingClientRect().top

      window.addEventListener('scroll', () =>
      {
        let scroll = window.scrollY

        scroll > pos
          ? this.element.classList.add('sticky')
          : this.element.classList.remove('sticky')
      })
    }
    else
    {
      this.element.classList.add('away')
      this.element.classList.remove('home')

      gsap.to(
        this.element,
        {
          opacity: 1.0
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
