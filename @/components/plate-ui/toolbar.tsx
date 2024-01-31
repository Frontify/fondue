'use client';

import * as React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn, withRef, withVariants } from '@udecode/cn';
import { cva, VariantProps } from 'class-variance-authority';

import { Icons } from '@/components/icons';

import { Separator } from './separator';
import { withTooltip } from './tooltip';

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'relative flex select-none items-center gap-1 bg-white dark:bg-slate-950'
);

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  'flex items-center'
);

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4'
);

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  'my-1 w-[1px] shrink-0 bg-slate-200 dark:bg-slate-800'
);

const toolbarButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
    '[&_svg:not([data-icon])]:h-5 [&_svg:not([data-icon])]:w-5'
  ),
  {
    variants: {
      variant: {
        default:
          "tw-'bg-transparent hover:tw-bg-slate-100 hover:tw-text-slate-500 aria-checked:tw-bg-slate-100 aria-checked:tw-text-slate-900 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-400 dark:aria-checked:tw-bg-slate-800 dark:aria-checked:tw-text-slate-50'",
        outline:
          "tw-'border tw-border-slate-200 tw-bg-transparent hover:tw-bg-slate-100 hover:tw-text-slate-900 dark:tw-border-slate-800 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-50'",
      },
      size: {
        default: "tw-'h-10 tw-px-3'",
        sm: "tw-'h-9 tw-px-2'",
        lg: "tw-'h-11 tw-px-5'",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

const ToolbarButton = withTooltip(
  // eslint-disable-next-line react/display-name
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    Omit<
      React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
      'asChild' | 'value'
    > &
      VariantProps<typeof toolbarButtonVariants> & {
        pressed?: boolean;
        isDropdown?: boolean;
      }
  >(
    (
      { className, variant, size, isDropdown, children, pressed, ...props },
      ref
    ) => {
      return typeof pressed === 'boolean' ? (
        <ToolbarToggleGroup
          type='single'
          value='single'
          disabled={props.disabled}
        >
          <ToolbarToggleItem
            ref={ref}
            className={cn(
              toolbarButtonVariants({
                variant,
                size,
              }),
              isDropdown && "tw-'my-1 tw-justify-between tw-pr-1'",
              className
            )}
            value={pressed ? 'single' : ''}
            {...props}
          >
            {isDropdown ? (
              <>
                <div className="tw-'flex tw-flex-1'">{children}</div>
                <div>
                  <Icons.arrowDown className="tw-'ml-0.5 tw-h-4 tw-w-4'" data-icon />
                </div>
              </>
            ) : (
              children
            )}
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          ref={ref}
          className={cn(
            toolbarButtonVariants({
              variant,
              size,
            }),
            isDropdown && "tw-'pr-1'",
            className
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );
    }
  )
);
ToolbarButton.displayName = 'ToolbarButton';
export { ToolbarButton };

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ['variant', 'size']
);

export const ToolbarGroup = withRef<
  'div',
  {
    noSeparator?: boolean;
  }
>(({ className, children, noSeparator }, ref) => {
  const childArr = React.Children.map(children, (c) => c);
  if (!childArr || childArr.length === 0) return null;

  return (
    <div ref={ref} className={cn("tw-'flex'", className)}>
      {!noSeparator && (
        <div className="tw-'h-full tw-py-1'">
          <Separator orientation='vertical' />
        </div>
      )}

      <div className="tw-'mx-1 tw-flex tw-items-center tw-gap-1'">{children}</div>
    </div>
  );
});
