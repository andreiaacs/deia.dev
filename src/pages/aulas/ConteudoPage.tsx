import { Suspense } from 'react';
import { useParams } from 'react-router';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { PageMeta } from '@/components/layout/PageMeta';
import { Breadcrumbs } from '@/components/ui/primitives';
import { findConteudo } from '@/content/conteudos';
import { ConteudoHero, ConteudoShell } from '@/features/conteudos/ConteudoShell';
import { interactiveContent } from '@/features/conteudos/registry';
import { paths } from '@/lib/paths';
import NotFoundPage from '../NotFoundPage';

/** Página de um conteúdo: de texto (blocos) ou interativo (componente registrado). */
export default function ConteudoPage() {
  const { slug } = useParams();
  const conteudo = findConteudo(slug);
  if (!conteudo) return <NotFoundPage />;

  const Interactive = conteudo.type === 'interativo' ? interactiveContent[conteudo.slug] : undefined;
  if (conteudo.type === 'interativo' && !Interactive) return <NotFoundPage />;

  return (
    <ConteudoShell>
      <PageMeta title={conteudo.title} description={conteudo.summary} />
      <ConteudoHero
        breadcrumbs={
          <Breadcrumbs items={[{ label: 'Aulas', to: paths.aulas() }, { label: conteudo.title }]} />
        }
        title={conteudo.title}
        description={conteudo.summary}
        chips={conteudo.tags}
      />
      {conteudo.type === 'texto' ? (
        <ContentRenderer blocks={conteudo.blocks} />
      ) : (
        Interactive && (
          <Suspense fallback={<p aria-busy="true">Carregando…</p>}>
            <Interactive />
          </Suspense>
        )
      )}
    </ConteudoShell>
  );
}
