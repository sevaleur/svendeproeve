import gsap from 'gsap'

import Page from 'classes/Page'

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

    this.form = true
  }

  create()
  {
    super.create()

    this.createElements()
  }

  createElements()
  {
    this.err = 'An error ocurred'

    this.input = {
      name: document.querySelector('input.contact__name'),
      email: document.querySelector('input.contact__mail'),
      message: document.querySelector('textarea.contact__textarea')
    }

    this.button = document.querySelector('button.contact__button')
    this.notice = document.querySelector('.contact__section__message__text')
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
