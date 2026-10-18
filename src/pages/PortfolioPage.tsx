import { Container } from '@/components/ui/primitives';
import { PageMeta } from '@/components/layout/PageMeta';
import { profile } from '@/content/profile';
import { siteFeatures } from '@/content/site';
import { BeyondTech, QuoteCard, Timeline } from '@/features/portfolio/AboutSections';
import { PortfolioHero } from '@/features/portfolio/PortfolioHero';
import { FeaturedProjects, OtherProjects, TechStack } from '@/features/portfolio/ProjectSections';
import { cx } from '@/lib/cx';
import { paths } from '@/lib/paths';
import styles from './pages.module.css';

export default function PortfolioPage() {
  return (
    <Container className={styles.page}>
      <PageMeta
        title="Portfólio"
        description="Projetos de produto, APIs e IA liderados e desenvolvidos pela Andréia Alencar."
      />
      <PortfolioHero
        title={
          <>
            Projetos que <em>resolvem</em> problemas reais
          </>
        }
        intro={[...profile.intro]}
        primaryAction={{ label: 'Ver meus projetos', to: '#projetos' }}
        secondaryAction={{ label: 'Conheça minha trajetória', to: paths.about() }}
      />

      <div className={styles.stack}>
        <div
          id="projetos"
          className={cx(styles.rowProjects, !siteFeatures.featuredProjects && styles.rowProjectsCompact)}
        >
          {siteFeatures.featuredProjects && <FeaturedProjects showAllLink={false} />}
          <OtherProjects />
          <TechStack />
        </div>
        <div className={styles.rowAbout}>
          <Timeline />
          <QuoteCard />
          <BeyondTech />
        </div>
      </div>
    </Container>
  );
}
