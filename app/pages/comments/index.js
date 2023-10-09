import gsap from 'gsap'

import Page from 'classes/Page'

export default class Comments extends Page
{
  constructor()
  {
    super({
      id: 'comments',
      view: '.comments',
      viewElements: {
        title: '.comments__header__title__text'
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
