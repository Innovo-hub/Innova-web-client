/* eslint-disable react/prop-types */
import { clsx } from 'clsx';

export function Card({ className, children }) {
  return (
    <div className={clsx('bg-white rounded-xl shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={clsx('p-6', className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }) {
  return (
    <div className={clsx('p-6 space-y-6', className)}>
      {children}
    </div>
  );
}