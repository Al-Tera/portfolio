import './App.scss'
import { useEffect, useState, useRef } from 'react'
import About from './Components/About'
import Contact from './Components/Contact'
import Home from './Components/Home'
import Projects from './Components/Projects'
import Sidebar from './Components/Sidebar'
import { fromDown, fromUp, moveCenter } from './common/helpers'

function App() {

  const [pastObserve, setPastObserve] = useState(0)

  useEffect(() => {
    const section = document.querySelectorAll('section')
    const observer:HTMLSpanElement | null = document.querySelector('.outer-mote')
    observer?.classList.add('reset__rotation')
    observer?.classList.remove('reset__rotation')

    section.forEach((sect, i) => {
      const fixedEl = sect.querySelector('.fixed__div')
      if (i === pastObserve) {
        moveCenter(fixedEl)
      }
      else if (i > pastObserve) fromDown(fixedEl)
      else fromUp(fixedEl)
    })
  }, [pastObserve])

  const eyeRef = useRef<HTMLSpanElement>(null)

  
  useEffect(() => {
    const eyeRotation = (e:any) => {
      const mouseY = e.clientY;
      const mouseX = -e.clientX + window.innerWidth;
      const rotationAngle = ((mouseY + mouseX) / (window.innerHeight + window.innerWidth)) * 90;
  
      if(eyeRef.current){
        eyeRef.current.style.transform = `rotate(${rotationAngle}deg)`;
      }
    }
    document.body.addEventListener('mousemove', eyeRotation);
    return () => {
      document.body.removeEventListener('mousemove', eyeRotation);
    };
  }, []);


  return (
    <article className='app'>
      <span className='outer-mote' />
      <span ref={eyeRef} className='eye' />
      <Home setSectObserve={setPastObserve} />
      <About setSectObserve={setPastObserve} />
      <Projects setSectObserve={setPastObserve} />
      <Contact setSectObserve={setPastObserve} />
      <Sidebar sectObserve={pastObserve} />
    </article>
  )
}

export default App
