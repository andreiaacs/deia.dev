import { PageMeta } from '@/components/layout/PageMeta';
import { Button } from '@/components/ui/Button';
import { Container, EmptyState } from '@/components/ui/primitives';
import { paths } from '@/lib/paths';

export default function NotFoundPage() {
  return (
    <Container>
      <PageMeta title="Página não encontrada" />
      <EmptyState
        image="/images/cockatiel-dica.webp"
        title="Ops, essa página voou para longe"
        description="O endereço pode ter mudado ou a página ainda não foi publicada."
        action={
          <Button to={paths.home()} icon="home" iconPosition="start">
            Voltar ao início
          </Button>
        }
      />
    </Container>
  );
}
