import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import './Skills.css';

const toolkit = [
  { name: 'React', category: 'Interface architecture', kind: 'react', color: '#9bdce3' },
  { name: 'JavaScript', category: 'Ideas into interactions', kind: 'javascript', color: '#e3ed81' },
  { name: 'HTML5', category: 'A thoughtful foundation', kind: 'html', color: '#efa680' },
  { name: 'CSS3', category: 'The details that matter', kind: 'css', color: '#98badf' },
  { name: 'Figma', category: 'From canvas to code', kind: 'figma', color: '#c8abdf' },
  { name: 'Git', category: 'Progress, versioned', kind: 'git', color: '#a9d58e' },
];

function ToolLogo({ kind }) {
  if (kind === 'react') return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="4"><ellipse cx="50" cy="50" rx="43" ry="16"/><ellipse cx="50" cy="50" rx="43" ry="16" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="43" ry="16" transform="rotate(120 50 50)"/></g><circle cx="50" cy="50" r="7" fill="currentColor"/></svg>;
  if (kind === 'javascript') return <svg viewBox="0 0 100 100" aria-hidden="true"><rect x="9" y="9" width="82" height="82" rx="14" fill="currentColor"/><path d="M48 36v32c0 10-6 16-16 16-5 0-9-2-12-5l6-8c2 2 4 3 6 3 4 0 6-2 6-7V36h10zm34 7-7 6c-2-3-5-4-7-4-3 0-5 1-5 4 0 3 3 4 8 6 8 3 14 7 14 15 0 10-8 15-17 15-9 0-15-4-19-10l8-6c3 4 6 6 11 6 4 0 7-2 7-5 0-3-3-5-8-7-8-3-14-7-14-15 0-8 7-13 15-13 7 0 11 3 14 8z" fill="#20251f"/></svg>;
  if (kind === 'html' || kind === 'css') return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="m15 8 7 75 28 9 28-9 7-75H15z" fill="currentColor"/><path d="M50 16v67l20-6 6-61H50z" fill="#fff" opacity=".15"/>{kind === 'html' ? <path d="m30 27 2 9h37l-1 9H34l3 25 13 4 14-4 2-18H56l-1 11-5 1-5-1-1-9H35l-1-9h34l2-18H30z" fill="#20251f"/> : <path d="M30 27h41l-1 10-24 10h23l-3 24-16 5-15-5-1-12h10l1 5 5 1 6-2 1-7H33l-1-10 22-10H31l-1-9z" fill="#20251f"/>}</svg>;
  if (kind === 'figma') return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 8H35a15 15 0 0 0 0 30h15V8z" fill="currentColor"/><path d="M50 8h15a15 15 0 0 1 0 30H50V8z" fill="currentColor" opacity=".66"/><path d="M50 38H35a15 15 0 0 0 0 30h15V38z" fill="currentColor" opacity=".7"/><circle cx="65" cy="53" r="15" fill="currentColor" opacity=".9"/><path d="M50 68H35a15 15 0 1 0 15 15V68z" fill="currentColor" opacity=".5"/></svg>;
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><rect x="17" y="17" width="66" height="66" rx="9" transform="rotate(45 50 50)" fill="currentColor"/><path d="m33 25 16 16v32m0-32 18 18" stroke="#20251f" strokeWidth="7"/><g fill="#20251f"><circle cx="49" cy="42" r="7"/><circle cx="49" cy="73" r="7"/><circle cx="67" cy="59" r="7"/></g></svg>;
}

function SkillCard({ tool, index, theme }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), { stiffness: 170, damping: 20 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), { stiffness: 170, damping: 20 });
  const handleMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };
  const resetTilt = () => { pointerX.set(0); pointerY.set(0); };
  return (
    <motion.li
      className="skill-tile"
      tabIndex={0}
      aria-label={`${tool.name}: ${tool.category}`}
      style={{ '--tool-color': tool.color, rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.055 }}
    >
      <span className="skill-tile-index">0{index + 1}</span>
      <span className="skill-tile-arrow" aria-hidden="true"><MoveUpRight size={17}/></span>
      <motion.div
        className={`skill-object skill-object-${tool.kind}`}
        animate={reduceMotion ? undefined : theme === 'light' ? { y: [0, -7, 0], rotate: [0, -3, 0] } : { rotateY: [-13, 13, -13], rotateX: [8, -4, 8] }}
        transition={{ duration: theme === 'light' ? 5 + index * 0.4 : 8 + index * 0.5, ease: 'easeInOut', repeat: Infinity }}
      >
        <span className="skill-object-shadow"><ToolLogo kind={tool.kind}/></span>
        <span className="skill-object-depth"><ToolLogo kind={tool.kind}/></span>
        <span className="skill-object-face"><ToolLogo kind={tool.kind}/></span>
      </motion.div>
      <div className="skill-tile-label"><h3>{tool.name}</h3><p>{tool.category}</p></div>
    </motion.li>
  );
}

export default function Skills({ theme = 'dark' }) {
  return (
    <section id="skills" className="skills-section section-wrap" aria-labelledby="skills-heading">
      <div className="skills-heading-row">
        <div><p className="eyebrow"><span/> THE TOOLKIT</p><h2 id="skills-heading">A versatile <span>toolkit.</span></h2></div>
        <p className="skills-intro">The tools behind the pixels.<br/>Built to turn a good idea into a great experience.</p>
      </div>
      <ul className="skills-grid">{toolkit.map((tool, index) => <SkillCard key={tool.kind} tool={tool} index={index} theme={theme}/>)}</ul>
      <div className="skills-bottom-note"><span className="skills-note-dot"/> A little design thinking. A lot of attention to detail.<ArrowUpRight size={15} aria-hidden="true"/></div>
    </section>
  );
}
