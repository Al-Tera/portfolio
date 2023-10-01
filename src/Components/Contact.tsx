import { useRef, useEffect, useState, Dispatch } from 'react'
import { fadeIn, fadeOut } from '../common/helpers'
import { contacts, options } from '../common/constants';
import { SvgComp } from './SvgComp';

interface Props {
  setSectObserve: Dispatch<number>;
}

function Contact({ setSectObserve }: Props) {

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      setSectObserve(3)
    }
    else {
      fadeOut(sectionRef.current)
    }
  }, [isVisible])


  const handleMailTo = () => {
    window.location.href = 'mailto:lake.horta@gmail.com';
  };

  return (
    <section ref={sectionRef} className='contact'>
      <div className='fixed__div'>
        <h1>
          Contact Me
        </h1>
        <div>
          <p className='text__email' onClick={handleMailTo}>lake.horta@gmail.com</p>
          <div className='socials__container'>
            {
              contacts.map(contact => {
                return (
                  <div>
                    <a href={contact.link} target='_blank' rel="noopener noreferrer" ></a>
                    <SvgComp d={contact.path} color={contact.color} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact