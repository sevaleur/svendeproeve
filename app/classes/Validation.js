import gsap from 'gsap'

import Post from './Post'

export default class Validation
{
  constructor(url, { ...input }, res, err, button, notice, date = false)
  {
    this.status = {}
    this.data = {}

    this.validateInput(input)
    this.submit(url, input, date, res, err, button, notice)
  }

  validateInput(input)
  {
    for(const [k, v] of Object.entries(input))
    {
      this.status[k] = false
      switch(k)
      {
        case 'email':
          v.addEventListener('change', () =>
          {
            const status = this.checkMail(v.value)
            if(!status)
            {
              gsap.to(v, { borderColor: '#ff0000', duration: 0.2 })
              v.placeholder = 'Your email is required'
              v.focus()
              this.status.email = false
            }
            else
            {
              this.data.email = v.value
              this.status.email = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
          })
        break
        case 'name':
          v.addEventListener('input', () =>
          {
            if(v.value.length > 1)
            {
              this.data.name = v.value
              this.status.name = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              this.status.name = false
              gsap.to(v, { borderColor: '#ff0000', duration: 0.2 })
              v.placeholder = 'Please write your name'
              v.focus()
            }
          })
        break
        case 'password':
        break
        case 'message':
          v.addEventListener("input", () =>
          {
            console.log(this.status)
            if(v.value.length > 10)
            {
              this.data.message = v.value
              this.status.message = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              gsap.to(v, { borderColor: '#ff0000', duration: 0.2 })
              v.placeholder = 'Your message must be at least 10 characters long'
              v.focus()
              this.status.message = false
            }
          })
        break
        default:
        break
      }
    }
  }

  checkMail(email)
  {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  checkPassword(password)
  {

  }

  submit(url, input, date, res, err, button, notice)
  {
    button.addEventListener('click', (e) =>
    {
      e.preventDefault()

      let valid = 0
      const toValidate = Object.keys(this.status).length

      if(date) this.data[date] = new Date().toJSON()

      for(const v of Object.values(this.status))
      {
        v ? valid++ : this.submitError(input, notice, err)
      }

      if(valid === toValidate)
      {
        this.post = new Post(
          url,
          {
            ...this.data
          }
        )

        Promise.resolve(this.post.res)
          .then((resolve) =>
          {
            if(resolve.status === 201)
            {
              for(const [k, v] of Object.entries(input))
              {
                let uppercase_key = k.charAt(0).toUpperCase() + k.slice(1)

                v.placeholder = `Your ${uppercase_key}`
                v.value = ''
              }

              notice.innerHTML = `${res}`
            }
            else
            {
              for(const k of Object.keys(input))
              {
                gsap.to(
                  k,
                  {
                    borderColor: '#ff0000',
                    duration: 0.2
                  }
                )
              }
              notice.innerHTML = `${err}`
            }
          }
        )
      }
      else
      {
        this.submitError(input, notice, err)
      }
    })
  }

  submitError(input, notice, err)
  {
    for(const [k, v] of Object.entries(this.status))
    {
      !v
        ? (input[k].focus(), notice.innerHTML = `Please fill out your ${k}`)
        : notice.innerHTML = `${err}`
    }
  }
}
