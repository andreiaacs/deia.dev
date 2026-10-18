import { PageMeta } from '@/components/layout/PageMeta';
import { Container, HandNote, Tag } from '@/components/ui/primitives';
import { conteudosRecentes } from '@/content/conteudos';
import { ConteudoCard } from '@/features/conteudos/ConteudoCard';
import styles from './AulasPage.module.css';

export default function AulasPage() {
  return (
    <Container className={styles.page}>
      <PageMeta
        title="Aulas"
        description="Conteúdos, exemplos e visualizações interativas para estudar no seu ritmo."
      />

      <section className={styles.hero} aria-labelledby="aulas-titulo">
        <div className={styles.heroText}>
          <Tag eyebrow>Para alunos</Tag>
          <h1 id="aulas-titulo" className={styles.title}>
            Aprender também é construir o <span className={styles.highlight}>futuro.</span>
          </h1>
          <p className={styles.lead}>
            Aqui você encontra conteúdos, exemplos e visualizações interativas para estudar no seu
            ritmo, na ordem que quiser.
          </p>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <HandNote size="1.55rem" rotate={-8} className={styles.heroNote}>
            mesma lógica de sempre: curiosidade + prática = evolução
          </HandNote>
          <img src="/images/cockatiel-laptop.webp" alt="" width={125} height={155} />
        </div>
      </section>

      <div className={styles.grid}>
        {conteudosRecentes().map((conteudo) => (
          <ConteudoCard key={conteudo.slug} conteudo={conteudo} />
        ))}
      </div>
    </Container>
  );
}
