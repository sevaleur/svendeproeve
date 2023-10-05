import gsap from 'gsap'

import Page from 'classes/Page'
import Validation from 'classes/Validation'


export default class Login extends Page
{
  constructor()
  {
    super({
      id: 'login',
      view: '.login',
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
      email: document.querySelector('input.login__email'),
      password: document.querySelector('input.login__password')
    }

    this.button = document.querySelector('input.login__button')
    this.notice = document.querySelector('.login__section__titles__sub')

    this.validateInput()
  }

  validateInput()
  {
    this.validate = new Validation(
      'http://localhost:4000/login',
      { ...this.input },
      'Login succesful',
      'Incorrect email or password',
      this.button,
      this.notice,
      'login'
    )
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
