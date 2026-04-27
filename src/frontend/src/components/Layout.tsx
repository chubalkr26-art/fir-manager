import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  FolderOpen,
  LogOut,
  Menu,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <BarChart3 className="w-4 h-4" />,
    ocid: "nav.dashboard.link",
  },
  {
    label: "FIR Records",
    path: "/firs",
    icon: <FileText className="w-4 h-4" />,
    ocid: "nav.firs.link",
  },
  {
    label: "Cases",
    path: "/cases",
    icon: <FolderOpen className="w-4 h-4" />,
    ocid: "nav.cases.link",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout, principalId } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="bg-card border-b shadow-card sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 mr-2"
            data-ocid="nav.logo.link"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display font-semibold text-sm text-foreground leading-none">
                Mokokchung
              </div>
              <div className="font-display font-semibold text-sm text-foreground leading-none">
                Police Station
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 flex-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                data-ocid={item.ocid}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1 md:flex-none" />

          {/* Principal + Logout */}
          <div className="hidden md:flex items-center gap-3">
            {principalId && (
              <span
                className="text-xs text-muted-foreground font-mono max-w-[120px] truncate"
                title={principalId}
              >
                {principalId.slice(0, 12)}…
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              data-ocid="nav.logout.button"
              onClick={logout}
              className="gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted transition-smooth"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
            data-ocid="nav.mobile_menu.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-card px-4 pb-4">
            <nav className="flex flex-col gap-1 pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  data-ocid={item.ocid}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                data-ocid="nav.mobile_logout.button"
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display font-medium text-foreground">
              Mokokchung Police Station
            </span>
            <span>— Case Management System</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
