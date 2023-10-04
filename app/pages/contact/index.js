import gsap from 'gsap'

import Page from 'classes/Page'
import Post from 'classes/Post'

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

    this.status = {
      name: false,
      mail: false,
      message: false
    }

    this.sender = {}
  }

  create()
  {
    super.create()

    this.createElements()
  }

  createElements()
  {
    this.name = document.querySelector('input.name')
    this.mail = document.querySelector('input.mail')
    this.message = document.querySelector('.contact__form__list__item__textarea')
    this.button = document.querySelector('.contact__form__list__item__button')

    this.validateName()
    this.validateMail()
    this.validateMessage()
    this.submit()
  }

  validateName()
  {
    this.name.addEventListener('input', () =>
    {
      const value = this.name.value.trim()

      if(value)
      {
        this.sender.name = this.name.value
        this.status.name = true
      }
      else
      {
        //HANDLE ERROREROROROR
      }
    })
  }

  validateMail()
  {
    this.mail.addEventListener('change', () =>
    {
      const status = this.checkMail(this.mail.value)

      if(!status)
      {
        //HANDLE ERROREROROROR
      }
      else
      {
        this.sender.mail = this.mail.value
        this.status.mail = true
      }

    })
  }

  validateMessage()
  {
    this.message.addEventListener("input", () =>
    {
      const value = this.message.value.trim()

      if(value)
      {
        this.sender.message = this.message.value
        this.status.message = true
      }
      else
      {
        //HANDLE ERROREROROROR
      }
    })
  }

  submit()
  {
    this.url = 'http://localhost:4000/contact_messages'

    this.button.addEventListener('click', (e) =>
    {
      e.preventDefault()

      if(this.status.mail && this.status.name && this.status.message)
      {
        this.post = new Post(
          this.url,
          {
            name: this.sender.name,
            mail: this.sender.mail,
            message: this.sender.message,
            date: new Date().toJSON()
          }
        )

        // ANIMATE SUCCESS
      }
      else
      {
        //HANDLE ERRROROROROROR
      }
    })
  }

  checkMail(email)
  {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
