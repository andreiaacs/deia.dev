import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Layout.module.css';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Links como "#projetos" rolam até a seção correspondente.
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <>
      <a href="#conteudo" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <ScrollToTop />
      <Header />
      <main id="conteudo" className={styles.main} tabIndex={-1}>
        <Suspense fallback={<div className={styles.loading} aria-busy="true" aria-label="Carregando" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
