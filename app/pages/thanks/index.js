import gsap from 'gsap'

import Page from 'classes/Page'

export default class Thanks extends Page
{
  constructor()
  {
    super({
      id: 'thanks',
      view: '.thanks',
      viewElements: {
        title: '.thanks__header__title__text'
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
