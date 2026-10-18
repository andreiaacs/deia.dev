# deia.dev

Site pessoal da Andréia Alencar: portfólio + área de aulas para alunos.

Feito com **React 19 + TypeScript + Vite**, rotas com **React Router 7**, estilos com
**CSS Modules** e testes com **Vitest + Testing Library**. Não há biblioteca de UI: os
componentes, ícones e tokens de design estão no próprio projeto.

## Começando

```bash
npm install
npm run dev        # http://localhost:5173
```

| Comando              | O que faz                                      |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento                    |
| `npm run build`      | Checa tipos e gera a versão de produção (`dist/`) |
| `npm run preview`    | Serve o `dist/` localmente                     |
| `npm run test`       | Testes em modo observação                      |
| `npm run check`      | Tipos + lint + testes (use antes de publicar)  |
| `npm run format`     | Formata o código com Prettier                  |

## Estrutura

```
src/
├── content/            # conteúdo do site (dados tipados)
│   ├── types.ts        # modelos: Conteudo, CareerItem, Post…
│   ├── conteudos.ts    # conteúdos para alunos (área Aulas)
│   ├── profile.ts      # seus dados, contatos, trajetória, tecnologias
│   ├── projects.ts     # projetos do portfólio (oculto por enquanto)
│   ├── posts.ts        # posts do blog (ocultos por enquanto)
│   └── site.ts         # liga/desliga seções do site
├── components/
│   ├── ui/             # Button, Tabs, Icon, Card, Tag…
│   ├── content/        # renderizador de blocos, código com realce, diagramas
│   └── layout/         # Header, Footer, Layout, PageMeta
├── features/
│   ├── about/          # página Sobre mim
│   ├── conteudos/      # layout dos conteúdos, card e registro dos interativos
│   ├── sorting/        # visualizador de algoritmos de ordenação
│   ├── blog/           # aviso "em construção"
│   └── portfolio/      # seções do portfólio
├── pages/              # uma página por rota (carregadas sob demanda)
├── hooks/  lib/  styles/
```

Princípios usados:

- **Conteúdo separado da interface.** Páginas só leem `src/content`. Publicar uma aula
  não exige mexer em componente nenhum.
- **Tipos fortes.** O modelo de conteúdo é tipado; um campo faltando ou um bloco com
  tipo errado vira erro de compilação.
- **Lógica em funções puras** (`src/lib`) e testada separadamente da interface.
- **Rotas centralizadas** em `src/lib/paths.ts`: nenhuma URL é montada à mão.
- **Acessibilidade:** HTML semântico, navegação por teclado nas abas e menus,
  link "pular para o conteúdo", `aria-*` nos componentes interativos e respeito a
  `prefers-reduced-motion`.
- **Responsivo** em todos os níveis: menu de celular, barra lateral recolhível e grades
  que se reorganizam.

## Rotas

| URL | Página |
| --- | --- |
| `/` | Início |
| `/sobre` | Sobre mim |
| `/aulas` | Lista de conteúdos para alunos |
| `/aulas/:slug` | Um conteúdo (ex.: `/aulas/algoritmos-de-ordenacao`) |
| `/blog` | Blog (aviso "em construção" por enquanto) |
| `/contato` | Contato |

## Conteúdos para alunos (Aulas)

Não há disciplinas, módulos nem sequência: cada conteúdo é independente e pode ser
publicado quando você quiser. Todos ficam em `src/content/conteudos.ts`.

### Conteúdo de texto

Adicione um item com `type: 'texto'` e os blocos:

```ts
{
  slug: 'pilhas',                      // vira /aulas/pilhas
  type: 'texto',
  title: 'Pilhas',
  summary: 'LIFO, implementação em Python e exemplos.',
  icon: 'database',
  tone: 'pink',
  tags: ['Estrutura de Dados', 'Python'],
  updatedAt: '2026-10-20',
  blocks: [
    { type: 'paragraph', text: 'Uma **pilha** segue a regra LIFO.' },
    { type: 'stack', values: ['A', 'B', 'C'] },
    { type: 'code', code: 'pilha = []\npilha.append(1)' },
  ],
},
```

Blocos disponíveis:

| Tipo | Uso |
| --- | --- |
| `paragraph` | Texto. Aceita `**negrito**`, `*itálico*` e `` `código` `` |
| `heading` | Subtítulo |
| `list` | Lista; `ordered: true` numera, `variant: 'check'` usa ✓ |
| `code` | Código com realce de Python e botão de copiar |
| `callout` | Destaque: `tone: 'tip' \| 'info' \| 'warning'` |
| `linkedList`, `stack`, `queue` | Diagramas prontos das estruturas lineares |
| `table` | Tabela com cabeçalho |
| `image` | Imagem com legenda (arquivo em `public/images/`) |

### Conteúdo interativo

Use `type: 'interativo'` (sem `blocks`) e registre o componente da página em
`src/features/conteudos/registry.ts`, pelo mesmo `slug`. Um teste garante que todo
conteúdo interativo tem componente registrado.

## Algoritmos de ordenação (visualizador)

A página `/aulas/algoritmos-de-ordenacao` mostra Bubble, Selection,
Insertion, Merge e Quick Sort ordenando passo a passo, com o código Python executando
linha a linha ao lado (no estilo do VisuAlgo).

- Algoritmo e tipo de dados ficam na URL: `?algoritmo=quick&dados=invertido`, então dá
  para mandar o link para a turma já no exemplo certo.
- Tipos de dados: aleatório, quase ordenado, invertido, poucos valores únicos e
  personalizado (o aluno digita os números).
- Atalhos: espaço toca/pausa, setas avançam/voltam, Home/End vão ao início/fim.

Como funciona: cada algoritmo em `src/features/sorting/algorithms/` é uma função pura que
recebe a lista e devolve **todos os passos** (estado da lista, linha do Python, variáveis,
comparações e trocas). A interface só navega pela lista de passos.

Para adicionar um algoritmo novo:

1. Crie `src/features/sorting/algorithms/meu-algoritmo.ts` com o código Python e a função
   `run`, chamando `r.step(linha, mensagem, { ... })` a cada linha executada.
2. Inclua-o em `algorithms/index.ts`.
3. Rode `npm test`: os testes verificam que ele ordena qualquer tipo de dado e que só
   aponta para linhas que existem no código.

## Antes de publicar

- As ilustrações em `public/images/` foram recortadas dos protótipos; substitua pelos
  arquivos originais em alta resolução mantendo os mesmos nomes.

## Deploy

É um site estático (`npm run build` → `dist/`). Como as rotas são do lado do cliente, o
servidor precisa devolver `index.html` para qualquer URL. Já estão incluídos:

- **Vercel:** `vercel.json`
- **Netlify:** `public/_redirects`

Em ambos, basta conectar o repositório; o comando de build é `npm run build` e a pasta
de saída é `dist`.
