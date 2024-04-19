import { } from 'react'

interface Props {
    sectObserve: number;
}
function Sidebar({ sectObserve }: Props) {
    const sections = ['home', 'about', 'projects', 'contact']

    const handleSectionChange = (i: number) => {
        const tagSection = document.querySelectorAll('section')[i]
        tagSection.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav>
            <ul>
                {
                    sections.map((sect, i) => {
                        return <li key={i} onClick={() => handleSectionChange(i)}
                            className={`${sectObserve === i ? 'active' : ''}`}
                        >
                            <p className='title'>{sect}</p>
                            {
                                <span className={`${
                                    sect !== sections[sections.length - 1] ? 
                                    'not-last' : 'last'}`}
                                
                                />
                            }
                            <p className="number">0{i + 1}</p>
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}

export default Sidebar