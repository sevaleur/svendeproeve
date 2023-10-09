import gsap from 'gsap'

import { COLOR_FAILURE, COLOR_SUCCESS } from '../utils/color_variables'

export default class Validation
{
  constructor({ ...input }, err, button, notice, view)
  {
    this.status = {}
    this.repeat = {}

    this.validateInput(input, view)
    this.checkStatus(input, err, button, notice)
  }

  validateInput(input, view)
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
              v.focus()
              this.status.email = false
              v.placeholder = 'Your email is required'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
            else
            {
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
              this.status.name = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              v.focus()
              this.status.name = false
              v.placeholder = 'Please write your name'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
          })
        break
        case 'password':
          v.addEventListener('input', () =>
          {
            let status = this.checkPassword(v.value)
            if(!status)
            {
              v.focus()
              this.status.password = false
              v.placeholder = 'Your password is required'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
            else
            {
              this.repeat.password = v.value
              this.status.password = true
              view === 'register'
                ? gsap.to(v, { borderColor: COLOR_SUCCESS, duration: 0.2 })
                : gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
          })
        break
        case 'repeat':
          v.addEventListener('input', () =>
          {
            const status = v.value === this.repeat.password
            if(!status)
            {
              v.focus()
              this.status.repeat = false
              v.placeholder = 'The passwords dont match'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
            else
            {
              this.status.repeat = true
              view === 'register'
                ? gsap.to(v, { borderColor: COLOR_SUCCESS, duration: 0.2 })
                : gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
          })
        break
        case 'message':
          v.addEventListener("input", () =>
          {
            if(v.value.length > 10)
            {
              this.status.message = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
              v.placeholder = 'Your message must be at least 10 characters long'
              v.focus()
              this.status.message = false
            }
          })
        break
        case 'table':
        {
          v.addEventListener('change', () =>
          {
            if(v.value > 0 && v.value < 16)
            {
              this.status.table = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              v.focus()
              v.value = ''
              this.status.table = false
              v.placeholder = 'Choose a valid table'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
          })
        }
        break
        case 'guests':
          v.addEventListener('input', () =>
          {
            if(v.value > 0 && v.value < 50)
            {
              this.status.guests = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              v.focus()
              v.value = ''
              this.status.guests = false
              v.placeholder = 'Nobody has that many friends'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
          })
        break
        case 'date':
          v.addEventListener('change', () =>
          {
            const status = this.checkDate(v.value)
            if(status)
            {
              this.status.date = true
              gsap.to(v, { borderColor: 'currentColor', duration: 0.2 })
            }
            else
            {
              v.focus()
              v.value = ''
              this.status.date = false
              v.placeholder = 'Please select a proper date'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
          })
        break
        case 'phone':
          v.addEventListener('input', () =>
          {
            console.log(this.status)
            let status = this.checkPhone(v.value)
            if(!status)
            {
              v.focus()
              this.status.phone = false
              v.placeholder = 'A valid contact number is required'
              gsap.to(v, { borderColor: COLOR_FAILURE, duration: 0.2 })
            }
            else
            {
              this.status.phone = true
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

  checkPhone(phone)
  {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
  }

  checkDate(date)
  {
    const d = new Date()
    const req_date = new Date(date)

    return req_date >= d
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
    console.log(this.status)
    button.addEventListener('click', (e) =>
    {
      if(!this.ready)
      {
        e.preventDefault()

        for(const [k, v] of Object.entries(this.status))
        {
          !v
            ? (input[k].focus(),
                gsap.to(
                  input[k],
                  {
                    borderColor: '#ff0000',
                    duration: 0.2
                  }
                ),
              notice.innerHTML = `Please fill out your ${k}`)
            : notice.innerHTML = `${err}`
        }
      }
    })
  }
}
