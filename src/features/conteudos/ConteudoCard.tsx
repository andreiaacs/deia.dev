import { Link } from 'react-router';
import { Icon } from '@/components/ui/Icon';
import { Card, IconBadge, TagList } from '@/components/ui/primitives';
import type { Conteudo } from '@/content/types';
import { paths } from '@/lib/paths';
import styles from './ConteudoCard.module.css';

export function ConteudoCard({ conteudo }: { conteudo: Conteudo }) {
  return (
    <Card as="article" interactive className={styles.card}>
      <IconBadge icon={conteudo.icon} tone={conteudo.tone} size={64} />
      <div className={styles.body}>
        <h3 className={styles.title}>
          {/* O link cobre o card inteiro (ver ::after no CSS). */}
          <Link to={paths.conteudo(conteudo.slug)} className={styles.link}>
            {conteudo.title}
          </Link>
        </h3>
        <p className={styles.summary}>{conteudo.summary}</p>
        <div className={styles.footer}>
          <TagList items={conteudo.tags} variant="neutral" />
          <span className={styles.arrow} aria-hidden="true">
            <Icon name="arrowRight" size={16} />
          </span>
        </div>
      </div>
    </Card>
  );
}
