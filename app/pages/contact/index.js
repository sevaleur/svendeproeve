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
      email: false,
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
    this.input = {
      name: document.querySelector('input.name'),
      email: document.querySelector('input.mail'),
      message: document.querySelector('.contact__form__list__item__textarea')
    }

    this.button = document.querySelector('.contact__form__list__item__button')
    this.notice = document.querySelector('.contact__section__message__text')

    this.validateName()
    this.validateMail()
    this.validateMessage()
    this.submit()
  }

  validateName()
  {
    this.input.name.addEventListener('input', () =>
    {
      if(this.input.name.value.length > 1)
      {
        this.sender.name = this.input.name.value
        this.status.name = true
      }
      else
      {
        this.status.name = false
        gsap.to(this.input.name, { borderColor: '#ff0000', duration: 0.2 })
        this.input.name.placeholder = 'Please write your name'
        this.input.name.focus()
      }
    })
  }

  validateMail()
  {
    this.input.email.addEventListener('change', () =>
    {
      const status = this.checkMail(this.input.email.value)

      if(!status)
      {
        gsap.to(this.input.email, { borderColor: '#ff0000', duration: 0.2 })
        this.input.email.placeholder = 'Your email is required'
        this.input.email.focus()
        this.status.email = false
      }
      else
      {
        this.sender.mail = this.input.email.value
        this.status.email = true
      }
    })
  }

  validateMessage()
  {
    this.input.message.addEventListener("input", () =>
    {
      if(this.input.message.value.length > 10)
      {
        this.sender.message = this.input.message.value
        this.status.message = true
      }
      else
      {
        gsap.to(this.input.message, { borderColor: '#ff0000', duration: 0.2 })
        this.input.message.placeholder = 'Your message must be at least 10 characters long'
        this.input.message.focus()
        this.status.message = false
      }
    })
  }

  async submit()
  {
    this.url = 'http://localhost:4000/contact_messages'

    this.button.addEventListener('click', (e) =>
    {
      e.preventDefault()

      if(this.status.email && this.status.name && this.status.message)
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

        Promise.resolve(this.post.res)
          .then((res) =>
          {
            if(res.status === 201)
            {
              for(const [k, v] of Object.entries(this.input))
              {
                gsap.to(
                  v,
                  {
                    borderColor: '#53a653',
                    duration: 0.2
                  }
                )

                let up_k = k.charAt(0).toUpperCase() + k.slice(1)
                v.placeholder = `Your ${up_k}`
                v.value = ''
              }

              this.notice.innerHTML = `Your message is sent`
            }
            else
            {
              gsap.to([this.input.name, this.input.email, this.input.message], { borderColor: '#ff0000', duration: 0.2 })
              this.notice.innerHTML = `Something went wrong`
            }
          }
        )

      }
      else
      {
        for(const [k, v] of Object.entries(this.status))
        {
          !v
            ? (this.input[k].focus(), this.notice.innerHTML = `Please fill out the form`)
            : this.notice.innerHTML = `Something went wrong - Please try again`
        }
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
