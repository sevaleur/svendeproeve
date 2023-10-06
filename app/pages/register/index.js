import gsap from 'gsap'

import Page from 'classes/Page'

export default class Register extends Page
{
  constructor()
  {
    super({
      id: 'register',
      view: '.register',
      viewElements: {

      }
    })

    this.form = true
  }

  create()
  {
    super.create()

    this.createElements()
  }

  createElements()
  {
    this.err = 'An error occured'

    this.input = {
      name: document.querySelector('input.register__name'),
      email: document.querySelector('input.register__email'),
      password: document.querySelector('input.register__password'),
      repeat: document.querySelector('input.register__password__repeat')
    }

    this.button = document.querySelector('button.register__button')
    this.notice = document.querySelector('.register__section__titles__sub')
    this.help = document.querySelector('.help')

    this.createPassword()
  }

  createPassword()
  {
    this.input.password.onfocus = () =>
    {
      gsap.fromTo(
        this.help,
        {
          opacity: 0.0
        },
        {
          opacity: 1.0
        }
      )
    }

    this.input.password.onblur = () =>
    {
      gsap.fromTo(
        this.help,
        {
          opacity: 1.0
        },
        {
          opacity: 0.0
        }
      )
    }
  }

  show()
  {
    super.show()
  }

  hide()
  {
    super.hide()

    this.input.password.onfocus = null
  }
}
