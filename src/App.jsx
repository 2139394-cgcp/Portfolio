import { useEffect, useState } from 'react'
import { profile, stack, projects, timeline } from './data.js'
import Footer from './Footer.jsx'
import photo from './Images/karthik.jpeg'

function Intro() {
  const [done, setDone] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDone(true), 1900); return () => clearTimeout(t) }, [])
  return (
    <div id="intro" className={done ? 'done' : ''} aria-hidden="true">
      <div className="t"><i>&lt;</i><span>Frontend</span><span>Developer</span><i>/&gt;</i></div>
    </div>
  )
}

function Nav() {
  return (
    <nav aria-label="Main">
      <a href="#home">Home</a><a href="#stack">Skills</a><a href="#projects">Projects</a>
      <a href="#experience">Experience</a><a className="cta" href="#contact">Contact</a>
    </nav>
  )
}

function Hero() {
  return (
    <section id="home">
      <div className="wrap hero">
        <div>
          <h1>Hi, I’m<br />Karthi.</h1>
          <p className="role">Frontend Developer<br />based in Bangalore.</p>
          <div className="now">Previously at<b>Cognizant Technology Solutions</b>Software Engineer, 2022 – 2026</div>
        </div>
         <div className="photo"><img src={photo} alt="Karthik" /></div>
        {/* <div className="photo" role="img" aria-label="Photo placeholder">KP</div> */}
        <div>
          <p className="lead">I build fast, accessible React and TypeScript interfaces for banking and finance products.</p>
          <a className="btn" href="#projects">Explore projects</a>
        </div>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <h2>Tech stack</h2>
        <p className="sub">What I use every day to ship production web apps.</p>
        <div className="cols">
          {stack.map(c => (
            <div key={c.title}>
              <h3>{c.title}</h3><p>{c.blurb}</p>
              <div className="chips">
                {c.chips.map(x => <span key={x} className={'chip' + (x === c.on ? ' on' : '')}>{x}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Folder({ title, tag, text }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(o => !o)
  return (
    <div className={'folder' + (open ? ' open' : '')} tabIndex={0} role="button" aria-label={title}
      onClick={toggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() } }}>
      <div className="sheet" />
      <div className="sheet">{text}</div>
      <div className="front"><h3>{title}</h3><small>{tag}</small></div>
    </div>
  )
}

function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <h2>Featured<br />projects</h2>
        <p className="sub">Selected work from my years in banking and finance. Hover or tap a folder to open it.</p>
        <div className="folders">{projects.map(p => <Folder key={p.title} {...p} />)}</div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <h2>Experience</h2>
        <p className="sub">Five years of steady growth, from trainee to software engineer.</p>
        <div className="tl">
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6 30 C 130 30, 120 50, 256 50 S 380 30, 506 30 S 630 50, 756 50 S 880 30, 994 30" vectorEffect="non-scaling-stroke" />
          </svg>
          {timeline.map(n => (
            <div className="n" key={n.title}>
              {n.tag && <><span className="tag">{n.tag}</span><br /></>}
              <time>{n.time}</time><h3>{n.title}</h3><div className="o">{n.org}</div><p>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [f, setF] = useState({ n: '', e: '', m: '' })
  const set = k => ev => setF({ ...f, [k]: ev.target.value })
  const submit = ev => {
    ev.preventDefault()
    const body = `Hi Karthi,\n\n${f.m}\n\n${f.n}\n${f.e}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Opportunity for ' + f.n)}&body=${encodeURIComponent(body)}`
  }
  return (
    <section id="contact">
      <div className="wrap talk">
        <div>
          <h2>Let’s talk.</h2>
          <p className="sub">I’m available immediately for frontend roles.</p>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="links"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
        </div>
        <form onSubmit={submit}>
          <label>Your name<input required value={f.n} onChange={set('n')} placeholder="What should I call you?" /></label>
          <label>Email address<input type="email" required value={f.e} onChange={set('e')} placeholder="you@company.com" /></label>
          <label className="full">What’s the opportunity?<textarea required value={f.m} onChange={set('m')} placeholder="A little about the role or project." /></label>
          <div className="full"><button className="btn" type="submit">Create email draft</button></div>
        </form>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Intro /><Nav />
      <main><Hero /><Stack /><Projects /><Experience /><Contact /></main>
      <Footer />
    </>
  )
}
