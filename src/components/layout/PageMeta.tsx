const SITE_NAME = 'deia.dev';

interface PageMetaProps {
  title?: string;
  description?: string;
}

/**
 * Título e descrição da página. O React 19 move `<title>` e `<meta>`
 * para o `<head>` automaticamente.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  return (
    <>
      <title>{title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Andréia Alencar`}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
