import Splitting from 'splitting'
import gsap from 'gsap'

export default class Show
{
  constructor(element)
  {
    this.element = element

    Splitting({
      target: this.element,
      by: 'chars'
    })
  }

  init()
  {
    console.log(this.element)
    this.chars = this.element.querySelectorAll('.char')

    this.animate_in()
  }

  reset()
  {
    this.animate_out()
  }

  animate_in()
  {
    gsap.set(this.chars,
    {
      'will-change': 'opacity, transform',
      opacity: 0,
      y: '-120%',
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%'
    })

    gsap.to(this.chars,
    {
      duration: 1,
      ease: 'back.inOut(2)',

      opacity: 1,
      y: '0%',
      scaleY: 1,
      scaleX: 1,
      stagger: 0.03,
    })

    gsap.to(this.elements,
    {
      duration: 1,
      opacity: 1,
    })
  }

  animate_out()
  {
    gsap.to(this.chars,
    {
      duration: 1,
      ease: 'back.inOut(2)',

      opacity: 0,
      y: '-120%',
      scaleY: 0,
      scaleX: 0,
      stagger: 0.03,
    })
  }
}
