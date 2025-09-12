<<<<<<< HEAD:src/components/ui/Input.jsx
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Input = forwardRef(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            'flex h-14 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 py-3',
            'text-base placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all touch-none',
            {
              'border-destructive-500 focus:ring-destructive-500': error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn('mt-2 text-sm font-medium', error ? 'text-destructive-500' : 'text-neutral-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
=======
import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            'flex h-14 w-full rounded-lg border-2 border-neutral-300 bg-white px-4 py-3',
            'text-base placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all touch-none',
            {
              'border-destructive-500 focus:ring-destructive-500': error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn('mt-2 text-sm font-medium', error ? 'text-destructive-500' : 'text-neutral-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

>>>>>>> 2ffbfae (Initial commit: NutureTable project setup):src/components/ui/Input.tsx
