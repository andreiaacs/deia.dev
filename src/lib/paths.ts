/**
 * Construtores de URL do site. Use sempre estas funções em vez de
 * montar strings à mão, assim uma mudança de rota acontece em um só lugar.
 */
export const paths = {
  home: () => '/',
  about: () => '/sobre',
  portfolio: () => '/portfolio',
  contact: () => '/contato',
  blog: () => '/blog',
  post: (slug: string) => `/blog/${slug}`,
  aulas: () => '/aulas',
  conteudo: (slug: string) => `/aulas/${slug}`,
};
