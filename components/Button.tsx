import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-surface border-accent hover:bg-accent/90 focus-visible:ring-accent/30',
  secondary:
    'bg-transparent text-text-primary border-border hover:bg-text-primary/5 focus-visible:ring-text-primary/20'
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-4',
        variants[variant],
        className
      ]
        .join(' ')
        .trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
