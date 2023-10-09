import gsap from 'gsap'

import Page from 'classes/Page'

import img_0 from 'assets/bg/header_bg_1.jpg'
import img_1 from 'assets/bg/header_bg_2.jpg'

export default class Home extends Page
{
  constructor()
  {
    super({
      id: 'home',
      view: '.home',
      viewElements: {

      }
    })

    this.show()
  }

  create()
  {
    super.create()

    let header_bg = document.querySelector('img.home__header__bg__img')
    const bg_arr = [img_0, img_1]

    let random = Math.floor(Math.random() * 2)
    header_bg.src = bg_arr[random]

    this.createElements()
  }

  createElements()
  {
    this.welcome_overlays = document.querySelectorAll('.home__welcome__sections__section__overlay')
    this.w_icons = document.querySelectorAll('.home__welcome__sections__section__overlay__icon')
    this.w_t = document.querySelectorAll('.home__welcome__sections__section__overlay__title')
    this.w_d = document.querySelectorAll('.home__welcome__sections__section__overlay__desc')


    this.events = document.querySelectorAll('.home__events__cards__card')
    this.e_o = document.querySelectorAll('.home__events__cards__card__overlay')
    this.e_t = document.querySelectorAll('.home__events__cards__card__overlay__title')
    this.e_d = document.querySelectorAll('.home__events__cards__card__overlay__desc')
    this.e_b = document.querySelectorAll('.home__events__cards__card__overlay__button')

    this.createAnimations()
  }

  createAnimations()
  {
    this.welcome_overlays.forEach((o, i) =>
    {
      o.addEventListener('mouseenter', () =>
      {
        gsap.fromTo(
          [this.w_icons[i],
            this.w_t[i]],
          {
            scale: 0
          },
          {
            scale: 1,
            duration: 0.5,
          }
        )

        gsap.fromTo(
          this.w_d[i],
          {
            x: 100
          },
          {
            x: 0,
            duration: 0.5
          }
        )
      })
    })

    this.events.forEach((e, i) =>
    {
      e.addEventListener('mouseenter', () =>
      {
        gsap.fromTo(
          this.e_o[i],
          {
            y: 50,
          },
          {
            y: 0,
            duration: .5,
            ease: 'power2.inOut'
          }
        )

        gsap.fromTo(
          this.e_o[i],
          {
            opacity: 0.0,
          },
          {
            opacity: 1.0,
            duration: .5,
            ease: 'power2.inOut'
          }
        )
      })

      e.addEventListener('mouseleave', () =>
      {
        gsap.fromTo(
          this.e_o[i],
          {
            y: 0,
          },
          {
            y: 50,
            duration: .5,
            ease: 'power2.inOut'
          }
        )

        gsap.fromTo(
          this.e_o[i],
          {
            opacity: 1.0,
          },
          {
            opacity: 0.0,
            duration: .5,
            ease: 'power2.inOut'
          }
        )
      })
    })
  }

  show()
  {
    super.show()

    this.show_animation = gsap.timeline()

    this.show_animation.fromTo(
      '.home__header__titles__main',
      {
        rotateX: 90
      },
      {
        rotateX: 0,
        duration: 1.0,
      }, 'start'
    )

    this.show_animation.fromTo(
      ['.home__header__titles__text',
      '.home__header__titles__btm'],
      {
        y: -50,
        opacity: 0.0
      },
      {
        y: 0,
        opacity: 1.0,
        duration: 0.5
      }, 'end'
    )
  }

  hide()
  {
    super.hide()
  }
}
