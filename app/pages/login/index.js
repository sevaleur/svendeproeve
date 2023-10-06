import gsap from 'gsap'

import Page from 'classes/Page'

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

    this.form = true
  }

  create()
  {
    super.create()

    this.createElements()
  }

  createElements()
  {
    this.err = 'Incorrect email or password'

    this.input = {
      email: document.querySelector('input.login__email'),
      password: document.querySelector('input.login__password')
    }

    this.button = document.querySelector('button.login__button')
    this.notice = document.querySelector('.login__section__titles__sub')
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
