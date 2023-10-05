import gsap from 'gsap'

import Page from 'classes/Page'
import Validation from 'classes/Validation'


export default class Login extends Page
{
  constructor()
  {
    super({
      id: 'register',
      view: '.register',
      viewElements: {

      }
    })
  }

  create()
  {
    super.create()

    this.createElements()
  }

  createElements()
  {
    this.input = {
      name: document.querySelector('input.register__name'),
      email: document.querySelector('input.register__email'),
      password: document.querySelector('input.register__password'),
      repeat: document.querySelector('input.register__password__repeat')
    }

    this.button = document.querySelector('input.register__button')
    this.notice = document.querySelector('.register__section__titles__sub')
    this.help = document.querySelector('.help')

    this.createPassword()
    this.validateInput()
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

  validateInput()
  {
    this.validate = new Validation(
      'http://localhost:4000/register',
      { ...this.input },
      `Welcome to the club`,
      'An error occured',
      this.button,
      this.notice,
      'register'
    )
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
