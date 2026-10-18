import { PageMeta } from '@/components/layout/PageMeta';
import { Container } from '@/components/ui/primitives';
import { profile } from '@/content/profile';
import { JourneyNumbers, MainTechnologies } from '@/features/about/AboutHighlights';
import { AboutHero } from '@/features/about/AboutHero';
import { CareerTimeline } from '@/features/about/CareerTimeline';
import { QuoteCard } from '@/features/portfolio/AboutSections';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <Container className={styles.page}>
      <PageMeta title="Sobre" description={`Quem é ${profile.name}: trajetória, tecnologias e valores.`} />
      <AboutHero />
      <CareerTimeline />
      <div className={styles.highlights}>
        <JourneyNumbers />
        <MainTechnologies />
        <QuoteCard />
      </div>
    </Container>
  );
}
