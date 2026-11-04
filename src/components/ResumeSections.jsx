import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Award, GraduationCap, Trophy, Users } from 'lucide-react';
import { experience, education, achievements } from '../content';
import './ResumeSections.css';

function ResumeReveal({ children, className, theme = 'dark', index = 0 }) {
  const reduceMotion = useReducedMotion();
  return <motion.div
    className={className}
    initial={reduceMotion ? false : theme === 'dark' ? { opacity: 0, y: 28 } : { opacity: 0, y: 16, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}

export function Experience({ theme = 'dark' }) {
  return <section id="experience" className="resume-experience resume-section section-wrap" aria-labelledby="experience-heading">
    <ResumeReveal theme={theme} className="resume-section-heading experience-heading">
      <p className="eyebrow"><span/> EXPERIENCE</p>
      <h2 id="experience-heading">Work<br/><span>experience.</span></h2>
      <p className="resume-section-subtitle">CognioLabs · Dehix.org</p>
    </ResumeReveal>
    <div className="experience-timeline">
      {experience.map((entry, index) => <ResumeReveal key={entry.company} theme={theme} index={index} className="experience-entry">
        <span className="experience-timeline-dot" aria-hidden="true"/>
        <div className="experience-card">
          <div className="experience-card-top"><span className="experience-company">{entry.company}</span><span className="resume-date">{entry.dates}</span></div>
          <h3>{entry.role}</h3>
          <ul>{entry.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
          {entry.evidence && <a className="resume-evidence-link" href={entry.evidence} target="_blank" rel="noreferrer">View document <ArrowUpRight size={15}/><span className="resume-sr-only"> for {entry.company}</span></a>}
        </div>
      </ResumeReveal>)}
    </div>
  </section>;
}

export function Education({ theme = 'dark' }) {
  return <section id="education" className="resume-education resume-section section-wrap" aria-labelledby="education-heading">
    <ResumeReveal theme={theme} className="resume-section-heading resume-heading-row">
      <div><p className="eyebrow"><span/> EDUCATION</p><h2 id="education-heading">Education.</h2></div>
      <GraduationCap className="resume-heading-icon" size={42} strokeWidth={1} aria-hidden="true"/>
    </ResumeReveal>
    <div className="education-grid">
      {education.map((entry, index) => <ResumeReveal key={entry.qualification} theme={theme} index={index} className="education-card">
        <div className="education-card-top"><span className="resume-card-index" aria-hidden="true">0{index + 1}</span><span className="resume-date">{entry.dates}</span></div>
        <h3>{entry.qualification}</h3>
        <p>{entry.institution}</p>
        <span className="education-result">{entry.result}</span>
      </ResumeReveal>)}
    </div>
  </section>;
}

const achievementIcons = [Award, Trophy, Users];
const achievementLabels = ['View credential', 'View recognition', 'View document'];

export function Achievements({ theme = 'dark' }) {
  return <section id="achievements" className="resume-achievements resume-section section-wrap" aria-labelledby="achievements-heading">
    <ResumeReveal theme={theme} className="resume-section-heading">
      <p className="eyebrow"><span/> CERTIFICATIONS & ACHIEVEMENTS</p>
      <h2 id="achievements-heading">Certifications<br/>& <span>achievements.</span></h2>
    </ResumeReveal>
    <div className="achievements-grid">
      {achievements.map((entry, index) => {
        const Icon = achievementIcons[index] || Award;
        return <ResumeReveal key={entry.title} theme={theme} index={index} className="achievement-card">
          <div className="achievement-card-top"><span className="achievement-icon"><Icon size={23} strokeWidth={1.4} aria-hidden="true"/></span><span className="resume-date">{entry.dates}</span></div>
          <span className="achievement-organization">{entry.organization}</span>
          <h3>{entry.title}</h3>
          <p>{entry.description}</p>
          {entry.link && <a className="resume-evidence-link" href={entry.link} target="_blank" rel="noreferrer">{achievementLabels[index] || 'View document'} <ArrowUpRight size={15}/><span className="resume-sr-only"> for {entry.title}</span></a>}
        </ResumeReveal>;
      })}
    </div>
  </section>;
}
