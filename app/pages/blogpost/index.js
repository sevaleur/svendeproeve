import Page from 'classes/Page'

export default class BlogPost extends Page
{
  constructor()
  {
    super({
      id: 'blogpost',
      view: '.blogPost',
      viewElements: {

      }
    })
  }

  create()
  {
    super.create()

    this.form = document.querySelector('form')

    if(this.form)
    {
      this.input = {
        name: document.querySelector('input.blogpost__name'),
        email: document.querySelector('input.blogpost__email'),
        message: document.querySelector('textarea.blogpost__comment'),
      }

      this.button = document.querySelector('button.blogpost__button')
    }
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
