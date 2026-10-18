import { Link } from 'react-router';
import { Icon } from '@/components/ui/Icon';
import { profile } from '@/content/profile';
import { siteFeatures } from '@/content/site';
import { paths } from '@/lib/paths';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo inverted />
          <p className={styles.tagline}>// tecnologia para pessoas reais ♡</p>
        </div>

        <nav aria-label="Rodapé">
          <ul className={styles.links}>
            <li>
              <Link to={paths.about()}>Sobre mim</Link>
            </li>
            {siteFeatures.portfolio && (
              <li>
                <Link to={paths.portfolio()}>Portfólio</Link>
              </li>
            )}
            <li>
              <Link to={paths.aulas()}>Aulas</Link>
            </li>
            <li>
              <Link to={paths.blog()}>Blog</Link>
            </li>
            <li>
              <Link to={paths.contact()}>Contato</Link>
            </li>
          </ul>
        </nav>

        <ul className={styles.social}>
          <li>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          </li>
          <li>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.contact.email}`} aria-label="E-mail">
              <Icon name="mail" />
            </a>
          </li>
        </ul>
      </div>
      <p className={styles.copy}>
        © {year} {profile.name}. Feito com curiosidade, prática e muito café.
      </p>
    </footer>
  );
}
