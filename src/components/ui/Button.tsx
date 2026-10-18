import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from './Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { to: string; href?: never };
type ButtonAsAnchor = CommonProps & { href: string; to?: never };
type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: never;
    href?: never;
  };

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

/** Botão único do site: vira `<Link>`, `<a>` ou `<button>` conforme as props. */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'end',
    className,
    children,
  } = props;

  const classes = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {icon && iconPosition === 'start' && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <Icon name={icon} size={18} />}
    </>
  );

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href !== undefined) {
    const isExternal = /^https?:\/\//.test(props.href);
    return (
      <a
        href={props.href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  const {
    variant: _variant,
    size: _size,
    icon: _icon,
    iconPosition: _iconPosition,
    className: _className,
    children: _children,
    to: _to,
    href: _href,
    type = 'button',
    ...buttonProps
  } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
