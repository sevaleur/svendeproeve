import gsap from 'gsap'

import Page from 'classes/Page'

export default class E extends Page
{
  constructor()
  {
    super({
      id: 'error',
      view: '.error',
      viewElements: {
        title: '.error__header__title__text'
      }
    })
  }

  create()
  {
    super.create()
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
