import { Link } from 'react-router';
import { PageMeta } from '@/components/layout/PageMeta';
import { Card, Container, Tag, TagList } from '@/components/ui/primitives';
import { posts } from '@/content/posts';
import { siteFeatures } from '@/content/site';
import { UnderConstruction } from '@/features/blog/UnderConstruction';
import { formatDate } from '@/lib/format';
import { paths } from '@/lib/paths';
import styles from './pages.module.css';

export default function BlogPage() {
  return (
    <Container className={styles.page}>
      <PageMeta title="Blog" description="Textos sobre tecnologia, ensino, produto e IA." />
      <header className={styles.pageHeader}>
        <Tag eyebrow>Blog</Tag>
        <h1 className={styles.pageTitle}>
          Ideias, aprendizados e <em>bastidores</em>
        </h1>
        <p className={styles.lead}>
          O que aprendo construindo produtos e dando aulas, escrito para quem está no mesmo caminho.
        </p>
      </header>

      {siteFeatures.blogPosts ? (
        <div className={styles.grid2}>
          {posts.map((post) => (
            <Card as="article" key={post.slug} interactive className={styles.postCard}>
              <div className={styles.articleMeta}>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">•</span>
                <span>{post.readingMinutes} min de leitura</span>
              </div>
              <h2>
                <Link to={paths.post(post.slug)}>{post.title}</Link>
              </h2>
              <p>{post.summary}</p>
              <TagList items={post.tags} variant="neutral" />
            </Card>
          ))}
        </div>
      ) : (
        <UnderConstruction />
      )}
    </Container>
  );
}
