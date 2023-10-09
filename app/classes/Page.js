import gsap from 'gsap'

import each from 'lodash/each'
import map from 'lodash/map'

import AsyncLoad from 'classes/AsyncLoad'

export default class Page
{
  constructor({ id, view, viewElements })
  {
    this.id = id
    this.view = view
    this.viewElements = {
      ...viewElements,
      images: 'img'
    }
  }

  create()
  {
    this.element = document.querySelector(this.view)
    this.elements = {}

    each(this.viewElements, (entry, key) =>
    {
      if(entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))
      {
        this.elements[key] = entry
      }
      else
      {
        this.elements[key] = document.querySelectorAll(entry)

        if(this.elements[key].length === 0)
        {
          this.elements[key] = null
        }
        else if(this.elements[key].length === 1)
        {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })

    this.preloadImages()
  }

  preloadImages()
  {
    this.images = map(this.elements.images, element =>
    {
      return new AsyncLoad({ element })
    })
  }

  show()
  {
    return new Promise(resolve =>
    {
      this.animateIn = gsap.timeline()

      this.animateIn.fromTo(this.view,
      {
        opacity: 0
      },
      {
        opacity: 1,
        onComplete: resolve
      })

      this.animateIn.call(_ =>
      {
        this.addEventListeners()

        resolve()
      })
    })
  }

  hide()
  {
    return new Promise(resolve =>
    {
      this.removeEventListeners()

      this.animateOut = gsap.timeline()

      this.animateOut.to(this.view,
      {
        opacity: 0,
        onComplete: resolve
      })
    })
  }

  addEventListeners()
  {

  }

  removeEventListeners()
  {

  }
}
