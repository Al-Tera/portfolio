import { useRef, useEffect, useState, Dispatch } from 'react'
import { arrowClose, arrowOpen, fadeIn, fadeInUnselect, fadeOut, fadeOutUnselect } from '../common/helpers'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import gsap from 'gsap'
import { SvgComp, SvgCompBig } from './SvgComp'
import iconR3F from '../assets/threejs.svg'
import { options, projects } from '../common/constants'
gsap.registerPlugin(CSSRulePlugin)


interface Props {
  setSectObserve: Dispatch<number>;
}

function Projects({ setSectObserve }: Props) {

  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (sectionRef.current) {

      const observer = new IntersectionObserver((entries) => {
        const e = entries[0]
        setIsVisible(e.isIntersecting)
      }, options)
      observer.observe(sectionRef.current)
    }
  }, [sectionRef])

  useEffect(() => {
    if (isVisible) {
      fadeIn(sectionRef.current)
      setSectObserve(2)
    }
    else {
      fadeOut(sectionRef.current)

    }
  }, [isVisible])


  const handleProjectScroll = () => {
    const rightBtn = document.querySelector('.right__btn')
    const leftBtn = document.querySelector('.left__btn')
    const btnParent = document.querySelectorAll('.scroll__btn__container')

    const ld =
      CSSRulePlugin.getRule('.projector::before')
    const rd = CSSRulePlugin.getRule('.projector::after')
    const scroller: any = scrollRef.current
    const width = Math.abs((scroller.scrollWidth - scroller.clientWidth) - 10)
    const scrollAmount = scroller.scrollLeft
    if (scrollAmount < 10) {
      fadeOutUnselect(ld)
      arrowClose(btnParent[0], leftBtn, 'l')
    }
    else if (scrollAmount > width) {
      fadeOutUnselect(rd)
      arrowClose(btnParent[1], rightBtn, 'r')
    }
    else {
      arrowOpen(btnParent[1], rightBtn, 'r')
      arrowOpen(btnParent[0], leftBtn, 'l')
      fadeInUnselect(ld)
      fadeInUnselect(rd)

    }
  }

  const handleClickLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      })
    }
  }
  const handleClickRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      })
    }
  }

  const mouseMove = (e: any) => {
    const scroller = document.querySelector('.container_a')
    if (isDragging && scroller) {
      scroller.scrollLeft -= e.movementX
    }
  }

  const handleMouseDown = (e: any) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleMouseUp = (e: any) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const projectRef = useRef<any>([])

  const createElement = (element: HTMLDivElement, proj: any) => {
    const newElement = document.createElement('a')
    newElement.innerText = proj.title
    newElement.setAttribute('href', proj.link)
    newElement.setAttribute('target', '_blank')
    newElement.setAttribute('rel', 'noopener noreferrer')
    newElement.setAttribute('data-title', proj.title)
    newElement.classList.add('title', 'extra')
    element.prepend(newElement)
  }


  const glitchRepeater = (element: HTMLParagraphElement, value: string[], dir: string) => {
    const length = 3
    var a = 0
    const interval = setInterval(() => {
      const rdm = '_'
      var before;
      if (a >= length) {
        clearInterval(interval)
        before = value[0] + value[1]
      }
      else {
        if (dir === 'left')
          before = value[0].slice(0, value[0].length) + rdm + value[1]
        else
          before = value[0].slice(0, value[0].length) + value[1] + rdm

      }
      element.innerText = before
      a++
    }, 20)

  }

  const glitch = (fromText: string, toText: string, parent: HTMLDivElement, proj: any) => {

    const title = fromText.replace(' ', '-').toLocaleLowerCase()
    const beforeTitle = toText.slice(0, toText.indexOf(title))
    const afterTitle = toText.replace(`${beforeTitle}${title}`, '')

    createElement(parent, proj)
    const element: HTMLParagraphElement | null = parent.querySelector('.extra')
    var a = 0;
    var b = 0;

    const lengthFullLink = beforeTitle.length + afterTitle.length + 1

    if (element) {
      const interval = setInterval(function () {
        const convertTo = [beforeTitle.slice(0, a), title]
        if (a >= lengthFullLink) clearInterval(interval);
        else if (a <= beforeTitle.length) {
          glitchRepeater(element, convertTo, 'left')
        }
        else if (a > beforeTitle.length && a <= lengthFullLink) {
          const convertToAfter = [beforeTitle + title, afterTitle.slice(0, b)]
          glitchRepeater(element, convertToAfter, 'right')
          b++
        }
        else {
          element.innerText = beforeTitle + title + afterTitle
        }
        a++;
      }, 60);
    }
  }

  const handleProjectClick = (i: number, proj: any) => {
    projectRef.current.map((cur: HTMLDivElement, j: number) => {
      const title: any = cur.querySelector('.description__container .original')
      const extra: HTMLParagraphElement | null = cur.querySelector('.description__container .extra')
      const parent: any = cur.querySelector('.description__container')
      const getTitle: any = title.getAttribute('data-title')
      const getLink: any = title.href
      const description = cur.querySelector('.description__container')
      const bDesign = description?.querySelector('.bottom__design')

      if (i === j) {
        if (!description?.classList.contains('active__description')) {
          description?.classList.add('active__description')
          title.classList.add('hide')
          glitch(getTitle, getLink, parent, proj)
          gsap.to(description, .5, {
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            ease: "power4.out",
            onUpdate: function () {
              if (this.progress() >= .0 && bDesign) {

                gsap.to(bDesign, .5, {
                  background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
                  ease: "power4.out",
                })
              }
            }

          })
        }
      }
      else {
        description?.classList.remove('active__description')
        title.classList.remove('hide')
        if (extra?.parentNode === parent)
          parent.removeChild(extra)
        title.innerText = title.getAttribute('data-title')
        gsap.to(description, .5, {
          height: '50%',
          background: 'white',
          color: 'black',
          ease: "power4.out",
          onUpdate: function () {
            if (this.progress() >= .0 && bDesign) {

              gsap.to(bDesign, .5, {
                background: 'linear-gradient(to top, rgb(0, 0, 0, 0), rgba(0, 0, 0, 0))',
                ease: "power4.out",
              })
            }
          }
        })
      }
    })
  }


  return (
    <section onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onMouseMove={mouseMove} ref={sectionRef} className="project">
      <div className='fixed__div'>

        <h1>Projects</h1>
        <div className='projector'>
          <div ref={scrollRef} className={`${isDragging && 'dragging'}  container_a`} onScroll={handleProjectScroll}>

            {
              projects.map((proj, i) => {
                return (
                  <div
                    ref={ref => projectRef.current[i] = ref}

                    onClick={() => handleProjectClick(i, proj)} key={i} className={`project__container`}>
                    <div className='image__container'>
                      <img src={proj.image} alt={proj.alt} />
                    </div>
                    <div className='description__container'>
                      <span className='bottom__design' />
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className='title original' data-title={proj.title}>{proj.title}</a>
                      <p>{proj.description}</p>
                      <div className='stack__list'>
                        {
                          proj.stack.map((s, j) => {
                            return (
                              <div className='svgcont_test' title={s.name} key={j}>
                                {
                                  s.name === 'React Three Fiber' ?
                                    <img src={iconR3F} className='special__img' /> :

                                    s.small ?
                                      <SvgComp d={s.path} color={s.color} />
                                      : <SvgCompBig d={s.path} color={s.color} />
                                }
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>)
              })
            }
          </div>

          <div onClick={handleClickLeft} className='scroll__btn__container left'>
            <span className='left__btn' />
          </div>
          <div onClick={handleClickRight} className='scroll__btn__container right'>
            <span className='right__btn' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects