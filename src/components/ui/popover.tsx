import React, { useRef, useEffect } from 'react';

interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Popover = ({ open, onOpenChange, children }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={popoverRef} className="relative">
      {children}
    </div>
  );
};

export const PopoverTrigger = ({ children, onClick }: PopoverTriggerProps) => {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
};

export const PopoverContent = ({ 
  children, 
  className = '', 
  align = 'center',
  side = 'bottom' 
}: PopoverContentProps) => {
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };

  const sideClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2 top-0',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-0'
  };

  return (
    <div 
      className={`
        absolute z-50 min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 p-1
        ${alignmentClasses[align]} ${sideClasses[side]} ${className}
      `}
    >
      {children}
    </div>
  );
};