import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Check, MoveUpRight } from 'lucide-react';
import { featuredTools, toolGroups, skills } from '../content';
import './Skills.css';

function ToolLogo({ kind }) {
  if (kind === 'react') return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="4"><ellipse cx="50" cy="50" rx="43" ry="16"/><ellipse cx="50" cy="50" rx="43" ry="16" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="43" ry="16" transform="rotate(120 50 50)"/></g><circle cx="50" cy="50" r="7" fill="currentColor"/></svg>;
  if (kind === 'n8n') return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 51h18l17-25h26M37 51l17 24h26"/><circle cx="16" cy="51" r="10" fill="currentColor"/><circle cx="57" cy="26" r="10" fill="currentColor"/><circle cx="83" cy="26" r="10" fill="currentColor"/><circle cx="57" cy="75" r="10" fill="currentColor"/><circle cx="83" cy="75" r="10" fill="currentColor"/></g></svg>;
  if (kind === 'python') return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M49 9c-23 0-24 8-24 19v11h26v5H16c-14 0-14 32 0 32h9V64c0-10 7-17 18-17h22c9 0 13-7 13-15V24C78 13 65 9 49 9zm-11 9a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" fill="currentColor"/><path d="M51 91c23 0 24-8 24-19V61H49v-5h35c14 0 14-32 0-32h-9v12c0 10-7 17-18 17H35c-9 0-13 7-13 15v8c0 11 13 15 29 15zm11-9a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="currentColor" opacity=".68"/></svg>;
  if (kind === 'mysql') return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="4"><ellipse cx="49" cy="24" rx="33" ry="13" fill="currentColor" fillOpacity=".13"/><path d="M16 24v20c0 17 66 17 66 0V24M16 44v20c0 17 66 17 66 0V44"/></g><rect x="31" y="65" width="59" height="26" rx="7" fill="currentColor"/><text x="60" y="83" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="700" textAnchor="middle" fill="#20251f">SQL</text></svg>;
  if (kind === 'apify') return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M39 12c4-7 12-7 16 0l34 59c5 8 1 16-9 16H15C5 87 1 79 6 71l33-59z" fill="currentColor" opacity=".5"/><path d="M53 15c-1-2-4-2-6 0L24 56c-3 5 0 10 6 10h47L53 15z" fill="currentColor"/><path d="M29 72h49c5 0 7 5 5 8-1 2-2 3-5 3H22l7-11z" fill="currentColor" opacity=".85"/></svg>;
  if (kind === 'figma') return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 8H35a15 15 0 0 0 0 30h15V8z" fill="currentColor"/><path d="M50 8h15a15 15 0 0 1 0 30H50V8z" fill="currentColor" opacity=".66"/><path d="M50 38H35a15 15 0 0 0 0 30h15V38z" fill="currentColor" opacity=".7"/><circle cx="65" cy="53" r="15" fill="currentColor" opacity=".9"/><path d="M50 68H35a15 15 0 1 0 15 15V68z" fill="currentColor" opacity=".5"/></svg>;
  return null;
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
      <span className="skill-tile-index">{String(index + 1).padStart(2, '0')}</span>
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
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="skills-section section-wrap" aria-labelledby="skills-heading">
      <div className="skills-heading-row">
        <div><p className="eyebrow"><span/> TECH STACK</p><h2 id="skills-heading">Tools &amp; <span>languages.</span></h2></div>
      </div>
      <ul className="skills-grid" aria-label="Featured technologies">{featuredTools.map((tool, index) => <SkillCard key={tool.kind} tool={tool} index={index} theme={theme}/>)}</ul>
      <div className="resume-tool-groups">
        {toolGroups.map((group, index) => <motion.div
          className="resume-tool-group"
          key={group.name}
          initial={reduceMotion ? false : { opacity: 0, y: theme === 'light' ? 12 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: .55, delay: index * .04 }}
        >
          <div className="resume-tool-heading"><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.name}</h3></div>
          <ul>{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
        </motion.div>)}
      </div>
      <div className="resume-professional-skills" aria-labelledby="professional-skills-heading">
        <div className="resume-skills-title"><p className="eyebrow"><span/> PROFESSIONAL SKILLS</p><h2 id="professional-skills-heading">Skills.</h2></div>
        <ul>{skills.map((skill, index) => <motion.li key={skill}
          initial={reduceMotion ? false : { opacity: 0, x: theme === 'light' ? 0 : -12, y: theme === 'light' ? 10 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: .45, delay: index * .025 }}
        ><Check size={17} aria-hidden="true"/><span>{skill}</span></motion.li>)}</ul>
      </div>
    </section>
  );
}
