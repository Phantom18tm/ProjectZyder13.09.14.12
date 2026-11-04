import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, Play, SkipBack, SkipForward, Heart, Search, Home, Plus, Music2, BarChart3, Activity, Radio } from 'lucide-react';
import './Projects.css';

const concepts = [
  {
    id: 'orbit', number: '01', name: 'Orbit', category: 'A little rhythm. A lot of feeling.',
    tags: ['Music experience', 'Interface design'],
    description: 'An exploration of a music listening interface: rich artwork, thoughtful spacing, and a focused player that keeps the music at the center. This visual concept explores how a familiar product can feel more expressive.',
    details: ['Immersive artwork and layered depth', 'Responsive dashboard composition', 'Clear hierarchy and considered interaction states'],
    component: OrbitPreview,
  },
  {
    id: 'forma', number: '02', name: 'Forma', category: 'A quieter kind of digital.',
    tags: ['Editorial website', 'Creative direction'],
    description: 'An architectural website concept built around the relationship between space and type. Warm surfaces, generous whitespace, and carefully framed geometry create an unhurried reading experience.',
    details: ['Editorial typography and visual rhythm', 'Architectural forms drawn with CSS', 'A restrained, nature-inspired palette'],
    component: FormaPreview,
  },
  {
    id: 'pulse', number: '03', name: 'Pulse', category: 'Making the complex feel clear.',
    tags: ['Dashboard', 'Data visualization'],
    description: 'A visual study of a modern analytics workspace. The concept organizes sample data into a calm, scannable dashboard, using contrast, chart shapes, and a consistent grid to bring the important details forward.',
    details: ['Readable sample data visualization', 'Modular, responsive dashboard layout', 'Consistent visual system and clear contrast'],
    component: PulsePreview,
  },
];

function OrbitPreview() {
  return <div className="orbit-demo" aria-hidden="true">
    <aside className="orbit-side"><div className="orbit-brand"><Radio size={17} /> orbit<span>®</span></div><div className="orbit-search"><Search size={9} /> Search your universe</div><p>YOUR SPACE</p><div className="orbit-active"><Home size={10} /> Discover</div><div><Music2 size={10} /> Your library</div><div><Heart size={10} /> Liked songs</div><p>COLLECTIONS <Plus size={9} /></p><span>After hours</span><span>Creative flow</span><span>Sunday, slow</span><div className="orbit-mini-art"><i /><span>A world of sound.<br />All yours.</span></div></aside>
    <div className="orbit-content"><div className="orbit-top"><span>Good evening, dreamer.</span><i>PR</i></div><div className="orbit-album"><div className="orbit-album-grid" /><div className="orbit-planet" /><span className="orbit-featured">YOUR DAILY ESCAPE</span><h4>Out of<br /><em>this world.</em></h4><p>Let the good stuff find you.</p><span className="orbit-listen"><Play size={9} fill="currentColor" /> Press play</span><span className="orbit-album-label">ORBIT / VOL. 01</span></div><div className="orbit-playlist-title"><b>Made for your mood</b><span>View all ↗</span></div><div className="orbit-playlists"><div><i className="orbit-cover-one">soft<br /><em>focus.</em></i><b>Soft focus</b><span>Find your flow</span></div><div><i className="orbit-cover-two">AFTER<br />HOURS</i><b>After hours</b><span>Stay a little longer</span></div><div><i className="orbit-cover-three">feel<br />good.</i><b>Feel good</b><span>A brighter headspace</span></div></div></div>
    <div className="orbit-player"><i className="orbit-tiny-cover" /><span><b>Weightless</b><small>A moment for yourself</small></span><Heart size={9} /><div><SkipBack size={10} /><i><Play size={9} fill="currentColor" /></i><SkipForward size={10} /></div><span className="orbit-timeline"><i /></span><small>02:34</small></div>
  </div>;
}

function FormaPreview() {
  return <div className="forma-demo" aria-hidden="true">
    <div className="forma-nav"><b>forma<span>®</span></b><span>Spaces</span><span>Our philosophy</span><span>Let's talk ↗</span></div>
    <div className="forma-title"><span>ARCHITECTURE, WITH INTENTION.</span><h4>Room to<br /><em>be yourself.</em><span>↗</span></h4></div>
    <div className="forma-scene"><div className="forma-sun" /><div className="forma-wall"><div className="forma-arch"><div className="forma-arch-inner" /></div><div className="forma-shadow" /><div className="forma-plinth" /></div><div className="forma-plant"><i /><i /><i /><i /><i /><span /></div><span className="forma-scene-caption">A STUDY IN LIGHT & SPACE</span><i className="forma-scene-arrow">↗</i></div>
    <div className="forma-foot"><span>Thoughtful spaces.<br />Extraordinary everyday living.</span><span>EST. 2026<br />DESIGNED TO FEEL DIFFERENT.</span></div>
  </div>;
}

function PulsePreview() {
  return <div className="pulse-demo" aria-hidden="true">
    <aside className="pulse-side"><div className="pulse-brand"><Activity size={18} /> pulse<span>™</span></div><div className="pulse-nav-item pulse-selected"><BarChart3 size={12} /><span>Overview</span></div><div className="pulse-nav-item"><Activity size={12} /><span>Activity</span></div><div className="pulse-nav-item"><Radio size={12} /><span>Audience</span></div><div className="pulse-side-bottom"><i>PR</i><span>Your workspace<small>Personal account</small></span></div></aside>
    <div className="pulse-content"><div className="pulse-top"><span>Workspace <i>/</i> Overview</span><span className="pulse-search"><Search size={10} /> Search anything <kbd>⌘ K</kbd></span></div><div className="pulse-heading"><div><span>YOUR NUMBERS, AT A GLANCE</span><h4>A clearer perspective.</h4></div><i>Last 30 days ⌄</i></div><div className="pulse-stats"><div><span>Total visitors</span><b>24,892 <i>↗ 12.8%</i></b><svg viewBox="0 0 100 20"><path d="M0 17 10 14 20 16 30 9 40 11 50 7 60 9 70 3 80 6 90 2 100 0" /></svg></div><div><span>Engagement rate</span><b>68.4<small>%</small> <i>↗ 8.2%</i></b><div className="pulse-small-bars">{[25, 40, 33, 55, 60, 46, 80, 65, 90, 100].map((h,i) => <i key={i} style={{height: `${h}%`}} />)}</div></div><div><span>Active right now</span><b>128 <i className="pulse-live">● Live</i></b><span className="pulse-people"><i>J</i><i>M</i><i>A</i><i>+125</i></span></div></div><div className="pulse-chart"><div><b>Audience overview</b><span><i /> Visitors <small>↗ +18.6% this month</small></span></div><div className="pulse-chart-grid"><span>30k<br />20k<br />10k<br />0</span><svg viewBox="0 0 600 150" preserveAspectRatio="none"><defs><linearGradient id="pulse-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#647dff" stopOpacity=".28" /><stop offset="1" stopColor="#647dff" stopOpacity="0" /></linearGradient></defs><path d="M0 124 C30 124 35 100 65 104 S100 115 130 86 S175 100 200 80 S240 90 265 56 S300 70 325 51 S365 62 390 31 S430 55 460 33 S510 48 540 15 S575 30 600 5 V150 H0Z" fill="url(#pulse-fill)" /><path d="M0 124 C30 124 35 100 65 104 S100 115 130 86 S175 100 200 80 S240 90 265 56 S300 70 325 51 S365 62 390 31 S430 55 460 33 S510 48 540 15 S575 30 600 5" fill="none" stroke="#6d86ff" strokeWidth="2.5" /></svg></div><div className="pulse-chart-dates"><span>Nov 01</span><span>Nov 05</span><span>Nov 10</span><span>Nov 15</span><span>Nov 20</span><span>Nov 30</span></div></div></div>
  </div>;
}

export default function Projects({ theme = 'dark' }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    if (!element.open) element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element.open) element.close();
    };
  }, [selected]);

  return <section id="work" className="projects-section section-wrap" aria-labelledby="projects-heading">
    <div className="projects-section-heading"><div><p className="eyebrow"><span /> SELECTED EXPLORATIONS / 01—03</p><h2 id="projects-heading">Ideas, brought<br /><span>to life.</span></h2></div><p>A few explorations at the intersection<br className="projects-desktop-break" /> of thoughtful design and expressive code.<br /><span className="projects-disclosure">Original interface concepts · not client work</span></p></div>
    <div className="projects-grid">{concepts.map((project, index) => {
      const Preview = project.component;
      return <motion.article key={project.id} className={`project-card project-${project.id}`} initial={reducedMotion ? false : theme === 'dark' ? {opacity: 0, y: 36} : {opacity: 0, y: 20, scale: 0.96, rotate: -1}} whileInView={{opacity: 1, y: 0, scale: 1, rotate: 0}} viewport={{once: true, amount: .12}} transition={{duration: .65, delay: index === 1 ? .1 : 0}}>
        <button className={`project-visual project-visual-${project.id}`} onClick={() => setSelected(project)} aria-label={`Explore ${project.name} interface concept`}><span className="project-visual-label">INTERFACE CONCEPT — {project.number}</span><div className="project-preview-wrap"><Preview /></div><span className="project-view-icon"><ArrowUpRight size={22} strokeWidth={1.5} /></span><span className="project-visual-bottom">DESIGNED TO FEEL DIFFERENT <span>↗</span></span></button>
        <div className="project-caption"><div><h3>{project.name}<span>®</span></h3><p>{project.category}</p></div><span className="project-index">({project.number})</span></div><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}<span>Concept</span></div>
      </motion.article>;
    })}</div>
    <div className="projects-github"><span>More ideas are always in the works.</span><a href="https://github.com/Phantom18tm" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={17} /></a></div>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onClick={event => {if (event.target === event.currentTarget) dialog.current.close();}}>
      {selected && <div className="project-dialog-inner"><button className="project-dialog-close" onClick={() => dialog.current.close()} aria-label="Close project details"><X size={22} /></button><span className="eyebrow">INTERFACE CONCEPT / {selected.number}</span><h2 id="project-dialog-title">{selected.name}<span>®</span></h2><p>{selected.description}</p><ul>{selected.details.map(detail => <li key={detail}><ArrowRight size={14} /> {detail}</li>)}</ul><div className={`project-dialog-preview project-visual-${selected.id}`}><selected.component /></div><p className="project-concept-note">A visual exploration created for this portfolio. No client affiliation or live product is implied.</p><a className="project-dialog-link" href="https://github.com/Phantom18tm" target="_blank" rel="noreferrer">Browse GitHub <ArrowUpRight size={17} /></a></div>}
    </dialog>
  </section>;
}
