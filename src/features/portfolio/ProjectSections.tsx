import { Link } from 'react-router';
import { Icon } from '@/components/ui/Icon';
import { Card, IconBadge, SectionHeader, Tag, TagList } from '@/components/ui/primitives';
import { technologies } from '@/content/profile';
import { featuredProjects, sideProjects } from '@/content/projects';
import type { Project } from '@/content/types';
import { paths } from '@/lib/paths';
import styles from './ProjectSections.module.css';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" padded={false} interactive className={styles.projectCard}>
      {project.image && (
        <img
          src={project.image}
          alt={project.imageAlt ?? ''}
          className={styles.projectImage}
          loading="lazy"
          width={291}
          height={103}
        />
      )}
      <div className={styles.projectBody}>
        <Tag eyebrow>{project.labels.join(' • ')}</Tag>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectText}>{project.description}</p>
        <div className={styles.projectFooter}>
          <TagList items={project.stack} />
          <span className={styles.roundArrow} aria-hidden="true">
            <Icon name="arrowRight" size={18} />
          </span>
        </div>
      </div>
    </Card>
  );
}

export function FeaturedProjects({ showAllLink = true }: { showAllLink?: boolean }) {
  return (
    <Card as="section" aria-labelledby="projetos-destaque" className={styles.featured}>
      <SectionHeader
        id="projetos-destaque"
        title={
          <>
            Projetos em destaque <span className={styles.spark} aria-hidden="true" />
          </>
        }
        link={showAllLink ? { to: paths.portfolio(), label: 'Ver todos os projetos' } : undefined}
      />
      <div className={styles.projectGrid}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Card>
  );
}

export function OtherProjects() {
  return (
    <Card as="section" aria-labelledby="outros-projetos">
      <SectionHeader id="outros-projetos" title="Outros projetos" />
      <ul className={styles.otherList}>
        {sideProjects.map((project) => (
          <li key={project.title}>
            <Link to={project.href} className={styles.otherItem}>
              <IconBadge icon={project.icon} tone={project.tone} size={44} />
              <span className={styles.otherText}>
                <strong>{project.title}</strong>
                <span>{project.description}</span>
              </span>
              <span className={styles.smallArrow} aria-hidden="true">
                <Icon name="arrowRight" size={14} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function TechStack() {
  return (
    <section aria-labelledby="tecnologias" className={styles.tech}>
      <h2 id="tecnologias" className={styles.techTitle}>
        Tecnologias que fazem parte da minha jornada
        <Icon name="star" size={26} className={styles.techStar} />
      </h2>
      <ul className={styles.techList}>
        {technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <p className={styles.techMore}>e muitas outras…</p>
    </section>
  );
}
