import LoginPage from "@/components/LoginPage";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const FirList = lazy(() => import("@/pages/FirList"));
const FirUpload = lazy(() => import("@/pages/FirUpload"));
const FirDetail = lazy(() => import("@/pages/FirDetail"));
const CaseList = lazy(() => import("@/pages/CaseList"));
const CaseDetail = lazy(() => import("@/pages/CaseDetail"));

// ─── Router Setup ─────────────────────────────────────────────────────────────

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const firsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/firs",
  component: FirList,
});

const firUploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/firs/upload",
  component: FirUpload,
});

const firDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/firs/$id",
  component: FirDetail,
});

const casesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cases",
  component: CaseList,
});

const caseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cases/$id",
  component: CaseDetail,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  firsRoute,
  firUploadRoute,
  firDetailRoute,
  casesRoute,
  caseDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── Page Loading Fallback ───────────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-64 w-full mt-4" />
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

function AuthenticatedApp() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default function App() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <AuthenticatedApp />;
}
