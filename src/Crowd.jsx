import { useMemo } from 'react'

const K = '#111'
const P = ({ d, f = 'none', w = 4, s = K }) =>
  <path d={d} fill={f} stroke={s} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" />
const E = ({ x = 0, y = 0, rx, ry = rx, f = '#fff' }) =>
  <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={f} stroke={K} strokeWidth="4" />

const CURLS = [[-25, -38], [-9, -52], [10, -52], [27, -37], [-33, -18], [33, -18], [0, -40]]
const DOTS = [[-30, 84], [0, 72], [30, 62], [-10, 94], [42, 90]]
const CAP = 'M-31 -16C-36 -62 36 -62 31 -16C24 -34 6 -38 -6 -34C-18 -32 -26 -26 -31 -16Z'

function Person({ x, y, s, o }) {
  const h = o.hair, c = o.cloth
  return (
    <g className="p" style={{ animationDelay: `-${o.d}s` }}>
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        {c === 3 && <E y={26} rx={38} ry={18} />}
        {h === 6 && <P d="M-35 -14C-42 -68 42 -68 35 -14C42 20 46 56 42 74L-42 74C-46 56-42 20-35 -14Z" f={K} />}
        {h === 3 && CURLS.map(([a, b], i) => <E key={i} x={a} y={b} rx={15} f={K} />)}
        {h === 4 && <E y={-60} rx={12} f={K} />}
        {h === 7 && <P d="M-40 -10C-44 -64 44 -64 40 -10C46 30 52 56 46 80L-46 80C-52 56-46 30-40 -10Z" f="#f1f1ee" />}
        <P d="M-64 100C-64 40-38 18 0 18C38 18 64 40 64 100Z" f={c === 1 ? K : '#fff'} />
        {c === 0 && <><P d="M-16 20L-4 44L0 24" f="#fff" w={3.5} /><P d="M16 20L4 44L0 24" f="#fff" w={3.5} /><P d="M0 40V100" w={3} /></>}
        {c === 1 && <P d="M-18 20Q0 42 18 20" w={3} s="#fff" />}
        {c === 2 && <>{Array.from({ length: 9 }, (_, i) => <P key={i} d={`M${-44 + i * 11} 52V100`} w={2.2} />)}<P d="M-14 20L0 52L14 20" w={3.5} /></>}
        {c === 3 && <><P d="M-10 34V64" w={3} /><P d="M10 34V64" w={3} /></>}
        {c === 4 && <><P d="M-64 74C-30 44 20 34 60 26L64 100L-64 100Z" f="#e2e2de" w={3.5} />{DOTS.map(([a, b], i) => <circle key={i} cx={a} cy={b} r="2.8" fill={K} />)}</>}
        {c === 5 && <><P d="M-28 24V100" w={6} /><P d="M28 24V100" w={6} /></>}
        {o.hp && <><P d="M-34 30Q0 68 34 30" w={6} /><E x={-34} y={32} rx={7} ry={9} f={K} /><E x={34} y={32} rx={7} ry={9} f={K} /></>}
        <E x={-31} y={-12} rx={5} ry={8} /><E x={31} y={-12} rx={5} ry={8} /><E y={-14} rx={30} ry={34} />
        {(h === 0 || h === 4) && <P d={CAP} f={K} />}
        {h === 1 && <P d="M-31 -18C-32 -60 22 -64 34 -28C14 -46-10 -40-31 -18Z" f={K} />}
        {h === 5 && <P d={CAP} f="#e6e6e2" />}
        {h === 6 && <P d="M-30 -22C-20 -48 20 -48 30 -22C14 -36-14 -36-30 -22Z" f={K} />}
        {h === 7 && <P d="M-30 -18C-24 -50 24 -50 30 -18C20 -36-20 -36-30 -18Z" f="#f1f1ee" />}
        {[-11, 11].map(q => (
          <g key={q}>
            {o.happy ? <P d={`M${q - 5} -12Q${q} -20 ${q + 5} -12`} w={3} /> : <circle cx={q} cy={-14} r="3.2" fill={K} />}
            <P d={`M${q - 6} -25Q${q} -29 ${q + 6} -25`} w={2.6} />
          </g>
        ))}
        <P d="M0 -11Q-4 -2 2 -2" w={2.4} />
        {o.beard
          ? <><P d="M-30 -6C-30 32 30 32 30 -6C22 10-22 10-30 -6Z" f={K} /><P d="M-9 8Q0 15 9 8" w={2.6} s="#fff" /></>
          : <>{o.stache && <P d="M-12 4Q0 -3 12 4Q0 1 -12 4Z" f={K} />}<P d={o.smile ? 'M-13 7Q0 24 13 7Z' : 'M-9 9Q0 15 9 9'} f={o.smile ? '#fff' : 'none'} w={3} /></>}
        {(o.glasses || h === 5) && <><E x={-11} y={-14} rx={10} ry={9} f="none" /><E x={11} y={-14} rx={10} ry={9} f="none" /><P d="M-1 -15H1" w={2.6} /></>}
      </g>
    </g>
  )
}

function makeCrowd() {
  let seed = 23
  const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const pk = n => Math.floor(r() * n)
  const row = (y, s, step, off, skip) => {
    const out = []
    for (let x = off; x < 1260; x += step) {
      const px = x + (r() - 0.5) * step * 0.4
      if (skip && Math.abs(px - 600) < skip) continue
      const c = pk(6), h = pk(8)
      out.push({ x: px, y: y + (r() - 0.5) * 12, s: s * (0.9 + r() * 0.2), o: {
        hair: h, cloth: c, glasses: r() < 0.28, beard: h < 3 && r() < 0.3, stache: h < 3 && r() < 0.15,
        smile: r() < 0.55, hp: c === 1 && r() < 0.4, happy: r() < 0.3, d: (r() * 3).toFixed(2) } })
    }
    return out
  }
  return {
    back: row(120, 0.55, 52, 6, 0),
    front: [...row(172, 0.7, 74, 30, 64), ...row(230, 0.86, 100, -10, 78), ...row(302, 1.05, 135, 40, 95)],
  }
}

export default function Crowd() {
  const { back, front } = useMemo(makeCrowd, [])
  return (
    <svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice" role="img"
      aria-label="Illustrated crowd of people with Karthik standing in the middle">
      {back.map((p, i) => <Person key={'b' + i} {...p} />)}
      <g transform="translate(600 128) scale(.9)">
        <P d="M-60 70C-72 130-68 190-62 230L-40 228L-38 90Z" f={K} />
        <P d="M60 70C72 130 68 190 62 230L40 228L38 90Z" f={K} />
        <P d="M-42 90L-48 340L-6 340L0 150L6 340L48 340L42 90Z" f={K} />
      </g>
      <Person x={600} y={128} s={0.9} o={{ hair: 1, cloth: 1, smile: true, d: 0 }} />
      {front.map((p, i) => <Person key={'f' + i} {...p} />)}
    </svg>
  )
}
