import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '@/components/layout/Layout';
import { siteFeatures } from '@/content/site';

// Cada página vira um arquivo JS separado, carregado só quando é visitada.
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const PostPage = lazy(() => import('@/pages/PostPage'));
const AulasPage = lazy(() => import('@/pages/aulas/AulasPage'));
const ConteudoPage = lazy(() => import('@/pages/aulas/ConteudoPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sobre" element={<AboutPage />} />
        {siteFeatures.portfolio && <Route path="portfolio" element={<PortfolioPage />} />}
        <Route path="contato" element={<ContactPage />} />
        <Route path="blog" element={<BlogPage />} />
        {siteFeatures.blogPosts && <Route path="blog/:postSlug" element={<PostPage />} />}
        <Route path="aulas" element={<AulasPage />} />
        <Route path="aulas/:slug" element={<ConteudoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
