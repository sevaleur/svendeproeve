import gsap from 'gsap'

import Page from 'classes/Page'
import Validation from 'classes/Validation'

export default class Contact extends Page
{
  constructor()
  {
    super({
      id: 'contact',
      view: '.contact',
      viewElements: {
        title: '.contact__header__title__text'
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
      name: document.querySelector('input.contact__name'),
      email: document.querySelector('input.contact__mail'),
      message: document.querySelector('textarea.contact__textarea')
    }

    this.button = document.querySelector('.contact__button')
    this.notice = document.querySelector('.contact__section__message__text')

    this.validateInput()
  }

  validateInput()
  {
    this.validate = new Validation(
      'http://localhost:4000/contact_messages',
      { ...this.input },
      'Your message was sent',
      'An error ocurred',
      this.button,
      this.notice,
      date,
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
