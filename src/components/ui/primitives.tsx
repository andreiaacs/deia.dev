import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import type { Tone } from '@/content/types';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from './Icon';
import styles from './primitives.module.css';

/* ------------------------------------------------------------------ */

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.container, className)} {...rest} />;
}

/* ------------------------------------------------------------------ */

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  padded?: boolean;
  interactive?: boolean;
}

export function Card({ as: Tag = 'div', padded = true, interactive, className, ...rest }: CardProps) {
  return (
    <Tag
      className={cx(
        styles.card,
        padded && styles.cardPadded,
        interactive && styles.cardInteractive,
        className,
      )}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------------ */

type TagVariant = 'primary' | 'neutral' | 'success' | 'danger' | 'lime';

const tagVariants: Record<TagVariant, string | undefined> = {
  primary: undefined,
  neutral: styles.tagNeutral,
  success: styles.tagSuccess,
  danger: styles.tagDanger,
  lime: styles.tagLime,
};

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  eyebrow?: boolean;
  className?: string;
}

export function Tag({ children, variant = 'primary', eyebrow, className }: TagProps) {
  return (
    <span className={cx(styles.tag, tagVariants[variant], eyebrow && styles.tagEyebrow, className)}>
      {children}
    </span>
  );
}

export function TagList({ items, variant }: { items: string[]; variant?: TagVariant }) {
  return (
    <ul className={styles.tagList}>
      {items.map((item) => (
        <li key={item}>
          <Tag variant={variant}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */

interface IconBadgeProps {
  icon: IconName;
  tone?: Tone;
  size?: number;
  className?: string;
}

/** Ícone dentro de um quadrado colorido, como nos cards do protótipo. */
export function IconBadge({ icon, tone = 'purple', size = 56, className }: IconBadgeProps) {
  return (
    <span
      className={cx(styles.iconBadge, styles[`tone-${tone}`], className)}
      style={{ width: size, height: size }}
    >
      <Icon name={icon} size={Math.round(size * 0.48)} />
    </span>
  );
}

/* ------------------------------------------------------------------ */

interface ProgressBarProps {
  value: number;
  label: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({ value, label, showValue = true, className }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100);
  return (
    <div className={cx(styles.progress, className)}>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
      {showValue && <span aria-hidden="true">{percent}%</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface HandNoteProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: string;
  rotate?: number;
}

/** Texto manuscrito decorativo (fonte Caveat). */
export function HandNote({ size = '1.5rem', rotate = 0, style, className, ...rest }: HandNoteProps) {
  return (
    <p
      className={cx(styles.handNote, className)}
      style={{ fontSize: size, transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------------ */

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Você está em" className={cx(styles.breadcrumbs, className)}>
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast && <Icon name="chevronRight" size={12} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  title: ReactNode;
  id?: string;
  as?: 'h2' | 'h3';
  link?: { to: string; label: string };
  className?: string;
}

export function SectionHeader({ title, id, as: Heading = 'h2', link, className }: SectionHeaderProps) {
  return (
    <div className={cx(styles.sectionHeader, className)}>
      <Heading id={id} className={styles.sectionTitle}>
        {title}
      </Heading>
      {link && (
        <Link to={link.to} className={styles.sectionLink}>
          {link.label}
          <Icon name="arrowRight" size={16} />
        </Link>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  image?: string;
}

export function EmptyState({ title, description, action, image }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      {image && <img src={image} alt="" width={96} height={110} />}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
