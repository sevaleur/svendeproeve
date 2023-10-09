import Page from 'classes/Page'

export default class Blog extends Page
{
  constructor()
  {
    super({
      id: 'blog',
      view: '.blog',
      viewElements: {

      }
    })
  }

  create()
  {
    super.create()

    this.posts = document.querySelectorAll('.blog__section__post')
    this.posts.forEach(post => { if(post.dataset.id % 2) post.classList.add('left') })
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
