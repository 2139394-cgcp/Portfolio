import { useEffect, useRef, useState } from 'react'
import { profile } from './data.js'
import Crowd from './Crowd.jsx'

export default function Footer() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const links = [['Home', '#home'], ['Skills', '#stack'], ['Projects', '#projects'], ['Experience', '#experience'], ['Contact', '#contact']]
  return (
    <footer>
      <div className="wrap">
        <div className="f">
          <div><b>Karthi.</b>Frontend Developer<br />Bangalore, India</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
            {links.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
          </div>
          <div>Get in touch<br /><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
        </div>
        <div className="see"><span>See you around.</span><a href="#home">Back to top</a></div>
      </div>
      <div ref={ref} className={'mark' + (on ? ' in' : '')}>
        <div className="big" aria-hidden="true">KARTHIK.</div>
        <Crowd />
        <span className="copy">© 2026 Karthik P S</span>
      </div>
    </footer>
  )
}
