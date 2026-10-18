import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { HandNote, Tag } from '@/components/ui/primitives';
import { profile } from '@/content/profile';
import { CodeCard, MottoNote } from './Decorations';
import { HighlightStats } from './HighlightStats';
import styles from './PortfolioHero.module.css';

interface PortfolioHeroProps {
  title: ReactNode;
  intro: string[];
  primaryAction: { label: string; to: string };
  secondaryAction: { label: string; to: string };
}

/** Topo das páginas Início e Portfólio: texto, ilustração e destaques. */
export function PortfolioHero({ title, intro, primaryAction, secondaryAction }: PortfolioHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.text}>
        <Tag eyebrow>{profile.roles.join(' • ')}</Tag>
        <h1 id="hero-title" className={styles.title}>
          {title}
        </h1>
        <div className={styles.intro}>
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.actions}>
          <Button to={primaryAction.to} variant="accent" icon="arrowRight">
            {primaryAction.label}
          </Button>
          <Button to={secondaryAction.to} variant="outline">
            {secondaryAction.label}
          </Button>
        </div>
        <div className={styles.signature}>
          <span className={styles.signatureIcon} aria-hidden="true">
            {'{'}·{'}'}
          </span>
          <HandNote size="1.35rem" rotate={-6}>
            {'// tecnologia'}
            <br />
            para pessoas reais ♡
          </HandNote>
        </div>
      </div>

      <figure className={styles.portrait}>
        <img
          src="/images/hero-deia.webp"
          alt="Ilustração da Déia de fones de ouvido trabalhando no notebook, com uma calopsita no ombro e livros de código, ideias e pessoas"
          width={806}
          height={810}
          fetchPriority="high"
        />
        <HandNote size="1.4rem" rotate={-10} className={styles.portraitNote} aria-hidden="true">
          aprender
          <br />
          construir
          <br />
          compartilhar
          <br />
          evoluir ♡
        </HandNote>
      </figure>

      <HighlightStats className={styles.stats} />

      <div className={styles.decor} aria-hidden="true">
        <MottoNote />
        <CodeCard />
      </div>
    </section>
  );
}
