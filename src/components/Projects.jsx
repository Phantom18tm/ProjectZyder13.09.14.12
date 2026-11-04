import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, Workflow, Database, Mail, Sprout, CloudSun, Cpu } from 'lucide-react';
import { projects } from '../content';
import './Projects.css';

function ProjectDiagram({ project }) {
  const agriculture = project.id === 'krishi-seva';
  return <div className={`project-diagram ${agriculture ? 'project-diagram-agriculture' : 'project-diagram-workflow'}`} aria-hidden="true">
    <div className="project-diagram-grid" />
    <svg className="project-diagram-lines" viewBox="0 0 500 280" preserveAspectRatio="none"><path d="M100 90C150 90 155 140 250 140S350 90 400 90M100 205C155 205 160 140 250 140S350 205 400 205" /></svg>
    <span className="project-node project-node-one">{agriculture ? <Sprout /> : <Database />}<small>{agriculture ? 'Soil insights' : 'Apify'}</small></span>
    <span className="project-node project-node-two">{agriculture ? <CloudSun /> : <Cpu />}<small>{agriculture ? 'Weather insights' : 'APIs'}</small></span>
    <span className="project-node project-node-center">{agriculture ? <Sprout /> : <Workflow />}<small>{agriculture ? 'Krishi Seva' : 'n8n'}</small></span>
    <span className="project-node project-node-three">{agriculture ? <Cpu /> : <Mail />}<small>{agriculture ? 'AI recommendations' : 'Scheduled emails'}</small></span>
    <span className="project-diagram-caption">{agriculture ? 'AI & IoT AGRICULTURE PLATFORM' : 'AI AGENTIC WORKFLOW'}</span>
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
    <div className="projects-section-heading">
      <div><p className="eyebrow"><span /> PROJECTS</p><h2 id="projects-heading">My <span>projects.</span></h2></div>
      <p>AI workflow automation.<br />AI & IoT for agriculture.</p>
    </div>
    <div className="projects-grid">{projects.map((project, index) => <motion.article
      key={project.id}
      className={`project-card project-${project.id}`}
      initial={reducedMotion ? false : theme === 'dark' ? { opacity: 0, y: 36 } : { opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
    >
      <button className="project-visual" onClick={() => setSelected(project)} aria-label={`Explore ${project.name} project`}>
        <span className="project-visual-label">PROJECT {String(index + 1).padStart(2, '0')}</span>
        <ProjectDiagram project={project} />
        <span className="project-view-icon"><ArrowUpRight size={22} strokeWidth={1.5} /></span>
      </button>
      <div className="project-caption"><div><p className="project-category">{project.category}</p><h3>{project.name}</h3></div><span className="project-index">({String(index + 1).padStart(2, '0')})</span></div>
      <ul className="project-summary">{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
      <div className="project-card-bottom"><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="project-details-link" onClick={() => setSelected(project)} aria-label={`View ${project.name} details`}>Details <ArrowUpRight size={16} /></button></div>
    </motion.article>)}</div>
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      {selected && <div className="project-dialog-inner">
        <button className="project-dialog-close" onClick={() => dialog.current.close()} aria-label="Close project details"><X size={22} /></button>
        <p className="eyebrow">{selected.category}</p><h2 id="project-dialog-title">{selected.name}</h2>
        <ul className="project-dialog-details">{selected.details.map(detail => <li key={detail}><ArrowRight size={16} /><span>{detail}</span></li>)}</ul>
        <div className="project-tags" aria-label="Project technologies">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-dialog-diagram"><ProjectDiagram project={selected} /></div>
        {selected.link && <a className="project-dialog-link" href={selected.link} target="_blank" rel="noreferrer">View project <ArrowUpRight size={17} /></a>}
      </div>}
    </dialog>
  </section>;
}
