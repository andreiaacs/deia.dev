import type { ContentBlock } from '@/content/types';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/ui/Icon';
import { CodeBlock } from './CodeBlock';
import { LinkedListDiagram, QueueDiagram, StackDiagram } from './Diagrams';
import { RichText } from './RichText';
import styles from './ContentRenderer.module.css';

interface ContentRendererProps {
  blocks: ContentBlock[];
  className?: string;
}

/** Transforma os blocos de conteúdo tipados em HTML semântico. */
export function ContentRenderer({ blocks, className }: ContentRendererProps) {
  return (
    <div className={cx(styles.prose, className)}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

const calloutIcons = { tip: 'lightbulb', info: 'book', warning: 'star' } as const;

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case 'heading':
      return <h3>{block.text}</h3>;
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag className={cx(block.variant === 'check' && styles.checkList)}>
          {block.items.map((item) => (
            <li key={item}>
              {block.variant === 'check' && <Icon name="check" size={16} className={styles.checkIcon} />}
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ListTag>
      );
    }
    case 'code':
      return <CodeBlock code={block.code} language={block.language} title={block.title} />;
    case 'callout':
      return (
        <aside className={cx(styles.callout, styles[block.tone])}>
          <Icon name={calloutIcons[block.tone]} size={20} />
          <div>
            {block.title && <strong className={styles.calloutTitle}>{block.title}</strong>}
            <p>
              <RichText text={block.text} />
            </p>
          </div>
        </aside>
      );
    case 'linkedList':
      return <LinkedListDiagram values={block.values} caption={block.caption} />;
    case 'stack':
      return <StackDiagram values={block.values} caption={block.caption} />;
    case 'queue':
      return <QueueDiagram values={block.values} caption={block.caption} />;
    case 'table':
      return (
        <div className={styles.tableWrapper}>
          <table>
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'image':
      return (
        <figure className={styles.image}>
          <img src={block.src} alt={block.alt} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    default: {
      // Garante em tempo de compilação que todo tipo de bloco foi tratado.
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}
