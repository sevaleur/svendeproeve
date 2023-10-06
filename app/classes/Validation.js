import gsap from 'gsap'

export default class Validation
{
  constructor({ ...input }, err, button, notice)
  {
    this.status = {}
    this.data = {}

    this.validateInput(input)
    this.checkStatus(input, err, button, notice)
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
          v.addEventListener('input', () =>
          {
            console.log(this.status)
            let status = this.checkPassword(v.value)
            if(!status)
            {
              gsap.to(v, { borderColor: '#ff0000', duration: 0.2 })
              v.placeholder = 'Your password is required'
              v.focus()
              this.status.password = false
            }
            else
            {
              this.data.password = v.value
              this.status.password = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
          })
        break
        case 'message':
          v.addEventListener("input", () =>
          {
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
        case 'repeat':
          v.addEventListener('input', () =>
          {
            const status = v.value === this.data.password
            if(!status)
            {
              gsap.to(v, { borderColor: '#ff0000', duration: 0.2 })
              v.placeholder = 'The passwords dont match'
              v.focus()
              this.status.repeat = false
            }
            else
            {
              this.status.repeat = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
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
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)
  }

  checkPassword(password)
  {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)
  }

  checkStatus(input, err, button, notice)
  {
    let valid = 0
    this.ready = false

    const toValidate = Object.keys(this.status).length

    for(const v of Object.values(input))
    {
      v.addEventListener('input', () =>
      {
        for(const[k, v] of Object.entries(this.status))
        {
          if(v) valid++

          if(valid === toValidate)
            this.ready = true
        }
      })
    }

    this.submit(input, err, button, notice)
  }

  submit(input, err, button, notice)
  {
    button.addEventListener('click', (e) =>
    {
      if(!this.ready)
      {
        e.preventDefault()

        for(const [k, v] of Object.entries(this.status))
        {
          !v
            ? (input[k].focus(), gsap.to(input[k], { borderColor: '#ff0000', duration: 0.2 }), notice.innerHTML = `Please fill out your ${k}`)
            : notice.innerHTML = `${err}`
        }
      }
    })
  }
}
