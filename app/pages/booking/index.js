import Page from 'classes/Page'

export default class Booking extends Page
{
  constructor()
  {
    super({
      id: 'booking',
      view: '.booking',
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
        name: document.querySelector('input.booking__name'),
        email: document.querySelector('input.booking__email'),
        table: document.querySelector('input.booking__table'),
        guests: document.querySelector('input.booking__guests'),
        date: document.querySelector('input.booking__date'),
        phone: document.querySelector('input.booking__phone'),
        message: document.querySelector('textarea.booking__comment'),
      }

      this.button = document.querySelector('button.booking__button')
      this.tables = document.querySelectorAll('.booking__section__auth__tables__table')

      const select = 'table__select'
      const hover = 'table__hover'

      this.createTables(select, hover)
      this.getReservations()
    }
  }

  createTables(s, h)
  {
    this.tables.forEach((t, i) =>
    {
      t.classList.add(h)

      if(t.classList.contains(s))
        this.f = t

      t.addEventListener('click', (e) =>
      {
        if(this.f === undefined)
        {
          t.classList.add(s)
          t.classList.remove(h)

          this.f = t

          this.input.table.value = t.dataset.id
        }
        else
        {
          if(this.f != t)
          {
            this.f.classList.remove(s)
            this.f.classList.add(h)

            t.classList.add(s)
            t.classList.remove(h)

            this.f = t

            this.input.table.value = t.dataset.id
          }
        }
      })
    })
  }

  getReservations()
  {

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
