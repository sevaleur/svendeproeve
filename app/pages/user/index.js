import gsap from 'gsap'

import Page from 'classes/Page'

export default class User extends Page
{
  constructor()
  {
    super({
      id: 'user',
      view: '.user',
      viewElements: {
        title: '.user__header__title__text'
      }
    })
  }

  create()
  {
    super.create()

    this.selections = document.querySelectorAll('.user__section__selection__container')
    this.count = document.querySelectorAll('.user__section__selection__overlay__count')
    this.cat = document.querySelectorAll('.user__section__selection__overlay__title')
    this.images = document.querySelectorAll('.user__section__selection__image')

    this.onHover()
  }

  onHover()
  {
    this.selections.forEach((s, i) =>
    {
      s.addEventListener('mouseenter', () =>
      {
        gsap.fromTo(
          this.count[i],
          {
            x: -50,
            opacity: 0.0,
            scale: 0.2
          },
          {
            x: 0,
            scale: 1.0,
            opacity: 1.0,
            duration: 0.5,
            ease: 'power2.inOut'
          }
        )

        gsap.fromTo(
          this.cat[i],
          {
            x: 50,
            opacity: 0.0,
            scale: 0.2,
          },
          {
            x: 0,
            scale: 1.0,
            opacity: 1.0,
            duration: 0.5,
            ease: 'power2.inOut'
          }
        )

        gsap.fromTo(
          this.images[i],
          {
            opacity: 0.5,
            scale: 0.9,
          },
          {
            opacity: 1.0,
            duration: 0.5,
            scale: 1.0,
            ease: 'power2.inOut'
          }
        )
      })

      s.addEventListener('mouseleave', () =>
      {
        gsap.fromTo(
          this.images[i],
          {
            opacity: 1.0,
            scale: 1.0,
          },
          {
            opacity: 0.5,
            scale: 0.9,
            duration: 0.5,
            ease: 'power2.inOut'
          }
        )
      })
    })
  }

  show()
  {
    super.show()
  }

  hide()
  {
    super.hide()
  }
}
