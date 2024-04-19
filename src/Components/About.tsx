import { useRef, useEffect, useState, Dispatch } from 'react'
import { fadeIn, fadeOut } from '../common/helpers'
import { options } from '../common/constants';

interface Props {
  setSectObserve: Dispatch<number>;
}

function About({ setSectObserve }: Props) {

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
      setSectObserve(1)
    }
    else {
      fadeOut(sectionRef.current)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="about" >
      <div className='fixed__div'>
        <h1>About</h1>
        <p>I'm a Frontend Web Developer working mainly with Typescript and React Framework.</p>
        <p>Well-versed in translating design mockups into meticulously crafted interfaces, I specialize in creating visually appealing web applications. With a keen eye for detail and a passion for user-centric design.<br />I can bring any 2D design to life in web-form.
          <span className='text__dwarf'> So long as it doesn't mend space and time...</span>
        </p>
        <p className='title'>Tech Stack:</p>
        <p>Svelte, React, Angular, Vue, Typescript, Javascript, Firebase, Three.js, SCSS, Tailwind,&nbsp;HTML/CSS</p>
      </div>
    </section>
  )
}

export default About