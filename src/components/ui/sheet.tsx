import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right";
}

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => onOpenChange(false)}
        />
      )}
      {children}
    </>
  );
};

export const SheetContent = ({
  children,
  className = "",
  side = "left",
}: SheetContentProps) => {
  return (
    <div
      className={`
        fixed inset-y-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${side === "left" ? "left-0" : "right-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const SheetHeader = ({ children, className = "" }: SheetHeaderProps) => {
  return (
    <div
      className={`flex items-center justify-between p-4 border-b ${className}`}
    >
      {children}
    </div>
  );
};

export const SheetTitle = ({ children, className = "" }: SheetTitleProps) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

export const SheetTrigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SheetClose = ({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      {children || <X className="h-4 w-4" />}
    </Button>
  );
};
