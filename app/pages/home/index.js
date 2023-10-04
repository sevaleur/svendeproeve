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
        overlays: document.querySelectorAll('.home__welcome__sections__section__overlay'),
        icons: document.querySelectorAll('.home__welcome__sections__section__overlay__icon'),
        titles: document.querySelectorAll('.home__welcome__sections__section__overlay__title'),
        descs: document.querySelectorAll('.home__welcome__sections__section__overlay__desc'),
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
    this.createAnimations()
  }

  createAnimations()
  {
    this.viewElements.overlays.forEach((o, i) =>
    {
      o.addEventListener('mouseenter', () =>
      {
        gsap.fromTo(
          [this.viewElements.icons[i],
            this.viewElements.titles[i]],
          {
            scale: 0
          },
          {
            scale: 1,
            duration: 0.5,
          }
        )

        gsap.fromTo(
          this.viewElements.descs[i],
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
