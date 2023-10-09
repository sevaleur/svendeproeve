import gsap from 'gsap'

import Page from 'classes/Page'

export default class Reservations extends Page
{
  constructor()
  {
    super({
      id: 'reservations',
      view: '.reservations',
      viewElements: {
        title: '.reservations__header__title__text'
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
