import { Link } from 'react-router';
import { PageMeta } from '@/components/layout/PageMeta';
import { Card, Container, SectionHeader, Tag } from '@/components/ui/primitives';
import { conteudosRecentes } from '@/content/conteudos';
import { posts } from '@/content/posts';
import { siteFeatures } from '@/content/site';
import { ConteudoCard } from '@/features/conteudos/ConteudoCard';
import { PortfolioHero } from '@/features/portfolio/PortfolioHero';
import { FeaturedProjects } from '@/features/portfolio/ProjectSections';
import { formatDate } from '@/lib/format';
import { paths } from '@/lib/paths';
import styles from './pages.module.css';

export default function HomePage() {
  return (
    <Container className={styles.page}>
      <PageMeta description="Site da Andréia Alencar: trajetória e materiais de aula de programação, estrutura de dados e IA." />
      <PortfolioHero
        title={
          <>
            Tecnologia, ensino e <em>pessoas</em>
          </>
        }
        intro={[
          'Oi, eu sou a Déia! Sou engenheira de software, tech lead e professora de graduação.',
          'Aqui reúno minha trajetória e conteúdos para os meus alunos, com exemplos e visualizações interativas.',
        ]}
        primaryAction={{ label: 'Ver as aulas', to: paths.aulas() }}
        secondaryAction={{ label: 'Sobre mim', to: paths.about() }}
      />

      <section aria-labelledby="para-alunos">
        <SectionHeader
          id="para-alunos"
          title="Para alunos"
          link={{ to: paths.aulas(), label: 'Ver todos os conteúdos' }}
        />
        <div className={styles.grid2}>
          {conteudosRecentes().map((conteudo) => (
            <ConteudoCard key={conteudo.slug} conteudo={conteudo} />
          ))}
        </div>
      </section>

      {siteFeatures.featuredProjects && (
        <div className={styles.sectionGap}>
          <FeaturedProjects />
        </div>
      )}

      {siteFeatures.blogPosts && (
        <section aria-labelledby="do-blog" className={styles.sectionGap}>
          <SectionHeader id="do-blog" title="Do blog" link={{ to: paths.blog(), label: 'Ver todos os posts' }} />
          <div className={styles.grid2}>
            {posts.slice(0, 2).map((post) => (
              <Card as="article" key={post.slug} interactive className={styles.postCard}>
                <div className={styles.articleMeta}>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <Tag variant="neutral">{post.readingMinutes} min de leitura</Tag>
                </div>
                <h3>
                  <Link to={paths.post(post.slug)}>{post.title}</Link>
                </h3>
                <p>{post.summary}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
