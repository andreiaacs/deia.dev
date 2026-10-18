import { useParams } from 'react-router';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { PageMeta } from '@/components/layout/PageMeta';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs, Container, TagList } from '@/components/ui/primitives';
import { posts } from '@/content/posts';
import { formatDate } from '@/lib/format';
import { paths } from '@/lib/paths';
import NotFoundPage from './NotFoundPage';
import styles from './pages.module.css';

export default function PostPage() {
  const { postSlug } = useParams();
  const post = posts.find((item) => item.slug === postSlug);
  if (!post) return <NotFoundPage />;

  return (
    <Container className={styles.page}>
      <PageMeta title={post.title} description={post.summary} />
      <article className={styles.article}>
        <header className={styles.pageHeader}>
          <Breadcrumbs items={[{ label: 'Blog', to: paths.blog() }, { label: post.title }]} />
          <h1 className={styles.pageTitle}>{post.title}</h1>
          <p className={styles.lead}>{post.summary}</p>
          <div className={styles.articleMeta}>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingMinutes} min de leitura</span>
          </div>
          <TagList items={post.tags} variant="neutral" />
        </header>
        <ContentRenderer blocks={post.blocks} />
        <div className={styles.sectionGap}>
          <Button to={paths.blog()} variant="outline" icon="arrowLeft" iconPosition="start">
            Voltar para o blog
          </Button>
        </div>
      </article>
    </Container>
  );
}
