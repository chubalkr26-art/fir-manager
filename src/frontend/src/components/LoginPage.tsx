import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const { login, isInitializing, isLoggingIn } = useAuth();
  const isDisabled = isInitializing || isLoggingIn;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b shadow-card">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <span className="font-display text-lg font-semibold text-foreground">
              Mokokchung Police Station
            </span>
            <span className="hidden sm:inline text-muted-foreground text-sm ml-2">
              — Case Management System
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border rounded-lg shadow-elevated p-8 text-center space-y-6">
            {/* Emblem area */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Mokokchung Police Station
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                FIR Case Management &amp; Summary System
              </p>
              <div className="h-px bg-border my-4" />
              <p className="text-sm text-muted-foreground">
                Authorized personnel only. Sign in with your Internet Identity
                to access the system.
              </p>
            </div>

            <Button
              data-ocid="login.primary_button"
              onClick={login}
              disabled={isDisabled}
              className="w-full h-11 font-medium text-base"
            >
              {isInitializing
                ? "Initializing…"
                : isLoggingIn
                  ? "Signing in…"
                  : "Sign In with Internet Identity"}
            </Button>

            <p className="text-xs text-muted-foreground">
              Access is restricted to registered personnel of Mokokchung Police
              Station.
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} Mokokchung Police Station. All rights
            reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
