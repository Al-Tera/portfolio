import { useRef, useEffect, useState, Dispatch } from 'react'
import { fadeIn, fadeOut } from '../common/helpers'
import { options } from '../common/constants';

interface Props {
  setSectObserve: Dispatch<number>;
}

function Home({ setSectObserve }: Props) {

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hour = new Date().getHours();

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
      setSectObserve(0)
      fadeIn(sectionRef.current)
    }
    else {
      fadeOut(sectionRef.current)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="home">
      <div className='fixed__div'>
        <p className="capitalize">{hour < 12 ? 'good day' : hour < 18 ? 'pleasant afternoon' : 'evening salutations'}!</p>
        <p className="">I'm Al Sultan.</p>
        <p className="">Frontend Web&nbsp;Developer.</p>
      </div>
    </section>
  )
}

export default Home