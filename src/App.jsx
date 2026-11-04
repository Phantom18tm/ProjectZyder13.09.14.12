import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Sun, Moon, Menu, X, Github, Linkedin, Code2, Sparkles, Play, RotateCcw, Command } from 'lucide-react';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { profile } from './content';

const ease = [0.22, 1, 0.36, 1];
const nav = [['Work', '#work'], ['About', '#about'], ['Skills', '#skills'], ['Contact', '#contact']];

function AsteriskMark() {
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/></svg>;
}

function ThemeToggle({ theme, toggle }) {
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><AnimatePresence mode="wait" initial={false}><motion.span key={theme} initial={{ rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 60, opacity: 0 }} transition={{ duration: 0.2 }}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</motion.span></AnimatePresence></button>;
}

function Loader({ theme, toggle, finish }) {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const started = performance.now();
    let frame;
    const tick = (now) => {
      const next = Math.min((now - started) / 4300, 1);
      setProgress(Math.round(next * 100));
      if (next < 1) frame = requestAnimationFrame(tick);
      else finish();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finish]);
  return <motion.div className={`loader loader-${theme}`} role="status" aria-label="Preparing Pratham’s portfolio" initial={{ opacity: 1 }} exit={reduce ? { opacity: 0 } : theme === 'dark' ? { y: '-100%' } : { opacity: 0, scale: 1.08, filter: 'blur(14px)' }} transition={{ duration: reduce ? 0.1 : 0.6, ease }}>
    <div className="loader-top"><a href="#" className="wordmark" aria-label="Pratham home">pr<span>®</span></a><span className="loader-edition">A PERSONAL EXPLORATION / 2026</span><ThemeToggle theme={theme} toggle={toggle} /></div>
    <div className="loader-stage">
      <AnimatePresence mode="wait"><motion.div key={theme} className="loader-symbol" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {theme === 'dark' ? <><motion.div className="loader-orbit orbit-one" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 4.6, repeat: Infinity, ease: 'linear' }}/><motion.div className="loader-orbit orbit-two" animate={reduce ? {} : { rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}/><motion.div className="loader-star" animate={reduce ? {} : { rotate: 180, scale: [0.8, 1.1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><AsteriskMark/></motion.div></> : <><motion.div className="loader-petal petal-one" animate={reduce ? {} : { rotate: [0, 90, 180], scale: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, ease }}/><motion.div className="loader-petal petal-two" animate={reduce ? {} : { rotate: [45, -45, -135], scale: [1, 0.75, 1] }} transition={{ duration: 4, repeat: Infinity, ease }}/><span className="loader-light-center">pr.</span></>}
      </motion.div></AnimatePresence>
      <p className="loader-kicker">A LITTLE PATIENCE. A LOT OF POSSIBILITIES.</p>
      <div className="loader-title" aria-hidden="true">{(progress < 35 ? 'IDEAS INTO' : progress < 72 ? 'PIXELS INTO' : 'WELCOME TO').split(' ').map((word, i) => <motion.span key={`${word}-${theme}`} initial={reduce ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07, duration: 0.45, ease }}>{word} </motion.span>)}<span className="loader-script">{progress < 35 ? 'possibility.' : progress < 72 ? 'personality.' : 'my world.'}</span></div>
    </div>
    <div className="loader-bottom"><div><span className="tiny-label">LOADING THE EXPERIENCE</span><div className="loader-track"><motion.div style={{ width: `${progress}%` }}/></div></div><span className="loader-progress" aria-hidden="true">{String(progress).padStart(2, '0')}<sup>%</sup></span></div>
  </motion.div>;
}

function Modal({ kind, close }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node.open) node.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = oldOverflow; };
  }, []);
  return <dialog ref={dialog} className="info-dialog" onClose={close} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }} aria-labelledby="info-dialog-title"><div className="info-dialog-inner"><button className="dialog-close" onClick={() => dialog.current.close()} aria-label="Close window"><X size={22}/></button><p className="eyebrow">{kind === 'terms' ? 'THE FINE PRINT' : 'A LITTLE MORE ABOUT ME'}</p><h2 id="info-dialog-title">{kind === 'terms' ? 'Terms & conditions' : 'Meet Pratham.'}</h2>{kind === 'terms' ? profile.termsVideo ? <video controls playsInline preload="metadata" aria-label="Terms and conditions video"><source src={profile.termsVideo}/>{profile.termsCaptions && <track default kind="captions" src={profile.termsCaptions} srcLang="en" label="English"/>}Your browser does not support video playback.</video> : <div className="video-empty"><span><Play size={30}/></span><h3>The film is on its way.</h3><p>The terms video will be available here once supplied.</p></div> : <><p className="dialog-copy">My resume is available on request. In the meantime, let’s connect on LinkedIn.</p><a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">Visit LinkedIn <ArrowUpRight size={18}/></a></>}</div></dialog>;
}

function Reveal({ children, className = '', theme, delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : theme === 'dark' ? { opacity: 0, y: 35 } : { opacity: 0, y: 20, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>;
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const [modal, setModal] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const finishRef = useRef(() => setLoading(false));
  const reduce = useReducedMotion();
  const toggle = () => setTheme((value) => value === 'dark' ? 'light' : 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#000000' : '#F8F8F8';
    try { localStorage.setItem('pratham-theme', theme); } catch { /* Storage is optional. */ }
  }, [theme]);
  useEffect(() => {
    const old = document.body.style.overflow;
    if (loading) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; };
  }, [loading]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: '-25% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onEscape = (event) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [menuOpen]);
  return <>
    <AnimatePresence>{loading && <Loader key="intro" theme={theme} toggle={toggle} finish={finishRef.current}/>}</AnimatePresence>
    <div className="site" inert={loading ? true : undefined}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header section-wrap"><a className="wordmark" href="#home" aria-label="Pratham home">pr<span>®</span></a><nav aria-label="Main navigation" className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`}>{nav.map(([name, href]) => <a key={name} href={href} aria-current={activeSection === href.slice(1) ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{name}<span/></a>)}</nav><div className="header-actions"><ThemeToggle theme={theme} toggle={toggle}/><a className="header-contact" href={profile.linkedin} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={16}/></a><button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button></div></header>
      <main id="main">
        <section id="home" className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-topline"><p><span className="status-dot"/> A MIND FOR CODE. AN EYE FOR DESIGN.</p><span className="edition">PORTFOLIO — VOL. 01 / 2026</span></div>
          <div className="hero-grid"><div className="hero-copy"><motion.p className="hero-name" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: 0.2 }}>PRATHAM RATHORE <span><ArrowUpRight size={16}/></span></motion.p><h1 id="hero-title">{['CODE WITH', 'CHARACTER.'].map((line, i) => <span className="headline-mask" key={line}><motion.span initial={{ y: '110%' }} animate={{ y: loading ? '110%' : 0 }} transition={{ duration: reduce ? 0 : 1, delay: 0.15 + i * 0.12, ease }} className={i === 1 ? 'headline-accent' : ''}>{line}</motion.span></span>)}</h1><motion.div className="hero-description" initial={{ opacity: 0, y: 15 }} animate={{ opacity: loading ? 0 : 1, y: loading ? 15 : 0 }} transition={{ duration: 0.7, delay: 0.5 }}><span className="hero-description-line"/><p>{profile.intro}</p></motion.div><motion.div className="hero-buttons" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: 0.7 }}><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={19}/></a><a className="text-link" href="#about">A little about me <ArrowUpRight size={16}/></a></motion.div></div>
          <div className="hero-visual"><div className="hero-orbital orbital-a"/><div className="hero-orbital orbital-b"/><div className="art-coordinate coordinate-top">FIG. 01 — IDEAS IN MOTION</div><AnimatePresence mode="wait"><motion.img key={theme} className="hero-sculpture" src={`/hero-${theme}.webp`} alt="" initial={{ opacity: 0, scale: 0.9 }} animate={reduce ? { opacity: 1, scale: 1 } : theme === 'dark' ? { opacity: 1, scale: 1, rotate: [-6, 4, -6], y: [0, -14, 0] } : { opacity: 1, scale: [1, 1.035, 1], rotate: [5, -5, 5] }} exit={{ opacity: 0, scale: 0.95 }} transition={{ opacity: { duration: 0.35 }, scale: { duration: theme === 'light' ? 7 : 0.7, repeat: theme === 'light' ? Infinity : 0 }, rotate: { duration: theme === 'dark' ? 14 : 9, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}/></AnimatePresence><span className="hero-handwritten">a little unexpected.</span><motion.div className="glass-note" animate={reduce ? {} : theme === 'dark' ? { y: [0, 7, 0] } : { rotate: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><span className="glass-note-icon"><Code2 size={21}/></span><div><span>CRAFTED WITH INTENTION</span><p>Logic meets a little magic.</p></div><Sparkles size={16}/></motion.div><div className="art-coordinate coordinate-bottom"><span/> EXPERIMENT. REFINE. REPEAT.</div></div></div>
          <div className="hero-bottom"><a href="#work" className="scroll-cue"><span><ArrowDown size={16}/></span> SCROLL TO EXPLORE</a><div className="hero-socials"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a></div><span className="hero-bottom-number">(01 — 04)</span></div>
        </section>
        <div className="marquee" aria-hidden="true"><motion.div className="marquee-track" animate={reduce ? {} : { x: theme === 'dark' ? ['0%', '-50%'] : ['-50%', '0%'] }} transition={{ duration: theme === 'dark' ? 35 : 45, repeat: Infinity, ease: 'linear' }}>{[0, 1].map(n => <div key={n}>{['THOUGHTFUL DESIGN', 'CLEAN CODE', 'EXPRESSIVE MOTION', 'A LITTLE DIFFERENT'].map(text => <span key={text}>{text}<span className="marquee-star"><AsteriskMark/></span></span>)}</div>)}</motion.div></div>
        <Projects theme={theme}/>
        <section id="about" className="about-section section-wrap" aria-labelledby="about-heading"><Reveal className="about-title" theme={theme}><p className="eyebrow"><span/> THE HUMAN BEHIND THE PIXELS</p><h2 id="about-heading">A DEVELOPER’S MIND.<br/><span className="about-script">A designer’s eye.</span></h2><div className="about-monogram" aria-hidden="true">pr<span><AsteriskMark/></span></div></Reveal><Reveal theme={theme} delay={0.15} className="about-copy"><span className="small-index">HELLO, I’M PRATHAM <ArrowUpRight size={18}/></span><p className="about-lead">Good websites don’t just look good.<br/>They <span>feel right.</span></p><p>{profile.about}</p><p>My approach is simple: stay curious, build with purpose, and give every interaction the attention it deserves.</p><div className="about-principles"><div><Command size={19}/><span>Thoughtfully built</span></div><div><Sparkles size={19}/><span>Distinctly human</span></div></div>{profile.resume ? <a href={profile.resume} className="text-link" download>Download resume <ArrowDown size={16}/></a> : <button className="text-link" onClick={() => setModal('resume')}>Let’s get acquainted <ArrowUpRight size={16}/></button>}</Reveal></section>
        <Skills theme={theme}/>
        <section id="contact" className="contact-section section-wrap" aria-labelledby="contact-heading"><Reveal theme={theme}><div className="contact-top"><p className="eyebrow"><span/> HAVE SOMETHING IN MIND?</p><span className="contact-script">Let’s make it happen.</span></div><a className="contact-title" href={profile.linkedin} target="_blank" rel="noreferrer"><h2 id="contact-heading">LET’S CREATE<br/><span>SOMETHING GOOD.</span></h2><motion.span className="contact-arrow" whileHover={reduce ? {} : { rotate: 45 }}><ArrowUpRight strokeWidth={1} /></motion.span></a><div className="contact-bottom"><p>Big idea or a small hello.<br/>I’d love to hear from you.</p><div><a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">Let’s connect <Linkedin size={17}/></a><a className="social-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="Pratham on GitHub"><Github size={22}/></a></div></div></Reveal></section>
      </main>
      <footer className="footer section-wrap"><div className="footer-main"><a className="wordmark" href="#home" aria-label="Back to top">pr<span>®</span></a><p>Designed with intention.<br/>Developed with a little obsession.</p><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={16}/></a></div><div className="footer-bottom"><small>All rights are reserved to Pratham Rathore @2026</small><div><button onClick={() => { setLoading(true); window.scrollTo({ top: 0, behavior: 'instant' }); }}><RotateCcw size={12}/> Replay intro</button><button onClick={() => setModal('terms')}>Terms & conditions <ArrowUpRight size={12}/></button></div></div></footer>
    </div>
    {modal && <Modal kind={modal} close={() => setModal(null)}/>}
  </>;
}
