import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { Icon } from '@/components/ui/Icon';
import { Container, HandNote } from '@/components/ui/primitives';
import { conteudosRecentes } from '@/content/conteudos';
import { cx } from '@/lib/cx';
import { paths } from '@/lib/paths';
import styles from './ConteudoShell.module.css';

const SIDE_NOTE = 'Escolha um conteúdo e explore no seu ritmo!';

/** Layout das páginas de conteúdo: barra lateral com todos os conteúdos + página. */
export function ConteudoShell({ children }: { children: ReactNode }) {
  return (
    <Container className={styles.page}>
      <div className={styles.shell}>
        <ConteudosNav />
        <div className={styles.main}>{children}</div>
      </div>
    </Container>
  );
}

function ConteudosNav() {
  const [open, setOpen] = useState(false);
  const items = conteudosRecentes();

  return (
    <aside className={styles.sidebar} aria-label="Conteúdos">
      <div className={styles.card}>
        <Link to={paths.aulas()} className={styles.back}>
          <Icon name="arrowLeft" size={16} />
          Voltar para Aulas
        </Link>

        <div className={styles.course}>
          <Icon name="graduation" size={40} strokeWidth={1.8} className={styles.courseIcon} />
          <p className={styles.courseTitle}>Conteúdos</p>
        </div>
        <p className={styles.tagline}>Materiais, exemplos e visualizações para estudar no seu ritmo.</p>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="lista-conteudos"
          onClick={() => setOpen((value) => !value)}
        >
          Ver conteúdos
          <Icon name="chevronDown" size={16} />
        </button>

        <ul id="lista-conteudos" className={cx(styles.topics, open && styles.topicsOpen)}>
          {items.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={paths.conteudo(item.slug)}
                className={({ isActive }) => cx(styles.topic, isActive && styles.topicActive)}
              >
                <Icon name={item.icon} size={20} />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.note} aria-hidden="true">
        <HandNote size="1.3rem" rotate={-6} className={styles.noteText}>
          {SIDE_NOTE} ♡
        </HandNote>
        <img src="/images/cockatiel-dica.webp" alt="" width={70} height={108} className={styles.bird} />
      </div>
    </aside>
  );
}

interface ConteudoHeroProps {
  breadcrumbs: ReactNode;
  title: string;
  description: string;
  chips: string[];
}

/** Topo das páginas de conteúdo. */
export function ConteudoHero({ breadcrumbs, title, description, chips }: ConteudoHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroText}>
        {breadcrumbs}
        <h1 className={styles.heroTitle}>
          {title}
          <span className={styles.sparks} aria-hidden="true" />
        </h1>
        <p className={styles.heroLead}>{description}</p>
        <ul className={styles.chips}>
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
