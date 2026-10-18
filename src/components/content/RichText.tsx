import { parseInline } from '@/lib/inline';

/** Renderiza uma string com `**negrito**`, `*itálico*` e `` `código` ``. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((node, index) => {
        switch (node.kind) {
          case 'strong':
            return <strong key={index}>{node.value}</strong>;
          case 'em':
            return <em key={index}>{node.value}</em>;
          case 'code':
            return <code key={index}>{node.value}</code>;
          default:
            return <span key={index}>{node.value}</span>;
        }
      })}
    </>
  );
}
