"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Eye, EyeOff, Lock, User, Shield, LogIn } from "lucide-react";
import { useTheme } from "next-themes";

const loginSchema = z.object({
  role: z.enum(["HEAD_OF_SECURITY", "GUARD"]),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role: data.role,
        redirect: false,
        callbackUrl: data.role === "HEAD_OF_SECURITY" ? "/admin" : "/guard",
      });
      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        const redirectUrl =
          data.role === "HEAD_OF_SECURITY" ? "/admin" : "/guard";
        router.push(redirectUrl);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-destructive/15 text-destructive px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="role" className="text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Your Role
          </div>
        </Label>
        <Select
          onValueChange={(value) =>
            setValue("role", value as "HEAD_OF_SECURITY" | "GUARD", {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger
            id="role"
            className="w-full border-border/70 focus:ring-1 focus:ring-primary/50"
          >
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HEAD_OF_SECURITY" className="gap-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Head of Security</span>
              </div>
            </SelectItem>
            <SelectItem value="GUARD" className="gap-2">
              <div className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Security Guard</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-xs text-destructive">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            Email Address
          </div>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="border-border/70 focus:ring-1 focus:ring-primary/50"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            Password
          </div>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="border-border/70 focus:ring-1 focus:ring-primary/50 pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
        <div className="text-right mt-1">
          <a
            href="/auth/forgot-password"
            className="text-xs text-primary hover:underline transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-2"
        disabled={loading}
        size="lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signing in...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <ChevronRight className="h-4 w-4" />
            Sign In
          </span>
        )}
      </Button>
    </form>
  );
}