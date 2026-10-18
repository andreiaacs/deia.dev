import { PageMeta } from '@/components/layout/PageMeta';
import { Card, Container, HandNote, IconBadge, Tag } from '@/components/ui/primitives';
import type { IconName } from '@/components/ui/Icon';
import { profile } from '@/content/profile';
import type { Tone } from '@/content/types';
import styles from './pages.module.css';

const channels: Array<{ icon: IconName; tone: Tone; label: string; value: string; href: string }> = [
  {
    icon: 'mail',
    tone: 'purple',
    label: 'E-mail',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    icon: 'linkedin',
    tone: 'blue',
    label: 'LinkedIn',
    value: 'Vamos nos conectar',
    href: profile.contact.linkedin,
  },
  {
    icon: 'github',
    tone: 'lime',
    label: 'GitHub',
    value: 'Código dos projetos e das aulas',
    href: profile.contact.github,
  },
];

export default function ContactPage() {
  return (
    <Container className={styles.page}>
      <PageMeta title="Contato" description={`Fale com ${profile.name}.`} />
      <header className={styles.pageHeader}>
        <Tag eyebrow>Contato</Tag>
        <h1 className={styles.pageTitle}>
          Vamos <em>conversar</em>?
        </h1>
        <p className={styles.lead}>
          Projetos, mentorias, palestras ou dúvidas sobre as aulas: escolha o canal que preferir.
        </p>
        <HandNote size="1.5rem" rotate={-2}>
          respondo assim que possível ♡
        </HandNote>
      </header>

      <ul className={styles.contactGrid}>
        {channels.map((channel) => {
          const external = channel.href.startsWith('http');
          return (
            <li key={channel.label}>
              <Card interactive>
                <a
                  href={channel.href}
                  className={styles.contactItem}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <IconBadge icon={channel.icon} tone={channel.tone} size={52} />
                  <span>
                    <strong>{channel.label}</strong>
                    <span>{channel.value}</span>
                  </span>
                </a>
              </Card>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
