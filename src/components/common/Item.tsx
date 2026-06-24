import React from 'react';
import { cn } from '@/lib/utils';

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 p-3 rounded-[1.25rem] bg-[#FDFDFD]/40 border border-[#392B28]/5 transition-all active:scale-[0.98] cursor-pointer hover:bg-[#FDFDFD]/60",
        className
      )}
      {...props}
    />
  )
);

interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'image' | 'icon';
}

export const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant = 'image', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-shrink-0 flex items-center justify-center overflow-hidden",
        variant === 'image' ? "w-11 h-11 rounded-2xl shadow-sm" : "w-10 h-10 rounded-xl bg-[#392B28]/[0.05]",
        className
      )}
      {...props}
    />
  )
);

export const ItemContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 flex flex-col gap-0.5 min-w-0", className)} {...props} />
);

export const ItemTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-[13px] font-black text-[#392B28] leading-tight truncate", className)} {...props} />
);

export const ItemDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-[11px] font-semibold text-[#392B28]/40 leading-snug truncate", className)} {...props} />
);
