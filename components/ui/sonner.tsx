"use client";

import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { cn } from "@/lib/utils";

const Sonner = React.forwardRef<
  React.ElementRef<typeof SonnerToaster>,
  React.ComponentPropsWithoutRef<typeof SonnerToaster>
>(({ className, ...props }, ref) => (
  <SonnerToaster
    ref={ref}
    className={cn("fixed top-4 right-4 z-[100] flex flex-col gap-2", className)}
    {...props}
  />
));
Sonner.displayName = "Sonner";

export { Sonner };
export { SonnerToaster as SonnerProvider };