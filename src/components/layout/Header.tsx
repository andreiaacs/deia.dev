import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Button } from '@/components/ui/Button';
import { siteFeatures } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/lib/cx';
import { paths } from '@/lib/paths';
import { Logo } from './Logo';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { to: paths.home(), label: 'Início', end: true },
  { to: paths.about(), label: 'Sobre mim' },
  ...(siteFeatures.portfolio ? [{ to: paths.portfolio(), label: 'Portfólio' }] : []),
  { to: paths.aulas(), label: 'Aulas' },
  { to: paths.blog(), label: 'Blog' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Fecha o menu ao trocar de página.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fecha com Esc e trava a rolagem do fundo enquanto o menu está aberto.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={paths.home()} className={styles.logoLink} aria-label="deia.dev, página inicial">
          <Logo />
        </Link>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={cx(styles.nav, open && styles.navOpen)}
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => cx(styles.navLink, isActive && styles.navLinkActive)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to={paths.contact()} icon="arrowRight" className={styles.mobileContact}>
            Contato
          </Button>
        </nav>

        <div className={styles.actions}>
          <Button to={paths.contact()} icon="arrowRight" className={styles.desktopContact}>
            Contato
          </Button>
          <button
            type="button"
            className={cx(styles.iconButton, styles.menuButton)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
