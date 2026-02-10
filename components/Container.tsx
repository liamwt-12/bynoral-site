import type { ElementType, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  className = '',
  as: Component = 'div'
}: ContainerProps) {
  return (
    <Component className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`.trim()}>
      {children}
    </Component>
  );
}
